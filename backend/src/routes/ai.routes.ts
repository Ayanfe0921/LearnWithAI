import { Router } from 'express'
import { getAuth, requireAuth } from '@clerk/express'
import Course from '../models/Course.js'
import CourseCheckpoint from '../models/CourseCheckpoint.js'
import { canAccessCourse } from '../services/course-access.js'

const router = Router()
const openAiUrl = 'https://api.openai.com/v1/responses'
const model = () => process.env.OPENAI_MODEL ?? 'gpt-5-mini'

router.post('/tutor', requireAuth(), async (req, res, next) => {
  try {
    const userId = getAuth(req).userId!
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return res.status(503).json({ message: 'The AI tutor is not configured yet.' })
    const { courseId, courseTitle, lessonTitle, lessonContent, messages } = req.body as { courseId?: unknown; courseTitle?: unknown; lessonTitle?: unknown; lessonContent?: unknown; messages?: { role: string; content: string }[] }
    if (typeof courseId !== 'string' || typeof courseTitle !== 'string' || typeof lessonTitle !== 'string' || typeof lessonContent !== 'string' || !Array.isArray(messages) || messages.length < 1 || messages.length > 12 || messages.some((item) => !item || !['user', 'assistant'].includes(item.role) || typeof item.content !== 'string' || item.content.length > 2000)) return res.status(400).json({ message: 'Send a lesson and up to 12 short chat messages.' })
    const access = await canAccessCourse(userId, courseId)
    if (!access.allowed) return res.status(402).json({ code: 'PAYMENT_REQUIRED', message: 'Purchase this course before using its AI tutor.' })
    const response = await fetch(openAiUrl, { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: model(), instructions: `You are LearnWithAI's patient course tutor. Help the learner understand the current lesson in their own words. Course: ${courseTitle}. Lesson: ${lessonTitle}. Lesson material: ${lessonContent.slice(0, 7000)}. Use clear, encouraging explanations, small examples, and guiding questions. Stay focused on the course, correct misunderstandings gently, and do not simply complete graded work for the learner.`, input: messages.map(({ role, content }) => ({ role, content: content.slice(0, 2000) })), max_output_tokens: 700, store: false }) })
    if (!response.ok) { const errorBody = await response.json().catch(() => ({})); console.error('OpenAI tutor request failed:', response.status, JSON.stringify(errorBody).slice(0, 500)); return res.status(502).json({ message: 'The AI tutor could not respond right now. Check API billing and limits, then try again.' }) }
    const result = await response.json() as { output_text?: string }
    if (!result.output_text) return res.status(502).json({ message: 'The AI tutor returned an empty answer. Please try again.' })
    res.json({ answer: result.output_text })
  } catch (error) { next(error) }
})

router.post('/checkpoint', requireAuth(), async (req, res, next) => {
  try {
    const userId = getAuth(req).userId!
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return res.status(503).json({ message: 'AI checkpoint marking is not configured yet.' })
    const courseId = typeof req.body?.courseId === 'string' ? req.body.courseId : ''
    const level = typeof req.body?.level === 'string' ? req.body.level : ''
    if (!['Beginner', 'Intermediate', 'Expert'].includes(level)) return res.status(400).json({ message: 'Choose a valid course level.' })
    const access = await canAccessCourse(userId, courseId)
    if (!access.allowed) return res.status(402).json({ message: 'Purchase this course before requesting checkpoint feedback.' })
    const [course, submission] = await Promise.all([
      Course.findOne({ slug: courseId }).lean(),
      CourseCheckpoint.findOne({ userId, courseSlug: courseId, level }),
    ])
    if (!course) return res.status(404).json({ message: 'Course not found.' })
    if (!submission?.submissionText || submission.submissionText.trim().length < 30) return res.status(400).json({ message: 'Save at least 30 characters describing your project or solution before asking the AI to mark it.' })
    const lessons = (course.chapters as { level: string; title: string; checkpoint: string; summary: string; content: string }[]).filter((chapter) => chapter.level === level)
    const checkpointBrief = lessons.map((chapter) => `${chapter.title}: ${chapter.checkpoint}\nLesson concepts: ${chapter.summary}\n${chapter.content.slice(0, 1400)}`).join('\n\n').slice(0, 12000)
    const evaluationPrompt = `Assess this learner's checkpoint fairly and specifically. Course: ${course.title}. Level: ${level}. Assignment and taught material: ${checkpointBrief}. Learner's saved explanation/work: ${submission.submissionText.slice(0, 12000)}. They also submitted this link for a human reviewer, but do not fetch or claim to have inspected it: ${submission.submissionUrl}. Evaluate only evidence in their written submission against the assignment; do not invent evidence. Give a score from 0 to 100, concrete strengths, specific errors or missing requirements, actionable improvements, a short overall explanation, and exactly one follow-up question that checks an important concept. If evidence is insufficient, say so and score only what is demonstrated. Return only valid JSON with fields: score (integer), summary (string), strengths (array of strings), corrections (array of strings), improvements (array of strings), followUpQuestion (string).`
    const response = await fetch(openAiUrl, { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: model(), instructions: 'You are a careful, constructive educator. Apply the provided assessment criteria consistently. Never claim you opened a URL. Respond with a JSON object only.', input: evaluationPrompt, max_output_tokens: 900, store: false }) })
    if (!response.ok) { const errorBody = await response.json().catch(() => ({})); console.error('OpenAI checkpoint grading failed:', response.status, JSON.stringify(errorBody).slice(0, 500)); return res.status(502).json({ message: 'AI marking could not complete. Check your API key, billing balance, model access and usage limits.' }) }
    const result = await response.json() as { output_text?: string }
    let grade: { score: number; summary: string; strengths: string[]; corrections: string[]; improvements: string[]; followUpQuestion: string }
    try { grade = JSON.parse(result.output_text ?? '') as typeof grade } catch { return res.status(502).json({ message: 'The AI returned feedback in an unreadable format. Please try marking again.' }) }
    if (!Number.isFinite(grade.score) || !Array.isArray(grade.strengths) || !Array.isArray(grade.corrections) || !Array.isArray(grade.improvements) || typeof grade.followUpQuestion !== 'string' || typeof grade.summary !== 'string') return res.status(502).json({ message: 'The AI feedback was incomplete. Please try marking again.' })
    grade.score = Math.max(0, Math.min(100, Math.round(grade.score)))
    submission.grade = grade
    await submission.save()
    res.json({ grade })
  } catch (error) { next(error) }
})

export default router
