import { Op } from "sequelize";
import { Task } from "../models/Task.js";

//Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      userId: req.user.id,
      createdBy: req.user.id,
    });
    return res.status(201).json(task);
  } catch (err) {
    console.error("❌ Error creating task:", err);
    res.status(500).json({ error: err.message });
  }
};

// Read all task and filters
export const getTasks = async (req, res) => {
  try {
    const { status, priority, search, dueDate } = req.query;

    const where = { userId: req.user.id };

    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    // Handle dueDate filter
    if (dueDate === "today") {
      const today = new Date();
      const start = new Date(today.setHours(0, 0, 0, 0));
      const end = new Date(today.setHours(23, 59, 59, 999));
      where.dueDate = { [Op.between]: [start, end] };
    } else if (dueDate === "upcoming") {
      where.dueDate = { [Op.gt]: new Date() };
    } else if (dueDate === "past") {
      where.dueDate = { [Op.lt]: new Date() };
    }

    const tasks = await Task.findAll({ where });
    res.json(tasks);
  } catch (err) {
    console.error("❌ Error fetching tasks:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update Tasks
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) return res.status(404).json({ message: "Task not found" });
    await task.update(req.body);
    res.json(task);
  } catch (err) {
    console.error("❌ Error updating task:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) return res.status(404).json({ message: "Task not found" });
    await task.destroy();
    res.json({ message: "Task Deleted" });
  } catch (err) {
    console.error("❌ Error deleting task:", err);
    res.status(500).json({ error: err.message });
  }
};
