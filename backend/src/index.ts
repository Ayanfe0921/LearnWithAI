import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { clerkMiddleware, getAuth, requireAuth } from '@clerk/express'

const app = express()
const port = Number(process.env.PORT ?? 4000)
const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173'

app.use(cors({ origin: frontendUrl, credentials: true }))
app.use(express.json())
app.use(clerkMiddleware())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'learnwithai-api' })
})

app.get('/api/me', requireAuth(), (req, res) => {
  res.json({ userId: getAuth(req).userId })
})

async function start() {
  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) throw new Error('Set MONGODB_URI in backend/.env before starting the API.')
  if (!process.env.CLERK_SECRET_KEY) throw new Error('Set CLERK_SECRET_KEY in backend/.env before starting the API.')

  await mongoose.connect(mongoUri)
  app.listen(port, () => console.log(`LearnWithAI API listening on http://localhost:${port}`))
}

start().catch((error: unknown) => {
  console.error('Could not start the API:', error)
  process.exitCode = 1
})
