import { useEffect, useState, type FormEvent } from 'react'
import { useAuth } from '@clerk/react'
import { ArrowRight, Bot, BookOpen, Check, Clock3, GraduationCap } from '../components/Icons'
import type { CourseCardData, CourseLevel } from '../components/CourseCard'
import CourseCertificate from '../components/CourseCertificate'
import { formatCourseCategory } from '../data/courses'
import type { CourseProgress } from '../types/progress'
import CourseCheckpointPage from './CourseCheckpointPage'

type ChatMessage = { role: 'user' | 'assistant'; content: string }
const welcomeMessage: ChatMessage = { role: 'assistant', content: 'I am here to help you with this lesson. Ask a question, request an example, or tell me what feels confusing.' }
const courseLevels: CourseLevel[] = ['Beginner', 'Intermediate', 'Expert']

function LessonNotes({ content }: { content: string }) {
  const blocks = content.split('\n\n')
  return <div className="lesson-notes">{blocks.map((block, index) => {
    const [heading, ...body] = block.split('\n')
    return <section className="lesson-note-section" key={`${index}-${heading}`}><h3>{heading}</h3><p>{body.join(' ') || heading}</p></section>
  })}</div>
}

export default function CourseDetailPage({
  course,
  progress,
  onBack,
  onCompleteLesson,
}: {
  course: CourseCardData
  progress?: CourseProgress
  onBack: () => void
  onCompleteLesson: (courseId: string, lessonIndex: number) => Promise<CourseProgress>
}) {
  const { getToken } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'course' | 'checkpoint'>('overview')
  const currentLevel = progress?.currentLevel ?? 'Beginner'
  const [viewLevel, setViewLevel] = useState<CourseLevel>(currentLevel)
  const initialLesson = progress?.lastLessonIndex ?? Math.max(0, course.chapters.findIndex(({ level }) => level === currentLevel))
  const [activeIndex, setActiveIndex] = useState(initialLesson)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [chatInput, setChatInput] = useState('')
  const [practiceAnswer, setPracticeAnswer] = useState('')
  const [isChatting, setIsChatting] = useState(false)
  const [chatError, setChatError] = useState('')
  const lesson = course.chapters[activeIndex]
  const currentLevelIndex = courseLevels.indexOf(currentLevel)
  const levelLessonIndices = course.chapters.flatMap((item, index) => item.level === viewLevel ? [index] : [])
  const levelLessonNumber = levelLessonIndices.indexOf(activeIndex) + 1
  const completedLessons = progress?.completedLessons ?? []
  const isLessonComplete = completedLessons.includes(activeIndex)

  useEffect(() => {
    setChatMessages([welcomeMessage])
    setChatError('')
    setPracticeAnswer('')
  }, [activeIndex, course.id])

  useEffect(() => {
    const firstLesson = course.chapters.findIndex(({ level }) => level === currentLevel)
    setViewLevel(currentLevel)
    setActiveIndex(progress?.lastLessonIndex ?? Math.max(0, firstLesson))
  }, [course.id, currentLevel])

  async function markComplete() {
    setIsSaving(true)
    setSaveError('')
    try {
      const updated = await onCompleteLesson(course.id, activeIndex)
      setActiveTab('course')
      if (updated.currentLevel !== currentLevel) {
        setViewLevel(updated.currentLevel)
        setActiveIndex(course.chapters.findIndex(({ level }) => level === updated.currentLevel))
      } else {
        const nextLesson = levelLessonIndices[levelLessonNumber]
        if (nextLesson !== undefined) setActiveIndex(nextLesson)
      }
      return updated
    } catch (cause) {
      setSaveError(cause instanceof Error ? cause.message : 'Your progress could not be saved. Check your connection and try again.')
      return null
    } finally {
      setIsSaving(false)
    }
  }

  async function sendTutorQuestion(question: string) {
    if (!question || isChatting || !lesson) return
    const userMessage: ChatMessage = { role: 'user', content: question }
    const conversation = [...chatMessages.filter((message) => message !== welcomeMessage), userMessage]
    setChatMessages((current) => [...current, userMessage])
    setChatInput('')
    setChatError('')
    setIsChatting(true)
    try {
      const token = await getToken()
      if (!token) throw new Error('Sign in again to use your lesson tutor.')
      const response = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId: course.id, courseTitle: course.title, lessonTitle: lesson.title, lessonContent: `${lesson.content}\n\nPractice: ${lesson.practice}\n\nCheckpoint: ${lesson.checkpoint}`, messages: conversation.slice(-12) }),
      })
      const result = await response.json() as { answer?: string; message?: string }
      if (!response.ok || !result.answer) throw new Error(result.message ?? 'The tutor could not answer just now. Please try again.')
      setChatMessages((current) => [...current, { role: 'assistant', content: result.answer! }])
    } catch (cause) {
      setChatError(cause instanceof Error ? cause.message : 'The tutor could not answer just now. Please try again.')
    } finally {
      setIsChatting(false)
    }
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const question = chatInput.trim()
    if (!question || isChatting) return
    setChatInput('')
    await sendTutorQuestion(question)
  }

  async function submitPractice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const answer = practiceAnswer.trim()
    if (!answer || isChatting || !lesson) return
    setPracticeAnswer('')
    await sendTutorQuestion(`Practice task: ${lesson.practice}\n\nMy answer: ${answer}\n\nPlease give me specific feedback. Point out one thing I did well and one improvement to consider, then ask a short follow-up question.`)
  }

  return (
    <section className="course-detail-page">
      <button className="course-back-button" onClick={onBack}><span aria-hidden="true">←</span> All courses</button>
      <div className={`course-detail-hero ${course.accent}`}>
        <div className="course-detail-copy">
          <span className="course-detail-category">{formatCourseCategory(course.category)}</span>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="course-detail-meta"><span className="course-level-badge"><GraduationCap size={16} /> {currentLevel} level</span>{course.isAdmin && <span className="course-owner-badge">Owner preview access</span>}<span><Clock3 size={15} /> {course.duration}</span><span><BookOpen size={15} /> {course.lessons} lessons · 3 levels</span></div>
        </div>
        <div className={`course-detail-emoji ${course.image ? 'has-course-image' : ''}`} aria-hidden="true">{course.image ? <img src={course.image} alt="" /> : course.emoji}</div>
      </div>

      <nav className="course-learning-tabs" aria-label="Course sections">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={activeTab === 'course' ? 'active' : ''} onClick={() => setActiveTab('course')}>My course</button>
        <button className={activeTab === 'checkpoint' ? 'active' : ''} onClick={() => setActiveTab('checkpoint')}>Checkpoint</button>
      </nav>

      {activeTab === 'overview' && <div className="lesson-overview">
        <div><span className="panel-kicker">COURSE OVERVIEW</span><h2>Three levels, from foundations to expert practice</h2><p>Complete Beginner to unlock Intermediate, then complete Intermediate to unlock Expert. Finish every Expert lesson to earn your certificate. This course has {course.chapters.length} lessons in total.</p></div>
        <div className="lesson-overview-art">{course.image ? <img src={course.image} alt={`${course.title} illustration`} /> : <span role="img" aria-label={course.title}>{course.emoji}</span>}</div>
      </div>}

      {activeTab !== 'overview' && progress && <div className="course-progress-strip"><span>Course progress · {currentLevel} ({progress.levelCompletedLessons}/{progress.levelTotalLessons})</span><div><span style={{ width: `${progress.percent}%` }} /></div><strong>{progress.percent}%</strong></div>}

      {activeTab === 'checkpoint' ? <CourseCheckpointPage course={course} level={currentLevel} /> : activeTab === 'overview' ? <div className="course-overview-levels">{courseLevels.map((level, index) => <article key={level}><span className="panel-kicker">LEVEL {index + 1}</span><h3>{level}</h3><p>{course.chapters.filter((item) => item.level === level).length} lessons · {index === 0 ? 'Build the foundations' : index === 1 ? 'Apply and combine your skills' : 'Create and present a complete project'}</p></article>)}</div> : progress?.completedAt ? (
        <CourseCertificate courseTitle={course.title} completedAt={progress.completedAt} />
      ) : (
        <div className="lesson-layout">
          <nav className="lesson-chapter-nav" aria-label="Course levels and lessons">
            <div className="lesson-chapter-nav-heading"><span className="panel-kicker">YOUR LEARNING PATH</span><h2>Choose a level</h2></div>
            <div className="learning-level-tabs">{courseLevels.map((level, index) => {
              const locked = index > currentLevelIndex
              const levelCount = course.chapters.filter((item) => item.level === level).length
              const levelDone = course.chapters.filter((item, lessonIndex) => item.level === level && completedLessons.includes(lessonIndex)).length
              return <button key={level} type="button" className={`learning-level-tab ${viewLevel === level ? 'active' : ''} ${index < currentLevelIndex ? 'complete' : ''}`} disabled={locked} onClick={() => {
                setViewLevel(level)
                setActiveIndex(course.chapters.findIndex((item) => item.level === level))
              }}><span><strong>{level}</strong><small>{locked ? 'Complete the level before this' : `${levelDone}/${levelCount} lessons`}</small></span><span className="learning-level-index">{locked ? '🔒' : index < currentLevelIndex ? <Check size={15} /> : index + 1}</span></button>
            })}</div>
            <div className="lesson-chapter-nav-heading"><span className="panel-kicker">{viewLevel.toUpperCase()} TRACK</span><h2>Lessons <span>({levelLessonIndices.length})</span></h2></div>
            {levelLessonIndices.map((index) => {
              const item = course.chapters[index]
              const complete = completedLessons.includes(index)
              return <button key={`${course.id}-${index}-${item.title}`} className={`lesson-nav-item ${activeIndex === index ? 'active' : ''}`} onClick={() => setActiveIndex(index)} aria-current={activeIndex === index ? 'step' : undefined}><span className="lesson-nav-number">{complete ? <Check size={14} /> : String(levelLessonIndices.indexOf(index) + 1).padStart(2, '0')}</span><span><strong>{item.title}</strong><small><Clock3 size={12} /> {item.duration}</small></span></button>
            })}
          </nav>

          <article className="lesson-content-panel">
            {lesson ? <>
              <span className="panel-kicker">{viewLevel.toUpperCase()} · LESSON {String(levelLessonNumber).padStart(2, '0')} OF {String(levelLessonIndices.length).padStart(2, '0')}</span>
              <h2>{lesson.title}</h2>
              <p className="lesson-summary">{lesson.summary}</p>
              {lesson.illustration && <img className="lesson-inline-illustration" src={lesson.illustration} alt={lesson.imageAlt ?? `${lesson.title} illustration`} />}
              <LessonNotes content={lesson.content} />
              <section className="lesson-practice-card"><span className="panel-kicker">PRACTICE</span><h3>Try it yourself</h3><p>{lesson.practice}</p><form onSubmit={(event) => void submitPractice(event)}><textarea aria-label="Your practice answer" placeholder="Write your approach or result here…" value={practiceAnswer} onChange={(event) => setPracticeAnswer(event.target.value)} maxLength={1500} /><button className="secondary-button" type="submit" disabled={isChatting || !practiceAnswer.trim()}>Ask the AI tutor for feedback</button></form></section>
              <section className="lesson-checkpoint-card"><span className="panel-kicker">CHECKPOINT</span><p>{lesson.checkpoint}</p></section>
              <div className="lesson-complete-row">
                {saveError && <p role="alert" className="lesson-save-error">{saveError}</p>}
                <button className="primary-button" onClick={() => void markComplete()} disabled={isSaving || isLessonComplete}>
                  {isSaving ? 'Saving progress…' : isLessonComplete ? <><Check size={16} /> Lesson complete</> : <>Mark lesson complete <ArrowRight size={16} /></>}
                </button>
              </div>
            </> : <p>This course does not have any lessons yet.</p>}
          </article>

          <aside className="lesson-chat" aria-label="AI lesson tutor">
            <div className="lesson-chat-heading"><span className="lesson-chat-bot"><Bot size={19} /></span><span><strong>Lesson AI tutor</strong><small>Context: {lesson?.title ?? course.title}</small></span></div>
            <div className="lesson-chat-messages" aria-live="polite">
              {chatMessages.map((message, index) => <div key={`${index}-${message.role}`} className={`lesson-chat-message ${message.role}`}>{message.content}</div>)}
              {isChatting && <div className="lesson-chat-message assistant">Thinking through that with you…</div>}
            </div>
            {chatError && <p className="lesson-chat-error" role="alert">{chatError}</p>}
            <form className="lesson-chat-form" onSubmit={(event) => void sendMessage(event)}>
              <textarea aria-label="Ask your lesson tutor" placeholder="Ask about this lesson…" value={chatInput} onChange={(event) => setChatInput(event.target.value)} maxLength={2000} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit() } }} />
              <button type="submit" aria-label="Send message" disabled={isChatting || !chatInput.trim()}><ArrowRight size={17} /></button>
            </form>
          </aside>
        </div>
      )}
    </section>
  )
}
