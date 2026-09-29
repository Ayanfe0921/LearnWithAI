import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const chapterSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'], required: true },
  practice: { type: String, required: true },
  checkpoint: { type: String, required: true },
  illustration: { type: String },
  imageAlt: { type: String },
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
  image: { type: String, required: true },
  imageAlt: { type: String, required: true },
  description: { type: String, required: true },
  referencePriceNgn: { type: Number, min: 1, required: true },
  priceNgn: { type: Number, min: 1 },
  chapters: { type: [chapterSchema], default: [] },
}, { timestamps: true })

export type CourseRecord = InferSchemaType<typeof courseSchema>
export default mongoose.models.Course ?? mongoose.model('Course', courseSchema)
