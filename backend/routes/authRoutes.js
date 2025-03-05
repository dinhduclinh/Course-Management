import express from "express";
import {
  register,
  login,
  changePassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", changePassword);

export default router;
