import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/noteRoutes.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();


connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Taskduty API running now 🚀");
});



app.use("/api/tasks", taskRoutes);

app.use("/api/notes", noteRoutes)

app.use("/api/auth", authRoutes);

export default app;