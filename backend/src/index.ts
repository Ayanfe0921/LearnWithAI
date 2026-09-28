import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { clerkMiddleware, getAuth, requireAuth } from '@clerk/express'
import { fileURLToPath } from 'node:url'
import Course from './models/Course.js'
import { courseSeeds } from './data/courseSeeds.js'

const app = express()
const port = Number(process.env.PORT ?? 4000)
const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173'
const frontendDirectory = fileURLToPath(new URL('../public', import.meta.url))

app.use(cors({ origin: frontendUrl, credentials: true }))
app.use(express.json())
app.use(clerkMiddleware())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'LearnWithAI-api' })
})

app.get('/api/courses', async (_req, res, next) => {
  try {
    const courses = await Course.find().sort({ title: 1 }).lean()
    res.json(courses.map(({ slug, _id, __v, ...course }) => ({ id: slug, ...course })))
  } catch (error) {
    next(error)
  }
})

app.get('/api/me', requireAuth(), (req, res) => {
  res.json({ userId: getAuth(req).userId })
})

app.use(express.static(frontendDirectory))
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api/')) {
    res.sendFile(`${frontendDirectory}/index.html`, (error) => {
      if (error) next(error)
    })
    return
  }
  next()
})

async function start() {
  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) throw new Error('Set MONGODB_URI in backend/.env before starting the API.')
  if (!process.env.CLERK_SECRET_KEY) throw new Error('Set CLERK_SECRET_KEY in backend/.env before starting the API.')

  await mongoose.connect(mongoUri)
  await Course.bulkWrite(courseSeeds.map((course) => ({
    updateOne: { filter: { slug: course.slug }, update: { $setOnInsert: course }, upsert: true },
  })))
  app.listen(port, () => console.log(`LearnWithAI API listening on http://localhost:${port}`))
}

start().catch((error: unknown) => {
  console.error('Could not start the API:', error)
  process.exitCode = 1
})
