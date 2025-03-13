import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../css/EnrolledCourses.css";

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/enrollments/user/${storedUser._id}`
        );
        setEnrolledCourses(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (loading) return <div className="enrolled-loading">Loading...</div>;
  if (error) return <div className="enrolled-error">Error: {error}</div>;

  return (
    <div className="enrolled-courses-page">
      <Navbar user={user} fullWidth={true} />
      <div className="enrolled-container">
        <h2>Khóa học đã đăng ký</h2>
        <div className="enrolled-courses-list">
          {enrolledCourses.length === 0 ? (
            <p>Bạn chưa đăng ký khóa học nào.</p>
          ) : (
            enrolledCourses.map((enrollment) => (
              <div key={enrollment._id} className="enrolled-course-item">
                <img
                  src={
                    enrollment.courseId.img || "https://via.placeholder.com/300"
                  }
                  alt={enrollment.courseId.courseName}
                />
                <div className="enrolled-course-info">
                  <h5>{enrollment.courseId.courseName}</h5>
                  <p>
                    <strong>Thời lượng:</strong> {enrollment.courseId.duration}
                  </p>
                  <p>
                    <strong>Giá:</strong>{" "}
                    <del>{enrollment.courseId.oprice}đ</del>
                    <strong className="enrolled-discount-price">
                      {" "}
                      {enrollment.courseId.price}đ
                    </strong>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourses;
