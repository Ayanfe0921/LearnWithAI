import mongoose, { Schema } from 'mongoose'

const enrollmentSchema = new Schema({
  userId: { type: String, required: true },
  courseSlug: { type: String, required: true },
  reference: { type: String, required: true },
  amountKobo: { type: Number, required: true },
  paidAt: { type: Date, default: Date.now },
}, { timestamps: true })

enrollmentSchema.index({ userId: 1, courseSlug: 1 }, { unique: true })
enrollmentSchema.index({ reference: 1 }, { unique: true })

export default mongoose.models.CourseEnrollment ?? mongoose.model('CourseEnrollment', enrollmentSchema)
