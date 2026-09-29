import { Award, Check, Sparkles, Target } from '../components/Icons'
import { useProgressData } from '../hooks/useProgressData'

export default function AchievementsPage() {
  const { progress, isLoading, error, reload } = useProgressData()
  const completedCourses = progress.filter(({ completedAt }) => completedAt)
  const completedLessons = progress.reduce((total, item) => total + item.completedLessons.length, 0)
  const badges = [
    { title: 'First steps', description: 'Complete your first course lesson.', icon: <Target size={22} />, earned: completedLessons > 0 },
    { title: 'Course finisher', description: 'Complete every lesson in a course.', icon: <Award size={22} />, earned: completedCourses.length > 0 },
    { title: 'Curious mind', description: 'Earn certificates in three different courses.', icon: <Sparkles size={22} />, earned: completedCourses.length >= 3 },
  ]

  return (
    <section className="achievements-page">
      <div className="page-intro"><span className="panel-kicker">MILESTONES WORTH CELEBRATING</span><h1>Achievements</h1><p>Your effort adds up. These badges mark the steps you have taken.</p></div>
      {error && <div className="inline-error" role="alert">{error} <button className="text-button" onClick={() => void reload()}>Try again</button></div>}
      <div className="achievement-count"><Award size={20} /><strong>{isLoading ? '…' : badges.filter(({ earned }) => earned).length}</strong><span>of {badges.length} badges earned</span></div>
      <div className="achievement-grid">{badges.map((badge) => <article className={`achievement-card ${badge.earned ? 'earned' : ''}`} key={badge.title}><span className="achievement-icon">{badge.earned ? <Check size={22} /> : badge.icon}</span><div><h2>{badge.title}</h2><p>{badge.description}</p></div><span className="achievement-status">{isLoading ? 'Loading' : badge.earned ? 'Earned' : 'In progress'}</span></article>)}</div>
      {completedCourses.length > 0 && <div className="earned-course-list"><span className="panel-kicker">COMPLETED COURSES</span>{completedCourses.map((course) => <div key={course.courseId}><Check size={15} /><span>{course.courseTitle}</span><small>{new Date(course.completedAt!).toLocaleDateString()}</small></div>)}</div>}
    </section>
  )
}
