import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import "../css/Homepage.css";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let response;
        if (selectedCategory) {
          response = await axios.get(
            `http://localhost:9000/course/category/${selectedCategory}`
          );
        } else {
          response = await axios.get("http://localhost:9000/course");
        }
        setCourses(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [selectedCategory]);

  if (loading)
    return (
      <div style={{ fontSize: "30px", textAlign: "center" }}>Chờ xíu...</div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="d-flex">
      <Sidebar onSelect={(categoryid) => setSelectedCategory(categoryid)} />
      <div className="homepage-container">
        <Navbar />
        <Announcement />
        <div className="main-content">
          <h2>Danh sách khóa học</h2>
          <div className="courses-grid">
            {courses.length === 0 ? (
              <p>Không có khóa học nào.</p>
            ) : (
              courses.map((course) => (
                <div key={course._id} className="course-item">
                  <Link to={`/course/${course.slug}`}>
                    <img
                      src={course.img || "https://via.placeholder.com/300"}
                      alt={course.courseName}
                    />
                    <h5>{course.courseName}</h5>
                  </Link>
                  <div className="course-details">
                    <p>
                      <strong>Thời lượng:</strong> {course.duration}
                    </p>
                    <p>
                      <strong>Giảng viên:</strong> {course.instructor}
                    </p>
                    <p>
                      <strong>Giá gốc:</strong> <del>{course.oprice}đ</del>
                    </p>
                    <p>
                      <strong>Giá khuyến mãi:</strong>{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        {course.price}đ
                      </span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
