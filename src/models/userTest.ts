import mongoose, { type Document, Schema } from "mongoose"

export interface IUserTest extends Document {
  userId: string
  questions: mongoose.Types.ObjectId[]
  answers: number[]
  score: number
  completedAt: Date | null
}

const userTestSchema = new Schema<IUserTest>({
  userId: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  answers: [{ type: Number }],
  score: { type: Number, default: 0 },
  completedAt: { type: Date, default: null },
})

export default mongoose.model<IUserTest>("UserTest", userTestSchema)

