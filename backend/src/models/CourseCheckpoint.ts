import mongoose, { Schema } from 'mongoose'

const checkpointSchema = new Schema({
  userId: { type: String, required: true },
  courseSlug: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'], required: true },
  submissionUrl: { type: String, required: true },
  submissionText: { type: String, default: '' },
  grade: {
    score: Number,
    summary: String,
    strengths: [String],
    corrections: [String],
    improvements: [String],
    followUpQuestion: String,
  },
  status: { type: String, enum: ['submitted', 'approved'], default: 'submitted' },
}, { timestamps: true })

checkpointSchema.index({ userId: 1, courseSlug: 1, level: 1 }, { unique: true })

export default mongoose.models.CourseCheckpoint ?? mongoose.model('CourseCheckpoint', checkpointSchema)
