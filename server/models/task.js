import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);