import { ArrowUpRight, BookOpen, Clock3, Sparkles } from './Icons'
import { formatCourseCategory } from '../data/courses'

export type CourseChapter = { title: string; summary: string; duration: string }

export type CourseCardData = {
  id: string
  title: string
  category: string
  level: string
  duration: string
  lessons: number
  emoji: string
  accent: string
  description: string
  image?: string
  imageAlt?: string
  imageCredit?: string
  imageSource?: string
  chapters: CourseChapter[]
}

export default function CourseCard({ course, onSelect }: { course: CourseCardData; onSelect: (course: CourseCardData) => void }) {
  return (
    <article className="course-card">
      <div className={`course-art ${course.accent} ${course.image ? 'has-cover' : ''}`}>
        {course.image ? <img className="course-cover-image" src={course.image} alt={course.imageAlt ?? ''} loading="lazy" /> : <span className="course-art-emoji" aria-hidden="true">{course.emoji}</span>}
        {!course.image && <><span className="course-art-spark"><Sparkles size={16} /></span><span className="course-art-orbit" /></>}
        <span className="course-category">{formatCourseCategory(course.category)}</span>
        {course.image && course.imageSource && <a className="course-image-credit" href={course.imageSource} target="_blank" rel="noreferrer" aria-label={`Photo by ${course.imageCredit} on Unsplash`}>Photo: {course.imageCredit}</a>}
      </div>
      <div className="course-card-body">
        <div className="course-meta"><span>{course.level}</span><span className="meta-dot" /><span><Clock3 size={13} /> {course.duration}</span></div>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="course-card-footer"><span><BookOpen size={14} /> {course.lessons} bite-sized lessons</span><button className="course-open-icon" onClick={() => onSelect(course)} aria-label={`Open ${course.title}`}><ArrowUpRight size={17} /></button></div>
      </div>
    </article>
  )
}
