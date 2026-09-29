import { Router } from 'express'
import { getAuth, requireAuth } from '@clerk/express'
import Course from '../models/Course.js'
import CourseProgress from '../models/CourseProgress.js'
import { courseLevels, type CourseLevel } from '../data/courseSeeds.js'
import { canAccessCourse } from '../services/course-access.js'

const router = Router()

router.get('/', requireAuth(), async (req, res, next) => {
  try {
    const userId = getAuth(req).userId!
    const progress = await CourseProgress.find({ userId }).lean()
    const courses = await Course.find({ slug: { $in: progress.map(({ courseSlug }) => courseSlug) } }).lean()
    const courseBySlug = new Map(courses.map((course) => [course.slug, course]))
    res.json(progress.map((record) => {
      const course = courseBySlug.get(record.courseSlug)
      const chapterLevels = (course?.chapters ?? []) as { level: CourseLevel }[]
      const totalLessons = chapterLevels.length
      const currentLevel = (record.currentLevel ?? 'Beginner') as CourseLevel
      const levelLessonIndices = chapterLevels.flatMap((lesson, index) => lesson.level === currentLevel ? [index] : [])
      const levelCompletedLessons = record.completedChapters.filter((index: number) => levelLessonIndices.includes(index)).length
      return { courseId: record.courseSlug, courseTitle: course?.title ?? record.courseSlug, completedLessons: record.completedChapters, totalLessons, percent: totalLessons ? Math.round(record.completedChapters.length / totalLessons * 100) : 0, completedAt: record.completedAt, lastLessonIndex: record.lastChapterIndex, currentLevel, levelCompletedLessons, levelTotalLessons: levelLessonIndices.length }
    }))
  } catch (error) { next(error) }
})

router.post('/:courseId/lessons/:chapterIndex', requireAuth(), async (req, res, next) => {
  try {
    const userId = getAuth(req).userId!
    const lessonIndex = Number(req.params.chapterIndex)
    const course = await Course.findOne({ slug: req.params.courseId }).lean()
    if (!course) return res.status(404).json({ message: 'Course not found.' })
    const access = await canAccessCourse(userId, course.slug)
    if (!access.allowed) return res.status(402).json({ code: 'PAYMENT_REQUIRED', message: 'Purchase this course before saving lesson progress.' })
    const chapterLevels = course.chapters as { level: CourseLevel }[]
    if (!Number.isInteger(lessonIndex) || lessonIndex < 0 || lessonIndex >= chapterLevels.length) return res.status(400).json({ message: 'Lesson not found in this course.' })
    const existingProgress = await CourseProgress.findOne({ userId, courseSlug: course.slug }).lean()
    const currentLevel = (existingProgress?.currentLevel ?? 'Beginner') as CourseLevel
    if (chapterLevels[lessonIndex].level !== currentLevel) return res.status(409).json({ message: `This lesson is locked. Finish the ${currentLevel} level to unlock the next level.` })
    const progress = await CourseProgress.findOneAndUpdate({ userId, courseSlug: course.slug }, { $addToSet: { completedChapters: lessonIndex }, $set: { lastChapterIndex: lessonIndex, curriculumVersion: 3 } }, { new: true, upsert: true, setDefaultsOnInsert: true })
    const levelLessonIndices = chapterLevels.flatMap((item, index) => item.level === currentLevel ? [index] : [])
    if (levelLessonIndices.every((index) => progress.completedChapters.includes(index))) {
      const nextLevel = courseLevels[courseLevels.indexOf(currentLevel) + 1]
      if (nextLevel) { progress.currentLevel = nextLevel; progress.lastChapterIndex = chapterLevels.findIndex((item) => item.level === nextLevel) }
      else if (!progress.completedAt) progress.completedAt = new Date()
      await progress.save()
    }
    const activeLevel = progress.currentLevel as CourseLevel
    const activeLevelIndices = chapterLevels.flatMap((item, index) => item.level === activeLevel ? [index] : [])
    res.json({ courseId: course.slug, courseTitle: course.title, completedLessons: progress.completedChapters, totalLessons: chapterLevels.length, percent: Math.round(progress.completedChapters.length / chapterLevels.length * 100), completedAt: progress.completedAt, lastLessonIndex: progress.lastChapterIndex, currentLevel: activeLevel, levelCompletedLessons: progress.completedChapters.filter((index: number) => activeLevelIndices.includes(index)).length, levelTotalLessons: activeLevelIndices.length })
  } catch (error) { next(error) }
})

export default router
