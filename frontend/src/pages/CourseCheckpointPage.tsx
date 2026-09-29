import { useEffect, useState, type FormEvent } from 'react'
import { useAuth } from '@clerk/react'
import { Check, Sparkles } from '../components/Icons'
import type { CourseCardData, CourseLevel } from '../components/CourseCard'

type CheckpointGrade = { score: number; summary: string; strengths: string[]; corrections: string[]; improvements: string[]; followUpQuestion: string }
type SavedCheckpoint = { submissionUrl: string; submissionText: string; status: string; grade: CheckpointGrade | null; updatedAt: string | null }

async function parse<T>(response: Response): Promise<T & { message?: string }> {
  if (!(response.headers.get('content-type') ?? '').includes('application/json')) throw new Error(`The checkpoint API returned an unexpected response (HTTP ${response.status}).`)
  const result = await response.json() as T & { message?: string }
  if (!response.ok) throw new Error(result.message ?? `Request failed (HTTP ${response.status}).`)
  return result
}

export default function CourseCheckpointPage({ course, level }: { course: CourseCardData; level: CourseLevel }) {
  const { getToken } = useAuth()
  const [link, setLink] = useState('')
  const [submissionText, setSubmissionText] = useState('')
  const [grade, setGrade] = useState<CheckpointGrade | null>(null)
  const [status, setStatus] = useState('not-submitted')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const task = [...course.chapters].reverse().find((chapter) => chapter.level === level)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        const token = await getToken()
        if (!token) throw new Error('Sign in again to open your checkpoint.')
        const response = await fetch(`/api/checkpoints/${encodeURIComponent(course.id)}/${level}`, { headers: { Authorization: `Bearer ${token}` } })
        const data = await parse<SavedCheckpoint>(response)
        if (!cancelled) { setLink(data.submissionUrl); setSubmissionText(data.submissionText); setStatus(data.status); setGrade(data.grade) }
      } catch (cause) { if (!cancelled) setNotice(cause instanceof Error ? cause.message : 'Checkpoint could not be loaded.') }
      finally { if (!cancelled) setIsLoading(false) }
    })()
    return () => { cancelled = true }
  }, [course.id, level, getToken])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice('')
    setIsSaving(true)
    try {
      const token = await getToken()
      if (!token) throw new Error('Sign in again to save your checkpoint.')
      const response = await fetch(`/api/checkpoints/${encodeURIComponent(course.id)}/${level}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ submissionUrl: link, submissionText }) })
      const data = await parse<SavedCheckpoint>(response)
      setLink(data.submissionUrl)
      setSubmissionText(data.submissionText)
      setStatus(data.status)
      setGrade(data.grade)
      setNotice('Your project link has been submitted.')
    } catch (cause) { setNotice(cause instanceof Error ? cause.message : 'Your checkpoint could not be saved.') }
    finally { setIsSaving(false) }
  }

  async function markCheckpoint() {
    setNotice('')
    setIsSaving(true)
    try {
      const token = await getToken()
      if (!token) throw new Error('Sign in again to request checkpoint marking.')
      const response = await fetch('/api/ai/checkpoint', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ courseId: course.id, level }) })
      const result = await parse<{ grade: CheckpointGrade }>(response)
      setGrade(result.grade)
      setNotice('Your checkpoint has been marked.')
    } catch (cause) { setNotice(cause instanceof Error ? cause.message : 'The AI could not mark this checkpoint.') }
    finally { setIsSaving(false) }
  }

  return <div className="course-checkpoint-page">
    <section className="checkpoint-instructions"><span className="panel-kicker">{level.toUpperCase()} CHECKPOINT</span><h2>What you’re aiming for</h2><p>{task?.checkpoint ?? `Create a small project that demonstrates the ${level.toLowerCase()} skills you practised in ${course.title}.`}</p><h3>Instructions</h3><ol><li>Review the project goal and plan the smallest complete solution.</li><li>Build and test your work, checking it against the lesson ideas from this level.</li><li>Publish the result somewhere your instructor can open, such as a public repository or shared document.</li><li>Paste the shareable project link below. Keep a copy of your work.</li></ol><p className="checkpoint-note"><strong>Tip:</strong> You can update the link while the checkpoint is awaiting review.</p></section>
    <section className="checkpoint-submission"><form onSubmit={(event) => void submit(event)}><label htmlFor="checkpoint-link">Project link</label><div className="checkpoint-link-row"><input id="checkpoint-link" type="url" value={link} onChange={(event) => setLink(event.target.value)} placeholder="https://…" required disabled={isLoading || status === 'approved'} /><button className="primary-button" disabled={isSaving || isLoading || status === 'approved'}>{isSaving ? 'Saving…' : status === 'approved' ? 'Approved' : 'Save submission'}</button></div><label htmlFor="checkpoint-work">Explain your work for AI marking</label><textarea id="checkpoint-work" className="checkpoint-work-input" value={submissionText} onChange={(event) => setSubmissionText(event.target.value)} placeholder="Describe your solution, key decisions, and how it meets the checkpoint requirements. Include relevant code or written work here; the AI cannot open private links." minLength={30} maxLength={12000} required disabled={isLoading || status === 'approved'} /><p className="checkpoint-hint">Save your work first, then ask the AI to score it and give specific feedback.</p><button type="button" className="secondary-button" disabled={isSaving || isLoading || !link || submissionText.trim().length < 30 || status === 'approved'} onClick={() => void markCheckpoint()}>{isSaving ? 'Working…' : 'AI mark my checkpoint'}</button></form><p className="checkpoint-status" role="status">{status === 'approved' ? <><Check size={16} /> Approved</> : status === 'submitted' ? 'Submitted · awaiting review' : isLoading ? 'Loading submission…' : 'Not submitted yet'}</p>{notice && <p className="checkpoint-notice" role="status">{notice}</p>}{grade && <section className="checkpoint-grade"><div className="checkpoint-score"><span>AI checkpoint score</span><strong>{grade.score}<small>/100</small></strong></div><p>{grade.summary}</p>{[ ['What went well', grade.strengths], ['Needs correction', grade.corrections], ['Ways to improve', grade.improvements] ].map(([title, items]) => <div key={title as string}><h3>{title}</h3><ul>{(items as string[]).map((item, index) => <li key={index}>{item}</li>)}</ul></div>)}<div className="checkpoint-followup"><strong>Think about this</strong><p>{grade.followUpQuestion}</p></div></section>}</section>
    <details className="checkpoint-accordion"><summary><Sparkles size={16} /> Helpful resources</summary><div><p>Revisit the lesson notes and examples in the {level} section of this course before submitting.</p>{course.image && <img src={course.image} alt={course.imageAlt ?? `${course.title} course illustration`} />}</div></details>
    <details className="checkpoint-accordion"><summary><Check size={16} /> Evaluation specifics</summary><div><ul><li>Does the work solve the stated task?</li><li>Are the course concepts used correctly?</li><li>Can another person open and understand the submitted result?</li><li>Have you explained what you built and what you would improve?</li></ul></div></details>
  </div>
}
