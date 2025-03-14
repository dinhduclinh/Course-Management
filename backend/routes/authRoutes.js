import express from "express";
import {
  register,
  login,
  changePassword,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", changePassword);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.get("/users", getAllUsers);

export default router;
