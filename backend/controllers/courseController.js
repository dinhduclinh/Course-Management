import Course from "../models/Course.js";
import fs from "fs";
import path from "path";
import slugify from "slugify";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../frontend/src/img/"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  upload.single("img")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    const {
      courseName,
      duration,
      instructor,
      oprice,
      price,
      categoryid,
      description,
      details,
    } = req.body;
    const slug = slugify(courseName, { lower: true });
    const img = req.file
      ? `http://localhost:9000/img/${req.file.filename}`
      : "";
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
  });
};

export const updateCourse = async (req, res) => {
  upload.single("img")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    const { slug } = req.params;
    const {
      courseName,
      duration,
      instructor,
      oprice,
      price,
      categoryid,
      description,
      details,
    } = req.body;
    const img = req.file
      ? `http://localhost:9000/img/${req.file.filename}`
      : req.body.img;
    try {
      const updatedCourse = await Course.findOneAndUpdate(
        { slug },
        {
          courseName,
          duration,
          instructor,
          img,
          oprice,
          price,
          categoryid,
          description,
          details,
        },
        { new: true }
      );
      res.status(200).json(updatedCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};

export const deleteCourse = async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await Course.findOne({ slug });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (course.img) {
      const imgPath = path.join(
        __dirname,
        "../../frontend/src/img/",
        course.img.split("/").pop()
      );
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }
    await Course.findOneAndDelete({ slug });
    res.status(200).json({ message: "Course deleted successfully" });
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

export const getCourseBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await Course.findOne({ slug });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
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
