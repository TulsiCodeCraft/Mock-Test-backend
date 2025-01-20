import express from "express"
import * as testController from "../controllers/testController"

const router = express.Router()

router.post("/start", testController.startTest)
router.post("/submit", testController.submitTest)
router.get("/results/:userId", testController.getTestResults)

export default router

