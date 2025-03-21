// frontend/src/pages/EnrollmentManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // Import the delete icon
import SidebarAdmin from "../components/SidebarAdmin";
import "../css/EnrollmentManagement.css";

const EnrollmentManagement = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get("http://localhost:9000/enrollments");
        setEnrollments(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  const handleDeleteEnrollment = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đăng ký này?")) {
      try {
        await axios.delete(`http://localhost:9000/enrollments/${id}`);
        alert("Xóa đăng ký thành công!");
        const updatedEnrollments = enrollments.filter(
          (enrollment) => enrollment._id !== id
        );
        setEnrollments(updatedEnrollments);
      } catch (error) {
        console.error("Lỗi khi xóa đăng ký:", error);
        alert(error.response.data.message);
      }
    }
  };

  if (loading) return <div className="loading">Chờ xíu...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="d-flex">
      <SidebarAdmin />
      <div className="enrollment-management-container">
        <h2>Danh sách đăng ký khóa học</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên người dùng</th>
                <th>Tên khóa học</th>
                <th>Ngày đăng ký</th>
                <th>Trạng thái thanh toán</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment, index) => (
                <tr key={enrollment._id}>
                  <td>{index + 1}</td>
                  <td>{enrollment.userId?.fullname || "N/A"}</td>
                  <td>{enrollment.courseId?.courseName || "N/A"}</td>
                  <td>
                    {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </td>
                  <td>
                    {enrollment.paid ? "Đã thanh toán" : "Chưa thanh toán"}
                  </td>
                  <td>
                    <FaTrash
                      className="icon-delete"
                      onClick={() => handleDeleteEnrollment(enrollment._id)}
                      title="Xóa"
                    />
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

export default EnrollmentManagement;
