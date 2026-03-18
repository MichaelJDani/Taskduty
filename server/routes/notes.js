const express = require("express");
const router = express.Router();
const Note = require("../models/notes");

router.post("/", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
});


router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});


router.get("/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
});


router.put("/:id", async (req, res) => {
  const updated = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});


router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;