// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faFemale } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Navbar.css";
import LoginPopup from "../components/LoginPopup";
import EditAnnouncementPopup from "../components/EditAnnouncementPopup";

const Navbar = ({ fullWidth }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditAnnouncement, setShowEditAnnouncement] = useState(false);
  const [announcementMessage, setAnnouncementMessage] = useState(
    "Đang tải thông báo..."
  );
  const [xu, setXu] = useState(0); // State to hold xu
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Lấy thông báo từ API
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

  useEffect(() => {
    // Lấy số xu từ API
    const fetchXu = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:9000/wallet/${user._id}`
          );
          setXu(response.data.xu);
        } catch (error) {
          console.error("Lỗi khi lấy số xu:", error);
        }
      }
    };
    fetchXu();
  }, [user]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setShowDropdown(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleUpdateAnnouncement = (newMessage) => {
    setAnnouncementMessage(newMessage);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleXuClick = () => {
    navigate("/user-deposit-xu");
  };

  return (
    <nav className={`navbar ${fullWidth ? "full-width" : ""}`}>
      <div
        className="logo"
        style={{ marginLeft: "20px", cursor: "pointer" }}
        onClick={handleLogoClick}
      >
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
        <a href="/enrolled-courses">Khóa học của tôi</a>
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
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowLogin(true);
            }}
          >
            Đăng nhập
          </a>
        )}
        <span className="cart-icon">🛒</span>
        {user && (
          <span className="xu-icon" onClick={handleXuClick}>
            Xu: {xu}
          </span>
        )}{" "}
        {/* Display xu */}
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
    </nav>
  );
};

export default Navbar;
