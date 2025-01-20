import type { Request, Response } from "express"
import mongoose from "mongoose"
import Question, { type IQuestion } from "../models/question"
import UserTest, { IUserTest } from "../models/userTest"

const NUM_QUESTIONS = 10

export const startTest = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.body.userId
    if (!userId) {
      res.status(400).json({ error: "User ID is required" })
      return
    }

    const answeredQuestions = await UserTest.find({ userId }).distinct("questions")
    const questions = await Question.find({ _id: { $nin: answeredQuestions } })
      .sort("order")
      .limit(NUM_QUESTIONS)

    if (questions.length < NUM_QUESTIONS) {
      res.status(400).json({ error: "Not enough unique questions available" })
      return
    }

    const newTest = new UserTest({
      userId,
      questions: questions.map((q) => q._id),
    })
    await newTest.save()

    const questionData = questions.map((q: IQuestion) => ({
      id: q._id,
      text: q.text,
      options: q.options,
    }))

    res.json({ testId: newTest._id, questions: questionData })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
}

export const submitTest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { testId, answers } = req.body
    if (!testId || !answers) {
      res.status(400).json({ error: "Test ID and answers are required" })
      return
    }

    const test = await UserTest.findById(testId)
    if (!test) {
      res.status(404).json({ error: "Test not found" })
      return
    }

    if (test.completedAt) {
      res.status(400).json({ error: "Test has already been submitted" })
      return
    }

    if (answers.length !== test.questions.length) {
      res.status(400).json({ error: "Invalid number of answers" })
      return
    }

    const questions = await Question.find({ _id: { $in: test.questions } }).sort("order")

    let score = 0
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i]
      if (answers[i] === question.correctAnswer) {
        score++
      }
    }

    test.answers = answers
    test.score = score
    test.completedAt = new Date()
    await test.save()

    res.json({ score, totalQuestions: questions.length })
  } catch (error) {
    console.error("Error in submitTest:", error)
    res.status(500).json({ error: "Server error" })
  }
}

export const getTestResults = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId
    if (!userId) {
      res.status(400).json({ error: "User ID is required" })
      return
    }

    const tests = await UserTest.find({ userId, completedAt: { $ne: null } })
      .select("score completedAt")
      .sort("-completedAt")

    res.json(tests)
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
}

