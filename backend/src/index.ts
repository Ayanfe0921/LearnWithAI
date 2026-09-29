import 'dotenv/config'
import mongoose from 'mongoose'
import app from './app.js'
import Course from './models/Course.js'
import CourseProgress from './models/CourseProgress.js'
import { courseSeeds } from './data/courseSeeds.js'

const port = Number(process.env.PORT ?? 4000)

async function start() {
  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) throw new Error('Set MONGODB_URI in backend/.env before starting the API.')
  if (!process.env.CLERK_SECRET_KEY) throw new Error('Set CLERK_SECRET_KEY in backend/.env before starting the API.')

  await mongoose.connect(mongoUri)
  await Course.bulkWrite(courseSeeds.map((course) => ({
    updateOne: { filter: { slug: course.slug }, update: { $set: course }, upsert: true },
  })))
  await CourseProgress.updateMany(
    { curriculumVersion: { $ne: 4 } },
    { $set: { completedChapters: [], lastChapterIndex: 0, currentLevel: 'Beginner', completedAt: null, curriculumVersion: 4 } },
  )
  app.listen(port, () => console.log(`LearnWithAI API listening on http://localhost:${port}`))
}

start().catch((error: unknown) => {
  console.error('Could not start the API:', error)
  process.exitCode = 1
})
