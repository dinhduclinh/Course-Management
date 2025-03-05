import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/ChangePassword.css"; 

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu mới không khớp.");
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 16) {
      setError("Mật khẩu phải có độ dài từ 8 đến 16 ký tự.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(
        "http://localhost:9000/auth/change-password",
        {
          username: user.username,
          oldPassword,
          newPassword,
        }
      );
      setSuccess(response.data.message);
      setTimeout(() => {
        localStorage.removeItem("user");
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(
        err.response.data.message || "Đổi mật khẩu thất bại, vui lòng thử lại!"
      );
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-box">
        <h2>Đổi Mật Khẩu</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            placeholder="Nhập mật khẩu cũ"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          <button type="submit" className="change-password-button">
            Đổi Mật Khẩu
          </button>
        </form>
        <p className="return-home-link">
          <a href="/">Quay trở lại trang chủ</a>
        </p>
      </div>
    </div>
  );
};

export default ChangePassword;
