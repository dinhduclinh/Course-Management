import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../css/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    address: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/auth/user/${storedUser._id}`
        );
        setFormData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:9000/auth/user/${user._id}`, formData);
      alert("Cập nhật thông tin thành công!");
      setEditMode(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
    }
  };

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (error) return <div className="profile-error">Error: {error}</div>;

  return (
    <div className="profile-page">
      <Navbar user={user} fullWidth={true} />
      <div className="profile-container">
        <h2>Thông tin cá nhân</h2>
        <div className="profile-content">
          <div className="profile-info">
            <p>
              <strong>Tên đăng nhập:</strong> {user.username}
            </p>
            <p>
              <strong>Họ tên:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              ) : (
                formData.fullname
              )}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                formData.email
              )}
            </p>
            <p>
              <strong>Địa chỉ:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              ) : (
                formData.address
              )}
            </p>
            <p>
              <strong>Ngày sinh:</strong>{" "}
              {editMode ? (
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              ) : (
                new Date(formData.dob).toLocaleDateString()
              )}
            </p>
            <p>
              <strong>Giới tính:</strong>{" "}
              {editMode ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="1">Nam</option>
                  <option value="0">Nữ</option>
                </select>
              ) : formData.gender === 1 ? (
                "Nam"
              ) : (
                "Nữ"
              )}
            </p>
          </div>
          <div className="profile-actions">
            {editMode ? (
              <button className="profile-btn-save" onClick={handleUpdate}>
                Lưu thay đổi
              </button>
            ) : (
              <button
                className="profile-btn-edit"
                onClick={() => setEditMode(true)}
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
