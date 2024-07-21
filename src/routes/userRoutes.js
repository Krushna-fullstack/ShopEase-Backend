import { Router } from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
} from "../controllers/userController.js";

const router = Router();

router.route("/register").post(createUser);

router.route("/login").post(loginUser);

router.route("/getAllUsers").get(getAllUsers);

export default router;
