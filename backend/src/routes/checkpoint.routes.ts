import { Router } from 'express'
import { getAuth, requireAuth } from '@clerk/express'
import Course from '../models/Course.js'
import CourseCheckpoint from '../models/CourseCheckpoint.js'
import { canAccessCourse } from '../services/course-access.js'

const router = Router()
const levels = ['Beginner', 'Intermediate', 'Expert']

router.get('/:courseId/:level', requireAuth(), async (req, res, next) => {
  try {
    const userId = getAuth(req).userId!
    const course = await Course.findOne({ slug: req.params.courseId }).lean()
    if (!course) return res.status(404).json({ message: 'Course not found.' })
    const access = await canAccessCourse(userId, course.slug)
    if (!access.allowed) return res.status(402).json({ message: 'Purchase this course before opening its checkpoint.' })
    const record = await CourseCheckpoint.findOne({ userId, courseSlug: course.slug, level: req.params.level }).lean()
    res.json({ submissionUrl: record?.submissionUrl ?? '', submissionText: record?.submissionText ?? '', status: record?.status ?? 'not-submitted', grade: record?.grade ?? null, updatedAt: record?.updatedAt ?? null })
  } catch (error) { next(error) }
})

router.post('/:courseId/:level', requireAuth(), async (req, res, next) => {
  try {
    const userId = getAuth(req).userId!
    const courseSlug = Array.isArray(req.params.courseId) ? req.params.courseId[0] : req.params.courseId
    const level = Array.isArray(req.params.level) ? req.params.level[0] : req.params.level
    const course = await Course.findOne({ slug: courseSlug }).lean()
    if (!course) return res.status(404).json({ message: 'Course not found.' })
    if (!levels.includes(level)) return res.status(400).json({ message: 'Choose a valid course level.' })
    const access = await canAccessCourse(userId, courseSlug)
    if (!access.allowed) return res.status(402).json({ message: 'Purchase this course before submitting its checkpoint.' })
    const submittedUrl = typeof req.body?.submissionUrl === 'string' ? req.body.submissionUrl.trim() : ''
    let parsedUrl: URL
    try { parsedUrl = new URL(submittedUrl) } catch { return res.status(400).json({ message: 'Enter a valid public project link.' }) }
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) return res.status(400).json({ message: 'Project links must use http or https.' })
    const submissionText = typeof req.body?.submissionText === 'string' ? req.body.submissionText.trim().slice(0, 12000) : ''
    const prior = await CourseCheckpoint.findOne({ userId, courseSlug, level })
    if (prior?.status === 'approved') return res.status(409).json({ message: 'This checkpoint is approved and its submission can no longer be changed.' })
    const saved = await CourseCheckpoint.findOneAndUpdate({ userId, courseSlug, level }, { $set: { submissionUrl: parsedUrl.toString(), submissionText, status: 'submitted' }, $unset: { grade: 1 } }, { upsert: true, new: true })
    res.json({ submissionUrl: saved.submissionUrl, submissionText: saved.submissionText, status: saved.status, grade: saved.grade ?? null, updatedAt: saved.updatedAt })
  } catch (error) { next(error) }
})

export default router
