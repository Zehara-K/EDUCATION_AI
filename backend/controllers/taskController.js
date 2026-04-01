import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
    const tasks = await Task.find({ userId: req.params.userId });
    res.json({ tasks });
};

export const addTask = async (req, res) => {
    await Task.create(req.body);

    const tasks = await Task.find({ userId: req.body.userId });
    res.json({ tasks });
};

export const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    await Task.findByIdAndDelete(req.params.id);

    const tasks = await Task.find({ userId: task.userId });
    res.json({ tasks });
};

export const toggleTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    task.completed = !task.completed;
    await task.save();

    const tasks = await Task.find({ userId: task.userId });
    res.json({ tasks });
};