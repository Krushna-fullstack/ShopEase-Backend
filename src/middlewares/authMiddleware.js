import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id).select("-password");

  next();
};

export const isAdmin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
