import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../css/CourseDetail.css";

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showEditAnnouncement, setShowEditAnnouncement] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/course/slug/${slug}`
        );
        setCourse(response.data);
        setDescription(response.data.description);
        setDetails(response.data.details);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setIsAdmin(storedUser && storedUser.roleid === 1);
    fetchCourseDetails();
  }, [slug]);

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:9000/course/${slug}/content`, {
        description,
        details,
      });
      alert("Cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  const handleBuyCourse = () => {
    alert("Khóa học đã được thêm vào giỏ hàng!");
  };

  const handleAddToCart = () => {
    alert("Khóa học đã được thêm vào giỏ hàng!");
  };

  if (loading) return <div className="loading">Chờ xíu...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="course-detail-page">
      <Navbar
        user={user}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        fullWidth={true}
      />
      <div className="container">
        <div className="course-content">
          <h2 className="course-title">{course.courseName}</h2>
          <div className="course-info">
            <p>
              <strong>Thời lượng:</strong> {course.duration}
            </p>
            <p>
              <strong>Giảng viên:</strong> {course.instructor}
            </p>
            <p className="course-price">
              <strong>Giá gốc:</strong> <del>{course.oprice}đ</del>
              <strong className="discount-price"> {course.price}đ</strong>
            </p>
          </div>
          <div className="course-description">
            <h3>Mô tả</h3>
            {isAdmin ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              <p>{description}</p>
            )}
          </div>
          <div className="course-details">
            <h3>Chi tiết</h3>
            {isAdmin ? (
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            ) : (
              <p>{details}</p>
            )}
          </div>
          {isAdmin && (
            <button className="btn-save" onClick={handleEdit}>
              Lưu thay đổi
            </button>
          )}
          <div className="course-actions">
            <button className="btn-add-to-cart" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </button>
            <button className="btn-buy" onClick={handleBuyCourse}>
              Thanh toán ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
