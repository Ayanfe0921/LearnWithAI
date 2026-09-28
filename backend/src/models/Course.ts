import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const chapterSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  duration: { type: String, required: true },
}, { _id: false })

const courseSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true, index: true },
  level: { type: String, required: true },
  duration: { type: String, required: true },
  lessons: { type: Number, required: true },
  emoji: { type: String, required: true },
  accent: { type: String, required: true },
  description: { type: String, required: true },
  chapters: { type: [chapterSchema], default: [] },
}, { timestamps: true })

export type CourseRecord = InferSchemaType<typeof courseSchema>
export default mongoose.models.Course ?? mongoose.model('Course', courseSchema)
