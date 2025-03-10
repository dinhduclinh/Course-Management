import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  duration: { type: String, required: true },
  instructor: { type: String, required: true },
  img: { type: String, required: true },
  oprice: { type: Number, required: true },
  price: { type: Number, required: true },
  categoryid: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  files: [{ filename: String, path: String }],
});

const Course = mongoose.model("Course", courseSchema, "Courses");
export default Course;
