import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import notesRoutes from "./routes/notes.js";

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: process.env.ORIGIN || "*" }));

connectDB();

app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Personal Notes Manager API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
