// backend/models/Enrollment.js
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  enrolledAt: { type: Date, default: Date.now },
  paid: { type: Boolean, default: false }, 
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
