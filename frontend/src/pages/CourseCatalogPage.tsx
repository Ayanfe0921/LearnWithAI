import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@clerk/react'
import { Sparkles } from '../components/Icons'
import CourseCard, { type CourseCardData } from '../components/CourseCard'
import { formatCourseCategory } from '../data/courses'
import CourseDetailPage from './CourseDetailPage'
import type { CourseProgress } from '../types/progress'
import CoursePaymentPage from './CoursePaymentPage'

async function parseResponse<T>(response: Response): Promise<T & { message?: string }> {
  if (!(response.headers.get('content-type') ?? '').includes('application/json')) {
    throw new Error('The API address returned the website HTML instead of JSON. Start the backend from the backend folder, confirm it listens on port 3000, and restart Vite so its /api proxy uses that backend.')
  }
  const data = await response.json() as T & { message?: string }
  if (!response.ok) throw new Error(data.message ?? `The API request failed (HTTP ${response.status}).`)
  return data
}

export default function CourseCatalogPage() {
  const { getToken } = useAuth()
  const [courses, setCourses] = useState<CourseCardData[]>([])
  const [progress, setProgress] = useState<CourseProgress[]>([])
  const [categorySearch, setCategorySearch] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<CourseCardData | null>(null)
  const [paymentCourse, setPaymentCourse] = useState<CourseCardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadCourses() {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/courses')
      if (!response.ok) throw new Error('Courses could not be loaded. Please try again.')
      setCourses(await parseResponse<CourseCardData[]>(response))
      try {
        const token = await getToken()
        if (token) {
          const progressResponse = await fetch('/api/progress', { headers: { Authorization: `Bearer ${token}` } })
          if (progressResponse.ok) setProgress(await parseResponse<CourseProgress[]>(progressResponse))
        }
      } catch {
        // Course browsing stays available if the user's progress request needs a retry.
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'We could not reach the course library. Check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { void loadCourses() }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const reference = params.get('reference') ?? params.get('trxref')
    if (params.get('payment') !== 'verify' || !reference) return
    let cancelled = false
    void (async () => {
      try {
        const token = await getToken()
        if (!token) throw new Error('Sign in again to verify the payment.')
        const response = await fetch('/api/payments/verify', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ reference }) })
        const verified = await parseResponse<{ success: boolean; courseId: string }>(response)
        window.history.replaceState({}, '', window.location.pathname)
        if (!cancelled) {
          const detailResponse = await fetch(`/api/courses/${encodeURIComponent(verified.courseId)}`, { headers: { Authorization: `Bearer ${token}` } })
          const detail = await parseResponse<CourseCardData>(detailResponse)
          setSelectedCourse(detail)
        }
      } catch (cause) {
        if (!cancelled) setError(cause instanceof Error ? cause.message : 'We could not verify the payment.')
      }
    })()
    return () => { cancelled = true }
  }, [getToken])

  async function completeLesson(courseId: string, lessonIndex: number) {
    const token = await getToken()
    if (!token) throw new Error('Sign in again to save your progress.')
    const response = await fetch(`/api/progress/${encodeURIComponent(courseId)}/lessons/${lessonIndex}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
    const result = await parseResponse<CourseProgress>(response)
    const updated = result
    setProgress((current) => [...current.filter(({ courseId: id }) => id !== courseId), updated])
    return updated
  }

  async function openCourse(course: CourseCardData) {
    setError('')
    try {
      const token = await getToken()
      if (!token) throw new Error('Sign in again to open this course.')
      const response = await fetch(`/api/courses/${encodeURIComponent(course.id)}`, { headers: { Authorization: `Bearer ${token}` } })
      if (response.status === 402) { setPaymentCourse(course); return }
      setSelectedCourse(await parseResponse<CourseCardData>(response))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'The course could not be opened. Please try again.')
    }
  }

  const categories = useMemo(() => [...new Set(courses.map(({ category }) => category))].sort((a, b) => formatCourseCategory(a).localeCompare(formatCourseCategory(b))), [courses])
  const categoryQuery = categorySearch.trim().toLowerCase()
  const visibleCourses = !categoryQuery ? courses : courses.filter(({ category }) => formatCourseCategory(category).toLowerCase().includes(categoryQuery))

  if (selectedCourse) return <CourseDetailPage course={selectedCourse} progress={progress.find(({ courseId }) => courseId === selectedCourse.id)} onBack={() => setSelectedCourse(null)} onCompleteLesson={completeLesson} />
  if (paymentCourse) return <CoursePaymentPage course={paymentCourse} onBack={() => setPaymentCourse(null)} />

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
        <div className="course-grid">{visibleCourses.map((course) => {
          const learnerLevel = progress.find(({ courseId }) => courseId === course.id)?.currentLevel ?? 'Beginner'
          return <CourseCard key={course.id} course={{ ...course, level: learnerLevel }} onSelect={(item) => void openCourse(item)} />
        })}</div>
      ) : (
        <div className="catalog-empty"><h3>No courses in this category yet</h3><p>Try another category name to keep exploring.</p><button className="text-button" onClick={() => setCategorySearch('')}>Show all courses</button></div>
      )}
    </section>
  )
}
