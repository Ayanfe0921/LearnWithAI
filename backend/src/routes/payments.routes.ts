import { Router } from 'express'
import { getAuth, requireAuth } from '@clerk/express'
import Course from '../models/Course.js'
import CourseEnrollment from '../models/CourseEnrollment.js'
import { canAccessCourse, configuredCoursePrice, verifiedEmail } from '../services/course-access.js'

const router = Router()
const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173'

router.post('/initialize', requireAuth(), async (req, res) => {
  const secret = process.env.PAYSTACK_SECRET_KEY
  if (!secret) return res.status(503).json({ message: 'Card checkout is not configured yet.' })
  const courseId = typeof req.body?.courseId === 'string' ? req.body.courseId : ''
  const course = await Course.findOne({ slug: courseId }).lean()
  if (!course) return res.status(404).json({ message: 'Course not found.' })
  const userId = getAuth(req).userId!
  const access = await canAccessCourse(userId, course.slug)
  if (access.allowed) return res.json({ alreadyEnrolled: true, courseId })
  const priceNgn = configuredCoursePrice(course.slug, course.priceNgn)
  if (!priceNgn) return res.status(409).json({ code: 'PRICE_NOT_CONFIGURED', message: 'The price for this course has not been set yet.' })
  try {
    const email = await verifiedEmail(userId)
    if (!email) return res.status(400).json({ message: 'Add a verified email address to your account before checkout.' })
    const amount = Math.round(priceNgn * 100)
    const reference = `lwa_${crypto.randomUUID()}`
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST', headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, amount, currency: 'NGN', reference, callback_url: `${frontendUrl}/?payment=verify`, metadata: { userId, courseSlug: course.slug } }),
    })
    const result = await response.json() as { status?: boolean; data?: { authorization_url?: string; reference?: string } }
    if (!response.ok || !result.status || !result.data?.authorization_url) return res.status(502).json({ message: 'The card payment provider could not start checkout.' })
    res.json({ authorizationUrl: result.data.authorization_url, reference: result.data.reference })
  } catch (error) {
    console.error('Payment initialization failed:', error)
    res.status(502).json({ message: 'The card payment provider could not start checkout.' })
  }
})

router.post('/verify', requireAuth(), async (req, res) => {
  const secret = process.env.PAYSTACK_SECRET_KEY
  if (!secret) return res.status(503).json({ message: 'Card checkout is not configured yet.' })
  const reference = typeof req.body?.reference === 'string' ? req.body.reference : ''
  if (!reference) return res.status(400).json({ message: 'A payment reference is required.' })
  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, { headers: { Authorization: `Bearer ${secret}` } })
    const result = await response.json() as { status?: boolean; data?: { status?: string; reference?: string; amount?: number; currency?: string; metadata?: { userId?: string; courseSlug?: string } } }
    const data = result.data
    const userId = getAuth(req).userId!
    if (!response.ok || !result.status || data?.status !== 'success' || data.reference !== reference || data.currency !== 'NGN' || data.metadata?.userId !== userId || !data.metadata?.courseSlug) {
      return res.status(402).json({ message: 'Payment could not be verified. If your card was charged, contact support with the payment reference.' })
    }
    const course = await Course.findOne({ slug: data.metadata.courseSlug }).lean()
    const priceNgn = course && configuredCoursePrice(course.slug, course.priceNgn)
    if (!course || !priceNgn || data.amount !== Math.round(priceNgn * 100)) return res.status(402).json({ message: 'The verified payment does not match this course.' })
    await CourseEnrollment.updateOne({ userId, courseSlug: course.slug }, { $setOnInsert: { userId, courseSlug: course.slug, reference, amountKobo: data.amount, paidAt: new Date() } }, { upsert: true })
    res.json({ success: true, courseId: course.slug })
  } catch (error) {
    console.error('Payment verification failed:', error)
    res.status(502).json({ message: 'Could not verify this payment right now. Please retry.' })
  }
})

export default router
