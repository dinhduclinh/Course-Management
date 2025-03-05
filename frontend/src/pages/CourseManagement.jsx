// frontend/src/pages/CourseManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../css/CourseManagement.css";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    duration: "",
    instructor: "",
    img: "",
    courseID: "",
    oprice: "",
    price: "",
    categoryid: "",
  });
  const [editCourse, setEditCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await axios.get("http://localhost:9000/course");
        const categoriesResponse = await axios.get(
          "http://localhost:9000/category"
        );
        setCourses(coursesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddCourse = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/course",
        newCourse
      );
      setCourses([...courses, response.data]);
      setNewCourse({
        courseName: "",
        duration: "",
        instructor: "",
        img: "",
        courseID: "",
        oprice: "",
        price: "",
        categoryid: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditCourse = (course) => {
    setEditCourse(course);
    setNewCourse(course);
  };

  const handleUpdateCourse = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9000/course/${editCourse._id}`,
        newCourse
      );
      setCourses(
        courses.map((course) =>
          course._id === editCourse._id ? response.data : course
        )
      );
      setEditCourse(null);
      setNewCourse({
        courseName: "",
        duration: "",
        instructor: "",
        img: "",
        courseID: "",
        oprice: "",
        price: "",
        categoryid: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/course/${id}`);
      setCourses(courses.filter((course) => course._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <div style={{ fontSize: "30px", textAlign: "center" }}>Loading...</div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="d-flex">
      <div className="course-management-container">
        <h2>Course Management</h2>
        <div className="course-form">
          <input
            type="text"
            name="courseName"
            placeholder="Course Name"
            value={newCourse.courseName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={newCourse.duration}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="instructor"
            placeholder="Instructor"
            value={newCourse.instructor}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="img"
            placeholder="Image URL"
            value={newCourse.img}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="courseID"
            placeholder="Course ID"
            value={newCourse.courseID}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="oprice"
            placeholder="Original Price"
            value={newCourse.oprice}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Sale Price"
            value={newCourse.price}
            onChange={handleInputChange}
          />
          <select
            name="categoryid"
            value={newCourse.categoryid}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.categoryid}>
                {category.categoryname}
              </option>
            ))}
          </select>
          {editCourse ? (
            <button onClick={handleUpdateCourse}>Update Course</button>
          ) : (
            <button onClick={handleAddCourse}>Add Course</button>
          )}
        </div>
        <div className="courses-list">
          {courses.map((course) => (
            <div key={course._id} className="course-item">
              <h5>{course.courseName}</h5>
              <p>Duration: {course.duration}</p>
              <p>Instructor: {course.instructor}</p>
              <p>Original Price: {course.oprice}</p>
              <p>Sale Price: {course.price}</p>
              <button onClick={() => handleEditCourse(course)}>Edit</button>
              <button onClick={() => handleDeleteCourse(course._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
