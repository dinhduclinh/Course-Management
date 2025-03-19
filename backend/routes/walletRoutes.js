// backend/routes/walletRoutes.js
import express from "express";
import {
  getUserWallet,
  updateUserWallet,
  adminUpdateUserWallet,
} from "../controllers/walletController.js";

const router = express.Router();

router.get("/:userId", getUserWallet);
router.post("/update", updateUserWallet);
router.post("/admin/update", adminUpdateUserWallet); 

export default router;
