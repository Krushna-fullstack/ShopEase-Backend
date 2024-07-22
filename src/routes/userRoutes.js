import { Router } from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

const router = Router();

router.route("/register").post(createUser);

router.route("/login").post(loginUser);

router.route("/getAllUsers").get(getAllUsers);

router.route("/:id").get(getUserById);

export default router;
