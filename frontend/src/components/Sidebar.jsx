import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import "../css/Sidebar.css";

const Sidebar = ({ onSelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:9000/category");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="sidebar">
      <h4 className="text-center text-white mb-4">Danh mục</h4>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link onClick={() => onSelect(null)}>Tất cả khóa học</Nav.Link>
        {categories.map((category, index) => (
          <Nav.Link key={index} onClick={() => onSelect(category.categoryid)}>
            {category.categoryname}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
