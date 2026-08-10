import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/studentManagement");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
  }
}

export default connectDB;
