import express from "express";
import {
  getCourses,
  createCourse,
  getCoursesByCategory,
  updateCourse,
  deleteCourse,
  getCourseBySlug,
  uploadFile,
  downloadFile,
  updateCourseContent,
} from "../controllers/courseController.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getCourses);
router.post("/", createCourse);
router.get("/category/:categoryid", getCoursesByCategory);
router.put("/:slug", updateCourse);
router.delete("/:slug", deleteCourse);
router.get("/slug/:slug", getCourseBySlug);
router.post("/:slug/upload", upload.single("file"), uploadFile);
router.get("/:slug/download/:fileId", downloadFile);
router.put("/:slug/content", updateCourseContent);

export default router;
