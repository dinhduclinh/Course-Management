import Enrollment from "../models/Enrollment.js";
import mongoose from "mongoose";

export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("userId")
      .populate("courseId");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEnrollment = async (req, res) => {
  const { userId, courseId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: "Invalid courseId" });
  }
  const enrollment = new Enrollment({
    userId,
    courseId,
  });
  try {
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEnrollment = async (req, res) => {
  const { id } = req.params;
  try {
    await Enrollment.findByIdAndDelete(id);
    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEnrollmentByUserAndCourse = async (req, res) => {
  const { userId, courseId } = req.params;
  try {
    const course = await Course.findOne({ slug: courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const enrollment = await Enrollment.findOne({
      userId,
      courseId: course._id,
    });
    res.status(200).json({ enrolled: !!enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEnrolledCoursesByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const enrollments = await Enrollment.find({ userId }).populate("courseId");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
