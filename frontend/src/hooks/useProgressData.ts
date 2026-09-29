import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@clerk/react'
import type { CourseCardData } from '../components/CourseCard'
import type { CourseProgress } from '../types/progress'

export function useProgressData() {
  const { getToken } = useAuth()
  const [courses, setCourses] = useState<CourseCardData[]>([])
  const [progress, setProgress] = useState<CourseProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const token = await getToken()
      if (!token) throw new Error('Sign in again to view your learning progress.')
      const headers = { Authorization: `Bearer ${token}` }
      const [courseResponse, progressResponse] = await Promise.all([fetch('/api/courses'), fetch('/api/progress', { headers })])
      if (!courseResponse.ok || !progressResponse.ok) throw new Error('Your learning progress could not be loaded.')
      const [courseData, progressData] = await Promise.all([courseResponse.json(), progressResponse.json()]) as [CourseCardData[], CourseProgress[]]
      setCourses(courseData)
      setProgress(progressData)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Your learning progress could not be loaded.')
    } finally {
      setIsLoading(false)
    }
  }, [getToken])

  useEffect(() => { void reload() }, [reload])

  return { courses, progress, isLoading, error, reload }
}
