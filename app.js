import "dotenv/config";
import express from "express";
import connectDB from "./db.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import studentRoute from "./routes/students.js";
import authRoute from "./routes/auth.js";
import checkAuth from "./middleware/checkAuth.js";

const app = express();
const PORT = 8080;
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.sendFile(path.join(_dirname, "files", "login.html"));
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    return res.redirect("/homepage");
  } catch (error) {
    return res.sendFile(path.join(_dirname, "files", "login.html"));
  }
});

app.get("/homepage", checkAuth, (req, res) => {
  res.sendFile(path.join(_dirname, "files", "student.html"));
});

app.use("/auth", authRoute);
app.use("/students", studentRoute);

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    path: "/",
  });
  res.status(200).json({
    message: "Cookie Cleared",
    redirectTo: "/",
  });
});

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
