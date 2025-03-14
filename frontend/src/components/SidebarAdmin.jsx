import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa"; // Icon đóng/mở
import "../css/SidebarAdmin.css";

const SidebarAdmin = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="sidebar-admin">
      <div className="management-section">
        <div
          className="management-header"
          onClick={() => toggleSection("courses")}
        >
          <span>Quản lý khóa học</span>
          {openSections["courses"] ? <FaChevronDown /> : <FaChevronRight />}
        </div>
        <div
          className={`management-links ${
            openSections["courses"] ? "show" : ""
          }`}
        >
          <Link to="/course-management" className="nav-link">
            Danh sách khóa học
          </Link>
          <Link to="/add-course" className="nav-link">
            Thêm khóa học
          </Link>
          <Link to="/add-category" className="nav-link">
            Thêm danh mục
          </Link>
          <Link to="/category-management" className="nav-link">
            Quản lý danh mục
          </Link>
        </div>
      </div>
      <div className="management-section">
        <div
          className="management-header"
          onClick={() => toggleSection("registrations")}
        >
          <span>Quản lý đăng ký</span>
          {openSections["registrations"] ? (
            <FaChevronDown />
          ) : (
            <FaChevronRight />
          )}
        </div>
        <div
          className={`management-links ${
            openSections["registrations"] ? "show" : ""
          }`}
        >
          <Link to="/enrollment-management" className="nav-link">
            Danh sách đăng ký
          </Link>
          <Link to="/add-enrollment" className="nav-link">
            Thêm đăng ký khóa học
          </Link>
        </div>
      </div>
      <div className="management-section">
        <div
          className="management-header"
          onClick={() => toggleSection("users")}
        >
          <span>Quản lý người dùng</span>
          {openSections["users"] ? <FaChevronDown /> : <FaChevronRight />}
        </div>
        <div
          className={`management-links ${openSections["users"] ? "show" : ""}`}
        >
          <Link to="/user-management" className="nav-link">
            Danh sách người dùng
          </Link>
          <Link to="/add-user" className="nav-link">
            Thêm người dùng
          </Link>
        </div>
      </div>
      <Link to="/" className="nav-link return-home-link">
        Trở về trang chủ
      </Link>
    </div>
  );
};

export default SidebarAdmin;
