import React, { useState } from "react";
import axios from "axios";

const AddCourse = ({ onCourseAdded }) => {
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    duration: "",
    instructor: "",
    img: "",
    category: "",
    courseID: "",
    oprice: "",
    price: "",
  });

  const handleChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/course",
        newCourse
      );
      onCourseAdded(response.data);
      setNewCourse({
        courseName: "",
        duration: "",
        instructor: "",
        img: "",
        category: "",
        courseID: "",
        oprice: "",
        price: "",
      });
    } catch (err) {
      console.error("Lỗi khi thêm khóa học:", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        className="form-control"
        name="courseName"
        placeholder="Tên khóa học"
        value={newCourse.courseName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        className="form-control"
        name="duration"
        placeholder="Thời gian"
        value={newCourse.duration}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        className="form-control"
        name="instructor"
        placeholder="Giảng viên"
        value={newCourse.instructor}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        className="form-control"
        name="img"
        placeholder="URL hình ảnh"
        value={newCourse.img}
        onChange={handleChange}
      />
      <input
        type="text"
        className="form-control"
        name="category"
        placeholder="Danh mục"
        value={newCourse.category}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        className="form-control"
        name="courseID"
        placeholder="Mã khóa học"
        value={newCourse.courseID}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        className="form-control"
        name="oprice"
        placeholder="Giá gốc"
        value={newCourse.oprice}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        className="form-control"
        name="price"
        placeholder="Giá khuyến mãi"
        value={newCourse.price}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn btn-success">
        Thêm Khóa Học
      </button>
    </form>
  );
};

export default AddCourse;
