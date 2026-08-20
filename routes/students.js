import express from "express";
import Student from "../models/student.js";

const app = express.Router();

app.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ regNo: 1 });
    if (!students) {
      return res.status(404).json("No Students Enrolled");
    }
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.post("/", async (req, res) => {
  try {
    await Student.create(req.body);
    res.status(201).json(`Student Data Added Successfully`);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Registration Number Already Exists",
      });
    }
    console.log(error.message);
    res.status(400).json({
      message: error.message,
    });
  }
});

app.get("/:regNo", async (req, res) => {
  const regNo = req.params.regNo;
  try {
    const details = await Student.findOne({ regNo: regNo });
    if (!details) {
      return res.status(404).json("Student Not found");
    }
    return res.status(200).json(details);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.patch("/:regNo", async (req, res) => {
  const regNo = req.params.regNo;
  try {
    const response = await Student.updateOne(
      { regNo: regNo },
      { $set: req.body },
    );
    if (response.matchedCount === 0) {
      return res.status(404).json("Student Not Found");
    }
    res.status(200).json("Student Data Updated");
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.delete("/:regNo", async (req, res) => {
  const regNo = req.params.regNo;
  try {
    const result = await Student.deleteOne({ regNo: regNo });
    if (result.deletedCount === 0) {
      return res.status(404).json("Student Not Found");
    }
    res.status(200).json("Student Deleted");
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

export default app;
