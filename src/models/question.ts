import mongoose, { type Document, Schema } from "mongoose"

export interface IQuestion extends Document {
  text: string
  options: string[]
  correctAnswer: number
  order: number
}

const questionSchema = new Schema<IQuestion>({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: Number, required: true },
  order: { type: Number, required: true, unique: true },
})

export default mongoose.model<IQuestion>("Question", questionSchema)

