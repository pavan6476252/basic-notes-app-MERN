import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    default: "Others",
    enum: ["Work", "Personal", "Others"],
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

noteSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const NoteModel = mongoose.model("Note", noteSchema);
export default NoteModel;
