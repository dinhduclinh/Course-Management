import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Announcement from "../components/Announcement";
import LoginPopup from "../components/LoginPopup";
import EditAnnouncementPopup from "../components/EditAnnouncementPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faFemale } from "@fortawesome/free-solid-svg-icons";
import "../css/Homepage.css";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("courses");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditAnnouncement, setShowEditAnnouncement] = useState(false);
  const [announcementMessage, setAnnouncementMessage] = useState(
    "Đang tải thông báo..."
  );

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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await axios.get("http://localhost:9000/announcements");
        setAnnouncementMessage(response.data.message);
      } catch (error) {
        console.error("Lỗi khi lấy thông báo:", error);
        setAnnouncementMessage("Không thể tải thông báo.");
      }
    };
    fetchAnnouncement();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Lưu thông tin người dùng vào localStorage
  };

  const handleLogout = () => {
    setUser(null);
    setShowDropdown(false);
    localStorage.removeItem("user");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleUpdateAnnouncement = (newMessage) => {
    setAnnouncementMessage(newMessage);
  };

  if (loading)
    return (
      <div style={{ fontSize: "30px", textAlign: "center" }}>Chờ xíu...</div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="d-flex">
      <Sidebar
        onSelect={(categoryid) => {
          setSelectedTab(categoryid);
          setSelectedCategory(categoryid);
        }}
      />
      <div className="homepage-container">
        <nav className="navbar">
          <div className="logo" style={{ marginLeft: "20px" }}>
            linhddhe173104
          </div>
          <input type="text" className="search-bar" placeholder="Tìm kiếm..." />
          <div className="nav-links">
            {user && user.roleid === 1 && (
              <>
                <a href="/course-management">Quản lý khóa học</a>
                <a href="#" onClick={() => setShowEditAnnouncement(true)}>
                  Sửa thông báo
                </a>
              </>
            )}
            <a href="#">Khóa học của tôi</a>
            <a href="#">Học liệu</a>
            <a href="#">Coupon</a>
            {user ? (
              <div className="user-dropdown">
                <span className="username">{user.username}</span>
                <FontAwesomeIcon
                  icon={user.gender === 1 ? faMale : faFemale}
                  className="profile-icon"
                  onClick={toggleDropdown}
                />
                {showDropdown && (
                  <div className="dropdown-content">
                    <a href="/profile">Xem thông tin</a>
                    <a href="/change-password">Đổi mật khẩu</a>
                    <a href="#" onClick={handleLogout}>
                      Đăng xuất
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLogin(true);
                }}
              >
                Đăng nhập
              </a>
            )}
            <span className="cart-icon">🛒</span>
          </div>
        </nav>
        <Announcement message={announcementMessage} />
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
      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {showEditAnnouncement && (
        <EditAnnouncementPopup
          onClose={() => setShowEditAnnouncement(false)}
          onUpdate={handleUpdateAnnouncement}
        />
      )}
    </div>
  );
};

export default Homepage;
