import asyncHandler from "../middlewares/asyncHandler.js";
import { User } from "../models/userModel.js";

export const createUser = asyncHandler(async (req, res) => {
  return res.status(201).json({ message: "User Created" });
});
