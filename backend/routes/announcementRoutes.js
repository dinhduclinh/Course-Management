import express from "express";
import {
  getAnnouncement,
  updateAnnouncement,
} from "../controllers/announcementController.js";

const router = express.Router();

router.get("/", getAnnouncement); 
router.post("/", updateAnnouncement); 

export default router;
