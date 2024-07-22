import asyncHandler from "../middlewares/asyncHandler.js";
import { Category } from "../models/categoryModel.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Check if category already exists

  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    res.status(400);
    throw new Error("Category already exists");
  }

  try {
    const category = await Category.create({
      name,
    });

    res.status(201).json({
      _id: category._id,
      name: category.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Server error. Please try again.");
  }
});
