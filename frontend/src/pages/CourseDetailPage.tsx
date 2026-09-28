import { ArrowRight, BookOpen, Clock3, GraduationCap } from '../components/Icons'
import type { CourseCardData } from '../components/CourseCard'
import { formatCourseCategory } from '../data/courses'

export default function CourseDetailPage({ course, onBack }: { course: CourseCardData; onBack: () => void }) {
  return (
    <section className="course-detail-page">
      <button className="course-back-button" onClick={onBack}><span aria-hidden="true">←</span> All courses</button>
      <div className={`course-detail-hero ${course.accent}`}>
        <div className="course-detail-copy">
          <span className="course-detail-category">{formatCourseCategory(course.category)}</span>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="course-detail-meta"><span><GraduationCap size={16} /> {course.level}</span><span><Clock3 size={15} /> {course.duration}</span><span><BookOpen size={15} /> {course.lessons} lessons</span></div>
        </div>
        <div className="course-detail-emoji" aria-hidden="true">{course.emoji}</div>
      </div>
      <div className="course-detail-heading"><div><span className="panel-kicker">YOUR LEARNING PATH</span><h2>Course chapters</h2></div><span>{course.chapters.length} chapters</span></div>
      <div className="course-chapter-list">
        {course.chapters.map((chapter, index) => (
          <article className="course-chapter" key={`${course.id}-${chapter.title}`}>
            <span className="chapter-number">{String(index + 1).padStart(2, '0')}</span>
            <div><h3>{chapter.title}</h3><p>{chapter.summary}</p><span className="chapter-duration"><Clock3 size={13} /> {chapter.duration}</span></div>
            <ArrowRight className="chapter-arrow" size={18} />
          </article>
        ))}
      </div>
      <p className="course-detail-note">Chapter lessons are the next part of your learning experience.</p>
    </section>
  )
}
