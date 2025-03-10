import Course from "../models/Course.js";
import fs from "fs";
import path from "path";
import slugify from "slugify";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  const {
    courseName,
    duration,
    instructor,
    img,
    oprice,
    price,
    categoryid,
    description,
    details,
  } = req.body;
  const slug = slugify(courseName, { lower: true });
  const course = new Course({
    courseName,
    duration,
    instructor,
    img,
    oprice,
    price,
    categoryid,
    slug,
    description,
    details,
    files: [],
  });
  try {
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCoursesByCategory = async (req, res) => {
  const { categoryid } = req.params;
  try {
    const courses = await Course.find({ categoryid });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  const { slug } = req.params;
  try {
    const updatedCourse = await Course.findOneAndUpdate({ slug }, req.body, {
      new: true,
    });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  const { slug } = req.params;
  try {
    await Course.findOneAndDelete({ slug });
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCourseBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    console.log(`Fetching course with slug: ${slug}`);
    const course = await Course.findOne({ slug });
    if (!course) {
      console.log(`Course with slug ${slug} not found`);
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(`Error fetching course with slug ${slug}:`, error);
    res.status(500).json({ message: error.message });
  }
};

export const uploadFile = async (req, res) => {
  const { slug } = req.params;
  const { filename, path } = req.file;
  try {
    const course = await Course.findOne({ slug });
    course.files.push({ filename, path });
    await course.save();
    res.status(201).json({ filename, path });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const downloadFile = async (req, res) => {
  const { slug, fileId } = req.params;
  try {
    const course = await Course.findOne({ slug });
    const file = course.files.find((f) => f._id.toString() === fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.download(file.path, file.filename);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourseContent = async (req, res) => {
  const { slug } = req.params;
  const { description, details } = req.body;
  try {
    const course = await Course.findOneAndUpdate(
      { slug },
      { description, details },
      { new: true }
    );
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
