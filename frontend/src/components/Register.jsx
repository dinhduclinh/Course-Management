import React, { useState } from "react";
import axios from "axios";
import "../css/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    dob: "",
    gender: "1",
    roleid: "2",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:9000/auth/register",
        formData
      );
      alert("Đăng ký thành công!");
      window.location.href = "/";
    } catch (err) {
      setError(
        err.response.data.message || "Đăng ký thất bại, vui lòng thử lại!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Đăng Ký</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="fullname"
            placeholder="Họ tên của bạn"
            onChange={handleChange}
            required
          />
          <div className="form-row">
            <input
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            onChange={handleChange}
            required
          />
          <div className="form-row">
            <input type="date" name="dob" onChange={handleChange} required />
            <select name="gender" onChange={handleChange} required>
              <option value="1">Nam</option>
              <option value="2">Nữ</option>
            </select>
          </div>
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? <div className="loading-spinner"></div> : "Đăng Ký"}
          </button>
        </form>
        <p className="return-home-link">
          <a href="/">Quay trở lại trang chủ</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
