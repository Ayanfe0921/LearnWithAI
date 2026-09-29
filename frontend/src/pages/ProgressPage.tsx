import { BookOpen, Check, Clock3, Sparkles } from '../components/Icons'
import { useProgressData } from '../hooks/useProgressData'

export default function ProgressPage({ onExplore }: { onExplore: () => void }) {
  const { progress, isLoading, error, reload } = useProgressData()
  const completedCourses = progress.filter(({ completedAt }) => completedAt)
  const activeCourses = progress.filter(({ percent, completedAt }) => percent > 0 && !completedAt)
  const totalLessons = progress.reduce((total, item) => total + item.totalLessons, 0)
  const finishedLessons = progress.reduce((total, item) => total + item.completedLessons.length, 0)

  return (
    <section className="progress-page">
      <div className="page-intro"><span className="panel-kicker">YOUR LEARNING JOURNEY</span><h1>My progress</h1><p>Every lesson you finish moves you forward.</p></div>
      {error && <div className="inline-error" role="alert">{error} <button className="text-button" onClick={() => void reload()}>Try again</button></div>}
      <div className="progress-summary-grid">
        <article><span className="progress-summary-icon"><BookOpen size={18} /></span><span>Lessons completed</span><strong>{isLoading ? '…' : finishedLessons}</strong><small>{totalLessons ? `out of ${totalLessons} lessons in started courses` : 'Start a course to begin'}</small></article>
        <article><span className="progress-summary-icon"><Check size={18} /></span><span>Courses completed</span><strong>{completedCourses.length}</strong><small>Certificates earned</small></article>
        <article><span className="progress-summary-icon"><Sparkles size={18} /></span><span>Courses in progress</span><strong>{activeCourses.length}</strong><small>Keep your learning streak going</small></article>
      </div>
      <div className="progress-list-heading"><div><span className="panel-kicker">PICK UP WHERE YOU LEFT OFF</span><h2>Your courses</h2></div></div>
      {!isLoading && progress.length === 0 ? <div className="catalog-empty"><span><BookOpen size={21} /></span><h3>Your journey starts with one lesson</h3><p>Choose a course that interests you, and your progress will show here.</p><button className="primary-button" onClick={onExplore}>Browse courses</button></div> : (
        <div className="progress-course-list">{progress.map((item) => (
          <article className="progress-course-card" key={item.courseId}><div className="progress-course-copy"><h3>{item.courseTitle}</h3><span>{item.completedAt ? 'Completed' : `${item.completedLessons.length} of ${item.totalLessons} lessons`}</span></div><div className="progress-course-bar"><span style={{ width: `${item.percent}%` }} /></div><strong>{item.percent}%</strong>{item.completedAt && <span className="progress-complete-icon"><Check size={15} /></span>}<small className="progress-course-date">{item.completedAt ? `Completed ${new Date(item.completedAt).toLocaleDateString()}` : <><Clock3 size={12} /> Last lesson ${item.lastLessonIndex + 1}</>}</small></article>
        ))}</div>
      )}
    </section>
  )
}
