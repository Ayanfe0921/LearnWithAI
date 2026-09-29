import { Router } from 'express'
import { getAuth, requireAuth } from '@clerk/express'
import Course from '../models/Course.js'
import { canAccessCourse, configuredCoursePrice } from '../services/course-access.js'

const router = Router()

router.get('/', async (_req, res, next) => {
  try {
    const courses = await Course.find().sort({ title: 1 }).lean()
    res.json(courses.map(({ slug, title, category, level, duration, lessons, emoji, accent, image, imageAlt, description, referencePriceNgn, priceNgn }) => ({ id: slug, title, category, level, duration, lessons, emoji, accent, image, imageAlt, description, referencePriceNgn, priceNgn: configuredCoursePrice(slug, priceNgn), chapters: [] })))
  } catch (error) { next(error) }
})

router.get('/:courseId', requireAuth(), async (req, res, next) => {
  try {
    const userId = getAuth(req).userId!
    const course = await Course.findOne({ slug: req.params.courseId }).lean()
    if (!course) return res.status(404).json({ message: 'Course not found.' })
    const access = await canAccessCourse(userId, course.slug)
    if (!access.allowed) return res.status(402).json({ code: 'PAYMENT_REQUIRED', message: 'Purchase this course to open its lessons.' })
    const { slug, _id, __v, ...data } = course
    res.json({ id: slug, ...data, isAdmin: access.isAdmin })
  } catch (error) { next(error) }
})

export default router
