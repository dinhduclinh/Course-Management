import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/LoginPopup.css";

const LoginPopup = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/auth/login", {
        username,
        password,
      });
      alert("Đăng nhập thành công!");
      onLoginSuccess(response.data.user);
      onClose();
    } catch (err) {
      setError("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>
          ✖
        </span>
        <h2>Đăng nhập</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Đăng nhập</button>
        </form>
        <div className="auth-links">
          <a href="#">Quên mật khẩu?</a>
          <span> | </span>
          <a href="/register" onClick={() => navigate("/register")}>
            Đăng ký tài khoản
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
