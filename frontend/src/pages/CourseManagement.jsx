import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import SidebarAdmin from "../components/SidebarAdmin";
import "../css/CourseManagement.css";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCourse, setEditCourse] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);

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

  const handleEditCourse = (course) => {
    setEditCourse(course);
    setShowEditModal(true);
    setImageChanged(false);
  };

  const handleUpdateCourse = async () => {
    const formData = new FormData();
    formData.append("courseName", editCourse.courseName);
    formData.append("duration", editCourse.duration);
    formData.append("instructor", editCourse.instructor);
    if (imageChanged) {
      formData.append("img", editCourse.img);
    }
    formData.append("oprice", editCourse.oprice);
    formData.append("price", editCourse.price);
    formData.append("categoryid", editCourse.categoryid);
    formData.append("description", editCourse.description);
    formData.append("details", editCourse.details);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:9000/course/${editCourse.slug}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Cập nhật khóa học thành công!");
      const response = await axios.get("http://localhost:9000/course");
      setCourses(response.data);
      setEditCourse(null);
      setShowEditModal(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật khóa học:", error);
    }
  };

  const handleDeleteCourse = async (slug) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:9000/course/${slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Xóa khóa học thành công!");
        const updatedCourses = courses.filter((course) => course.slug !== slug);
        setCourses(updatedCourses);
      } catch (error) {
        console.error("Lỗi khi xóa khóa học:", error);
      }
    }
  };

  if (loading)
    return <div className="course-management-loading">Loading...</div>;
  if (error)
    return <div className="course-management-error">Error: {error}</div>;

  return (
    <div className="d-flex">
      <SidebarAdmin />
      <div className="course-management-container">
        <h2>Quản lý khóa học</h2>
        <div className="course-management-table-container">
          <table className="course-management-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên khóa học</th>
                <th>Thời lượng</th>
                <th>Giảng viên</th>
                <th>Giá gốc</th>
                <th>Giá khuyến mãi</th>
                <th>Danh mục</th>
                <th></th>
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
                    <FaEdit
                      className="course-management-icon-edit"
                      onClick={() => handleEditCourse(course)}
                      title="Sửa"
                    />
                    <FaTrash
                      className="course-management-icon-delete"
                      onClick={() => handleDeleteCourse(course.slug)}
                      title="Xóa"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showEditModal && editCourse && (
          <div className="course-management-edit-modal">
            <div className="course-management-edit-modal-content">
              <h3>Chỉnh sửa khóa học</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="course-management-form-group">
                  <label htmlFor="edit-courseName">Tên khóa học</label>
                  <input
                    type="text"
                    id="edit-courseName"
                    name="courseName"
                    value={editCourse.courseName}
                    onChange={(e) =>
                      setEditCourse({
                        ...editCourse,
                        courseName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="course-management-form-group">
                  <label htmlFor="edit-duration">Thời lượng</label>
                  <input
                    type="text"
                    id="edit-duration"
                    name="duration"
                    value={editCourse.duration}
                    onChange={(e) =>
                      setEditCourse({ ...editCourse, duration: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="course-management-form-group">
                  <label htmlFor="edit-instructor">Giảng viên</label>
                  <input
                    type="text"
                    id="edit-instructor"
                    name="instructor"
                    value={editCourse.instructor}
                    onChange={(e) =>
                      setEditCourse({
                        ...editCourse,
                        instructor: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="course-management-form-group">
                  <label htmlFor="edit-img">Hình ảnh hiện tại</label>
                  <img
                    src={editCourse.img || "https://via.placeholder.com/300"}
                    alt={editCourse.courseName}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                {!imageChanged && (
                  <div className="course-management-form-group">
                    <label htmlFor="edit-img">Thay đổi hình ảnh</label>
                    <input
                      type="file"
                      id="edit-img"
                      name="img"
                      onChange={(e) => {
                        setEditCourse({
                          ...editCourse,
                          img: e.target.files[0],
                        });
                        setImageChanged(true);
                      }}
                    />
                  </div>
                )}
                <div className="course-management-form-group">
                  <label htmlFor="edit-oprice">Giá gốc</label>
                  <input
                    type="text"
                    id="edit-oprice"
                    name="oprice"
                    value={editCourse.oprice}
                    onChange={(e) =>
                      setEditCourse({ ...editCourse, oprice: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="course-management-form-group">
                  <label htmlFor="edit-price">Giá khuyến mãi</label>
                  <input
                    type="text"
                    id="edit-price"
                    name="price"
                    value={editCourse.price}
                    onChange={(e) =>
                      setEditCourse({ ...editCourse, price: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="course-management-form-group">
                  <label htmlFor="edit-categoryid">Danh mục</label>
                  <select
                    id="edit-categoryid"
                    name="categoryid"
                    value={editCourse.categoryid}
                    onChange={(e) =>
                      setEditCourse({
                        ...editCourse,
                        categoryid: e.target.value,
                      })
                    }
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.categoryid} value={cat.categoryid}>
                        {cat.categoryname}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="course-management-btn-save"
                  onClick={handleUpdateCourse}
                >
                  Lưu thay đổi
                </button>
                <button
                  className="course-management-btn-cancel"
                  onClick={() => setShowEditModal(false)}
                >
                  Hủy
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManagement;
