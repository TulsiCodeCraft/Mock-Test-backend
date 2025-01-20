import mongoose from "mongoose"
import dotenv from "dotenv"
import Question from "../models/question"

dotenv.config()

const sampleQuestions = [
  {
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    order: 0,
  },
  {
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    order: 1,
  },
  {
    text: "Who wrote the play 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
    correctAnswer: 0,
    order: 2,
  },
  {
    text: "What is the largest mammal on Earth?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: 1,
    order: 3,
  },
  {
    text: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Gold", "Osmium", "Carbon"],
    correctAnswer: 0,
    order: 4,
  },
  {
    text: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correctAnswer: 2,
    order: 5,
  },
  {
    text: "In which year did World War II end?",
    options: ["1942", "1945", "1948", "1950"],
    correctAnswer: 1,
    order: 6,
  },
  {
    text: "Which is the smallest prime number?",
    options: ["1", "2", "3", "5"],
    correctAnswer: 1,
    order: 7,
  },
  {
    text: "What is the currency of Japan?",
    options: ["Dollar", "Euro", "Yen", "Won"],
    correctAnswer: 2,
    order: 8,
  },
  {
    text: "Which gas do plants primarily use during photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: 1,
    order: 9,
  },
]

async function populateQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log("Connected to MongoDB")

    await Question.deleteMany({})
    await Question.insertMany(sampleQuestions)

    console.log("Sample questions inserted successfully")
  } catch (error) {
    console.error("Error populating questions:", error)
  } finally {
    mongoose.disconnect()
  }
}

populateQuestions()

