import { clerkClient } from '@clerk/express'
import CourseEnrollment from '../models/CourseEnrollment.js'

const ownerEmail = 'ayanfeoluwaolababatunde@gmail.com'

export async function verifiedEmail(userId: string) {
  const user = await clerkClient.users.getUser(userId)
  return user.emailAddresses.find(({ id }) => id === user.primaryEmailAddressId)?.emailAddress.toLowerCase() ?? ''
}

export async function canAccessCourse(userId: string, courseSlug: string) {
  if (await verifiedEmail(userId) === ownerEmail) return { allowed: true, isAdmin: true }
  const enrolled = await CourseEnrollment.exists({ userId, courseSlug })
  return { allowed: Boolean(enrolled), isAdmin: false }
}

export function configuredCoursePrice(slug: string, storedPrice?: number) {
  try {
    const prices = JSON.parse(process.env.COURSE_PRICES_NGN ?? '{}') as Record<string, unknown>
    const configured = prices[slug]
    if (typeof configured === 'number' && Number.isFinite(configured) && configured > 0) return configured
  } catch { console.error('COURSE_PRICES_NGN must be a JSON object keyed by course slug.') }
  return storedPrice && storedPrice > 0 ? storedPrice : undefined
}
