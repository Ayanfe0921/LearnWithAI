export type CourseProgress = {
  courseId: string
  courseTitle: string
  completedLessons: number[]
  totalLessons: number
  percent: number
  completedAt: string | null
  lastLessonIndex: number
  currentLevel: 'Beginner' | 'Intermediate' | 'Expert'
  levelCompletedLessons: number
  levelTotalLessons: number
}
