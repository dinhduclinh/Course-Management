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
    img: null,
    oprice: "",
    price: "",
    categoryid: "",
    description: "",
    details: "",
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

  const handleFileChange = (e) => {
    setNewCourse({ ...newCourse, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseName", newCourse.courseName);
    formData.append("duration", newCourse.duration);
    formData.append("instructor", newCourse.instructor);
    formData.append("img", newCourse.img);
    formData.append("oprice", newCourse.oprice);
    formData.append("price", newCourse.price);
    formData.append("categoryid", newCourse.categoryid);
    formData.append("description", newCourse.description);
    formData.append("details", newCourse.details);
    try {
      await axios.post("http://localhost:9000/course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Thêm khóa học thành công!");
      setNewCourse({
        courseName: "",
        duration: "",
        instructor: "",
        img: null,
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
            <label htmlFor="img">Hình ảnh</label>
            <input
              type="file"
              id="img"
              name="img"
              onChange={handleFileChange}
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
      </div>
    </div>
  );
};

export default AddCourse;
