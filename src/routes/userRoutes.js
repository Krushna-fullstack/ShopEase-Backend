import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
} from "../controllers/userController.js";

import { authenicate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router
  .route("/")
  .post(createUser)
  .get(authenicate, authorizeAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenicate, getCurrentUserProfile)
  .put(authenicate, updateCurrentUserProfile);

router.route("/:id").delete(authenicate, authorizeAdmin, deleteUserById);

export default router;
