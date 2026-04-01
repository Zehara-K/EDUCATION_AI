import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: String,
    task: { type: String, required: true },
    date: String,
    priority: String,
    completed: { type: Boolean, default: false }
});

export default mongoose.model("Task", taskSchema);



