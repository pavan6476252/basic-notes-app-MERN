import express from "express";
import Note from "../models/note.js";
import { noteSchema } from "../utils/validation.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = noteSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };

    const notes = await Note.find(query).sort({ created_at: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { error } = noteSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!note) return res.status(404).json({ error: "Note not found" });

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
