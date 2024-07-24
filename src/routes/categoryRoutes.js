import { Router } from "express";
import { createCategory } from "./../controllers/categoryController.js";

const router = Router();

router.route("/").post(createCategory);

export default router;
