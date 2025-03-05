// backend/routes/courseRoutes.js
import express from "express";
import {
  getCourses,
  createCourse,
  getCoursesByCategory,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCourses);
router.post("/", authMiddleware, adminMiddleware, createCourse);
router.get("/category/:categoryid", getCoursesByCategory);
router.put("/:id", authMiddleware, adminMiddleware, updateCourse);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCourse);

export default router;
