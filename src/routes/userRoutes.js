import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

const router = Router();

router.route("/register").post(createUser);

router.route("/login").post(loginUser);

router.post("/logout", logoutUser);

router.route("/getAllUsers").get(getAllUsers);

router.route("/:id").get(getUserById);

export default router;
