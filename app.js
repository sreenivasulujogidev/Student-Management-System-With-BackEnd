import express from "express";
import connectDB from "./db.js";
import path from "path";
import { fileURLToPath } from "url";
import studentRoute from "./routes/students.js";
import authRoute from "./routes/auth.js";

const app = express();
const PORT = 8080;
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/homepage", (req, res) => {
  res.sendFile(path.join(_dirname, "files", "student.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(_dirname, "files", "login.html"));
});

app.use("/auth", authRoute);

app.use("/students", studentRoute);

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
