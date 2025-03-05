import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  duration: { type: String, required: true },
  instructor: { type: String, required: true },
  img: { type: String, required: true },
  courseID: { type: Number, required: true },
  oprice: { type: Number, required: true },
  price: { type: Number, required: true },
  categoryid: { type: String, required: true },
});

const Course = mongoose.model("Course", courseSchema, "Courses");
export default Course;
