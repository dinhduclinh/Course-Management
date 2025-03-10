import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import "../css/CourseManagement.css";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCourse, setEditCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await axios.get("http://localhost:9000/course");
        const categoriesResponse = await axios.get(
          "http://localhost:9000/category"
        );
        setCourses(coursesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:9000/course/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Xóa khóa học thành công!");
        const updatedCourses = courses.filter((course) => course._id !== id);
        setCourses(updatedCourses);
      } catch (error) {
        console.error("Lỗi khi xóa khóa học:", error);
      }
    }
  };

  const handleEditCourse = (course) => {
    setEditCourse(course);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:9000/course/${editCourse._id}`,
        editCourse,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Cập nhật khóa học thành công!");
      const updatedCourses = courses.map((course) =>
        course._id === editCourse._id ? editCourse : course
      );
      setCourses(updatedCourses);
      setEditCourse(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật khóa học:", error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="d-flex">
      <SidebarAdmin />
      <div className="course-management-container">
        <h2>Danh sách khóa học</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên khóa học</th>
                <th>Thời lượng</th>
                <th>Giảng viên</th>
                <th>Giá gốc</th>
                <th>Giá khuyến mãi</th>
                <th>Danh mục</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1}</td>
                  <td>{course.courseName}</td>
                  <td>{course.duration}</td>
                  <td>{course.instructor}</td>
                  <td>{course.oprice}</td>
                  <td>{course.price}</td>
                  <td>
                    {categories.find(
                      (cat) => cat.categoryid === course.categoryid
                    )?.categoryname || "Không xác định"}
                  </td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditCourse(course)}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteCourse(course._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editCourse && (
          <div className="edit-course-modal">
            <h3>Chỉnh sửa khóa học</h3>
            <form>
              <div className="form-group">
                <label htmlFor="courseName">Tên khóa học</label>
                <input
                  type="text"
                  id="courseName"
                  name="courseName"
                  value={editCourse.courseName}
                  onChange={(e) =>
                    setEditCourse({ ...editCourse, courseName: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="duration">Thời lượng</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={editCourse.duration}
                  onChange={(e) =>
                    setEditCourse({ ...editCourse, duration: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="instructor">Giảng viên</label>
                <input
                  type="text"
                  id="instructor"
                  name="instructor"
                  value={editCourse.instructor}
                  onChange={(e) =>
                    setEditCourse({ ...editCourse, instructor: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="oprice">Giá gốc</label>
                <input
                  type="number"
                  id="oprice"
                  name="oprice"
                  value={editCourse.oprice}
                  onChange={(e) =>
                    setEditCourse({ ...editCourse, oprice: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Giá khuyến mãi</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={editCourse.price}
                  onChange={(e) =>
                    setEditCourse({ ...editCourse, price: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="categoryid">Danh mục</label>
                <select
                  id="categoryid"
                  name="categoryid"
                  value={editCourse.categoryid}
                  onChange={(e) =>
                    setEditCourse({ ...editCourse, categoryid: e.target.value })
                  }
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category.categoryid}>
                      {category.categoryname}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="btn-save"
                onClick={handleSaveEdit}
              >
                Lưu thay đổi
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setEditCourse(null)}
              >
                Hủy
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManagement;
