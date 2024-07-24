import asyncHandler from "../middlewares/asyncHandler.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server error. Please try again.");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    res.status(400);
    throw new Error("User does not exist");
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  res.json({
    _id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
    token: existingUser.getSignedToken(),
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json(user);
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});
