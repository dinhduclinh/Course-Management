import express from "express";
import {
  getAnnouncement,
  updateAnnouncement,
} from "../controllers/announcementController.js";

const router = express.Router();

router.get("/", getAnnouncement); 
router.put("/", updateAnnouncement); 

export default router;
