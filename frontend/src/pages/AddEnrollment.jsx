import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import "../css/AddEnrollment.css";

const AddEnrollment = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newEnrollment, setNewEnrollment] = useState({
    userId: "",
    courseId: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:9000/auth/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách người dùng:", err);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:9000/course");
        setCourses(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách khóa học:", err);
      }
    };

    fetchUsers();
    fetchCourses();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = users.filter((user) =>
      user.fullname.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setNewEnrollment({ ...newEnrollment, userId: user._id });
    setSearchTerm(user.fullname);
    setFilteredUsers([]);
  };

  const handleAddEnrollment = async () => {
    try {
      await axios.post("http://localhost:9000/enrollments", newEnrollment);
      alert("Đăng ký khóa học thành công!");
      setNewEnrollment({ userId: "", courseId: "" });
      setSearchTerm("");
      setSelectedUser(null);
    } catch (error) {
      console.error("Lỗi khi đăng ký khóa học:", error);
    }
  };

  return (
    <div className="d-flex">
      <SidebarAdmin />
      <div className="add-enrollment-container">
        <h2>Thêm đăng ký khóa học</h2>
        <div className="add-enrollment-form-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="add-enrollment-form-group">
              <label htmlFor="userId">Người dùng</label>
              <input
                type="text"
                id="userId"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Tìm kiếm người dùng"
              />
              {filteredUsers.length > 0 && (
                <ul className="autocomplete-list">
                  {filteredUsers.map((user) => (
                    <li key={user._id} onClick={() => handleSelectUser(user)}>
                      {user.fullname}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="add-enrollment-form-group">
              <label htmlFor="courseId">Khóa học</label>
              <select
                id="courseId"
                value={newEnrollment.courseId}
                onChange={(e) =>
                  setNewEnrollment({
                    ...newEnrollment,
                    courseId: e.target.value,
                  })
                }
              >
                <option value="">Chọn khóa học</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="add-enrollment-btn-save"
              onClick={handleAddEnrollment}
            >
              Thêm đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEnrollment;
