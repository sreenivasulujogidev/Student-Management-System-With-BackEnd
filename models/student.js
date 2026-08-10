import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  regNo: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  cgpa: {
    type: Number,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
