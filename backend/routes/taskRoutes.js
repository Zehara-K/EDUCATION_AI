import express from "express";
import {
    getTasks,
    addTask,
    deleteTask,
    toggleTask
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/:userId", getTasks);
router.post("/", addTask);
router.delete("/:id", deleteTask);
router.patch("/:id", toggleTask);

export default router;