import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();


router.post("/register", async (req, res) => {
  console.log("Register request body:", req.body); // debug

  try {
    const { email, username, password } = req.body;

    
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      console.log("Email already registered:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      console.log("Username already taken:", username);
      return res.status(400).json({ message: "Username already taken" });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({
      email,
      username,
      password: hashedPassword
    });

    await user.save();
    console.log("User saved:", user);

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;