import express from "express";
import Task from "../models/task.js";

const router = express.Router();


router.post("/", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});
router.get("/tasks", async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }

    const tasks = await Task.find(query);

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;