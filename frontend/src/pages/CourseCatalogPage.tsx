import { useEffect, useMemo, useState } from 'react'
import { Sparkles } from '../components/Icons'
import CourseCard, { type CourseCardData } from '../components/CourseCard'
import { formatCourseCategory } from '../data/courses'
import CourseDetailPage from './CourseDetailPage'

export default function CourseCatalogPage() {
  const [courses, setCourses] = useState<CourseCardData[]>([])
  const [categorySearch, setCategorySearch] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<CourseCardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadCourses() {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/courses')
      if (!response.ok) throw new Error('Courses could not be loaded. Please try again.')
      setCourses(await response.json() as CourseCardData[])
    } catch {
      setError('We could not reach the course library. Check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { void loadCourses() }, [])

  const categories = useMemo(() => [...new Set(courses.map(({ category }) => category))].sort((a, b) => formatCourseCategory(a).localeCompare(formatCourseCategory(b))), [courses])
  const categoryQuery = categorySearch.trim().toLowerCase()
  const visibleCourses = !categoryQuery ? courses : courses.filter(({ category }) => formatCourseCategory(category).toLowerCase().includes(categoryQuery))

  if (selectedCourse) return <CourseDetailPage course={selectedCourse} onBack={() => setSelectedCourse(null)} />

  return (
    <section className="catalog-page">
      <div className="catalog-hero">
        <div className="catalog-hero-copy">
          <div className="eyebrow"><Sparkles size={14} /> A GOOD PLACE TO BEGIN</div>
          <h1>Find something<br /><span>you are curious about.</span></h1>
          <p>Explore friendly, bite-sized learning paths and take the next step at your own pace.</p>
        </div>
        <div className="catalog-hero-art" aria-hidden="true"><div className="catalog-book">&#x1F4D6;</div><span className="catalog-star star-a">&#x2726;</span><span className="catalog-star star-b">&#x2727;</span><span className="catalog-art-caption">LEARN A LITTLE, OFTEN</span></div>
      </div>

      <div className="catalog-toolbar">
        <div><span className="panel-kicker">COURSE LIBRARY</span><h2>All courses</h2></div>
        <label className="course-category-search"><input type="search" list="course-category-options" value={categorySearch} onChange={(event) => setCategorySearch(event.target.value)} placeholder="Search for a course" aria-label="Search courses by category" /><datalist id="course-category-options">{categories.map((category) => <option key={category} value={formatCourseCategory(category)} />)}</datalist>{categorySearch && <button type="button" onClick={() => setCategorySearch('')} aria-label="Clear category search">Clear</button>}</label>
      </div>

      <div className="catalog-results-line"><span>{isLoading ? 'Loading courses…' : `${visibleCourses.length} ${visibleCourses.length === 1 ? 'course' : 'courses'} to explore`}</span><span>Made for curious minds <Sparkles size={13} /></span></div>

      {isLoading ? <div className="catalog-empty"><span className="loader" /><h3>Loading the course library</h3><p>Your courses are coming right up.</p></div> : error ? (
        <div className="catalog-empty"><h3>Course library unavailable</h3><p>{error}</p><button className="text-button" onClick={() => void loadCourses()}>Try again</button></div>
      ) : visibleCourses.length > 0 ? (
        <div className="course-grid">{visibleCourses.map((course) => <CourseCard key={course.id} course={course} onSelect={setSelectedCourse} />)}</div>
      ) : (
        <div className="catalog-empty"><h3>No courses in this category yet</h3><p>Try another category name to keep exploring.</p><button className="text-button" onClick={() => setCategorySearch('')}>Show all courses</button></div>
      )}
    </section>
  )
}
