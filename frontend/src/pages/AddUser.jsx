import React, { useState } from "react";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import "../css/AddUser.css";

const AddUser = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    address: "",
    dob: "",
    gender: "",
    roleid: 0,
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:9000/auth/register", newUser);
      alert("Thêm người dùng thành công!");
      setNewUser({
        username: "",
        password: "",
        fullname: "",
        email: "",
        address: "",
        dob: "",
        gender: "",
        roleid: 0,
      });
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
    }
  };

  return (
    <div className="d-flex">
      <SidebarAdmin />
      <div className="add-user-container">
        <h2>Thêm người dùng</h2>
        <div className="add-user-form-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="add-user-form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                type="text"
                id="username"
                name="username"
                value={newUser.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-form-group">
              <label htmlFor="fullname">Họ tên</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={newUser.fullname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-form-group">
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                id="address"
                name="address"
                value={newUser.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-form-group">
              <label htmlFor="dob">Ngày sinh</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={newUser.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-form-group">
              <label htmlFor="gender">Giới tính</label>
              <select
                id="gender"
                name="gender"
                value={newUser.gender}
                onChange={handleChange}
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
              </select>
            </div>
            <div className="add-user-form-group">
              <label htmlFor="roleid">Vai trò</label>
              <select
                id="roleid"
                name="roleid"
                value={newUser.roleid}
                onChange={handleChange}
                required
              >
                <option value="">Chọn vai trò</option>
                <option value="1">Admin</option>
                <option value="0">User</option>
              </select>
            </div>
            <button className="add-user-btn-save" onClick={handleAddUser}>
              Thêm người dùng
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
