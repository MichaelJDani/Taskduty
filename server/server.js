import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Taskduty API running 🚀");
});

app.use("/api/auth", authRoutes);

export default app;