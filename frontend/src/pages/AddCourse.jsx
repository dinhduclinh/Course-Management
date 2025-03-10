import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import "../css/AddCourse.css";

const AddCourse = () => {
  const [categories, setCategories] = useState([]);
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    duration: "",
    instructor: "",
    img: "",
    oprice: "",
    price: "",
    categoryid: "",
    description: "",
    details: "",
  });
  const [newCategory, setNewCategory] = useState({
    categoryid: "",
    categoryname: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:9000/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/course", newCourse);
      alert("Thêm khóa học thành công!");
      setNewCourse({
        courseName: "",
        duration: "",
        instructor: "",
        img: "",
        oprice: "",
        price: "",
        categoryid: "",
        description: "",
        details: "",
      });
    } catch (error) {
      console.error("Lỗi khi thêm khóa học:", error);
    }
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
      const response = await axios.get("http://localhost:9000/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };

  const handleEditCategory = async (id) => {
    const updatedCategory = prompt("Nhập tên danh mục mới:");
    if (updatedCategory) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:9000/category/${id}`,
          { categoryname: updatedCategory },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Cập nhật danh mục thành công!");
        const response = await axios.get("http://localhost:9000/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi cập nhật danh mục:", error);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:9000/category/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Xóa danh mục thành công!");
        const response = await axios.get("http://localhost:9000/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error);
      }
    }
  };

  return (
    <div className="d-flex">
      <SidebarAdmin />
      <div className="add-course-container">
        <h2>Thêm khóa học</h2>
        <form className="course-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="courseName">Tên khóa học</label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              placeholder="Tên khóa học"
              value={newCourse.courseName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Thời lượng</label>
            <input
              type="text"
              id="duration"
              name="duration"
              placeholder="Thời lượng"
              value={newCourse.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="instructor">Giảng viên</label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              placeholder="Giảng viên"
              value={newCourse.instructor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="img">Hình ảnh URL</label>
            <input
              type="text"
              id="img"
              name="img"
              placeholder="Hình ảnh URL"
              value={newCourse.img}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="oprice">Giá gốc</label>
            <input
              type="number"
              id="oprice"
              name="oprice"
              placeholder="Giá gốc"
              value={newCourse.oprice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Giá khuyến mãi</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Giá khuyến mãi"
              value={newCourse.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryid">Danh mục</label>
            <select
              id="categoryid"
              name="categoryid"
              value={newCourse.categoryid}
              onChange={handleChange}
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category._id} value={category.categoryid}>
                  {category.categoryname}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              placeholder="Mô tả"
              value={newCourse.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="details">Chi tiết</label>
            <textarea
              id="details"
              name="details"
              placeholder="Chi tiết"
              value={newCourse.details}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-save">
            Thêm khóa học
          </button>
        </form>
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
            Submit
          </button>
        </form>
        <div className="category-list">
          <h3>Danh sách danh mục</h3>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên danh mục</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.categoryid}</td>
                  <td>{category.categoryname}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => handleEditCategory(category._id)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
