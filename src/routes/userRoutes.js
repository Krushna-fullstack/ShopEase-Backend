import { Router } from "express";

const router = Router();

router.route("/register").post(createUser);

export default router;
