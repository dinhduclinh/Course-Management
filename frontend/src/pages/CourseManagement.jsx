import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import "../css/CourseManagement.css";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="d-flex">
      <SidebarAdmin />
      <div className="course-management-container">
        <h2>Quản lý khóa học</h2>
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
                    <button className="btn-edit">Sửa</button>
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
      </div>
    </div>
  );
};

export default CourseManagement;
