import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    passWord: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
