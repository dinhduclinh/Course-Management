import React, { useState } from "react";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import "../css/AddCategory.css";

const AddCategory = () => {
  const [newCategory, setNewCategory] = useState({
    categoryid: "",
    categoryname: "",
  });

  const handleCategoryChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:9000/category", newCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Thêm danh mục thành công!");
      setNewCategory({ categoryid: "", categoryname: "" });
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };

  return (
    <div className="d-flex">
      <SidebarAdmin />
      <div className="add-category-container">
        <h2>Thêm danh mục</h2>
        <form className="category-form" onSubmit={handleAddCategory}>
          <div className="form-group">
            <label htmlFor="categoryid">ID danh mục</label>
            <input
              type="text"
              id="categoryid"
              name="categoryid"
              placeholder="ID danh mục"
              value={newCategory.categoryid}
              onChange={handleCategoryChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryname">Tên danh mục</label>
            <input
              type="text"
              id="categoryname"
              name="categoryname"
              placeholder="Tên danh mục"
              value={newCategory.categoryname}
              onChange={handleCategoryChange}
              required
            />
          </div>
          <button type="submit" className="btn-save">
            Thêm danh mục
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
