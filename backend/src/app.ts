import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { clerkMiddleware, getAuth, requireAuth } from '@clerk/express'
import { fileURLToPath } from 'node:url'
import courseRoutes from './routes/course.routes.js'
import paymentRoutes from './routes/payments.routes.js'
import aiRoutes from './routes/ai.routes.js'
import progressRoutes from './routes/progress.routes.js'
import checkpointRoutes from './routes/checkpoint.routes.js'

const app = express()
const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173'
const frontendDirectory = fileURLToPath(new URL('../public', import.meta.url))

app.use(cors({ origin: frontendUrl, credentials: true }))
app.use(express.json())
app.use(clerkMiddleware())

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'LearnWithAI-api' }))
app.use('/api/courses', courseRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/checkpoints', checkpointRoutes)
app.get('/api/me', requireAuth(), (req, res) => res.json({ userId: getAuth(req).userId }))

// Keep this before static hosting so missing API endpoints can never receive index.html.
app.use('/api', (_req, res) => res.status(404).json({ message: 'API endpoint not found.' }))
app.use(express.static(frontendDirectory))
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api/')) {
    res.sendFile(`${frontendDirectory}/index.html`, (error) => { if (error) next(error) })
    return
  }
  next()
})
app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled API error:', error)
  if (!res.headersSent) res.status(500).json({ message: 'The server could not complete this request. Please try again.' })
})

export default app
