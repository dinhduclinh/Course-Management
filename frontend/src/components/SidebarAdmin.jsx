import React from "react";
import { Link } from "react-router-dom";
import "../css/SidebarAdmin.css";

const SidebarAdmin = () => {
  return (
    <div className="sidebar-admin">
      <Link to="/course-management" className="nav-link">
        Danh sách khóa học
      </Link>
      <Link to="/add-course" className="nav-link">
        Thêm khóa học
      </Link>
      <Link to="/" className="nav-link return-home-link">
        Trở về trang chủ
      </Link>
    </div>
  );
};

export default SidebarAdmin;
