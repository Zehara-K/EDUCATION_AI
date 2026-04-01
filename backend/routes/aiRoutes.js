import express from "express";
import {
    generatePlanner,
    studyAssistant,
    chatBot
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/planner", generatePlanner);
router.post("/study", studyAssistant);
router.post("/chat", chatBot);

export default router;