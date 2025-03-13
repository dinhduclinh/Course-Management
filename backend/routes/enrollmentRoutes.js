import express from "express";
import {
  getEnrollments,
  createEnrollment,
  deleteEnrollment,
  getEnrollmentByUserAndCourse,
  getEnrolledCoursesByUser,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.get("/", getEnrollments);
router.post("/", createEnrollment);
router.delete("/:id", deleteEnrollment);
router.get("/user/:userId/course/:courseId", getEnrollmentByUserAndCourse);
router.get("/user/:userId", getEnrolledCoursesByUser);

export default router;
