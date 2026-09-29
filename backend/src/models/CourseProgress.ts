import mongoose, { Schema } from 'mongoose'

const courseProgressSchema = new Schema({
  userId: { type: String, required: true },
  courseSlug: { type: String, required: true },
  completedChapters: { type: [Number], default: [] },
  lastChapterIndex: { type: Number, default: 0 },
  currentLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'], default: 'Beginner' },
  curriculumVersion: { type: Number, default: 4 },
  completedAt: { type: Date, default: null },
}, { timestamps: true })

courseProgressSchema.index({ userId: 1, courseSlug: 1 }, { unique: true })

export default mongoose.models.CourseProgress ?? mongoose.model('CourseProgress', courseProgressSchema)
