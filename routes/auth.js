import express from "express";
import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express.Router();

app.post("/signup", async (req, res) => {
  const { userName, passWord, mobileNumber } = req.body;
  try {
    const user = await User.findOne({ userName: userName });
    if (user) {
      return res.status(409).json("UserName Already Exists");
    }
    const mNumber = await User.findOne({ mobileNumber: mobileNumber });
    if (mNumber) {
      return res.status(409).json("Mobile Number Already Exits");
    }
    const passWordHash = await bcrypt.hash(passWord, 10);
    const createUser = await User.create({
      userName: userName,
      passWord: passWordHash,
      mobileNumber: mobileNumber,
    });
    const jwt_token = jwt.sign(
      { userID: createUser.userName },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );

    res.cookie("token", jwt_token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
      sameSite: "strict",
      path: "/",
    });

    const decodePayload = jwt.decode(jwt_token);
    console.log(`Signed Up User is ${decodePayload.userID}`);

    res.status(201).json({
      message: "Account Created",
      redirectTo: "/homepage",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post("/signin", async (req, res) => {
  const { userName, passWord } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json("User Not Found");
    }
    const isPassWordCorrect = await bcrypt.compare(passWord, user.passWord);
    if (!isPassWordCorrect) {
      return res.status(401).json("PassWord Not Matched");
    }

    const jwt_token = jwt.sign(
      { userID: user.userName },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );

    res.cookie("token", jwt_token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000,
      sameSite: "strict",
      path: "/",
    });

    const decodePayload = jwt.decode(jwt_token);
    console.log(`Signed In User is ${decodePayload.userID}`);

    res.status(200).json({
      message: "Credentials Verified Successfully",
      redirectTo: "/homepage",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default app;
