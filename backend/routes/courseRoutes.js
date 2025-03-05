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
router.post("/", createCourse);
router.get("/category/:categoryid", getCoursesByCategory);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
