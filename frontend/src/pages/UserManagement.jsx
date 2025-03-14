import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import SidebarAdmin from "../components/SidebarAdmin";
import "../css/UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:9000/auth/users");
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setEditUser({
      ...user,
      dob: new Date(user.dob).toISOString().split("T")[0],
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(
        `http://localhost:9000/auth/user/${editUser._id}`,
        editUser
      );
      alert("Cập nhật người dùng thành công!");
      const response = await axios.get("http://localhost:9000/auth/users");
      setUsers(response.data);
      setEditUser(null);
      setShowEditModal(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await axios.delete(`http://localhost:9000/auth/user/${id}`);
        alert("Xóa người dùng thành công!");
        const updatedUsers = users.filter((user) => user._id !== id);
        setUsers(updatedUsers);
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
      }
    }
  };

  if (loading) return <div className="user-management-loading">Loading...</div>;
  if (error) return <div className="user-management-error">Error: {error}</div>;

  return (
    <div className="d-flex">
      <SidebarAdmin />
      <div className="user-management-container">
        <h2>Quản lý người dùng</h2>
        <div className="user-management-table-container">
          <table className="user-management-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên đăng nhập</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{new Date(user.dob).toLocaleDateString()}</td>
                  <td>{user.gender === 1 ? "Nam" : "Nữ"}</td>
                  <td>{user.roleid === 1 ? "Admin" : "User"}</td>
                  <td>
                    <FaEdit
                      className="icon-edit"
                      onClick={() => handleEditUser(user)}
                      title="Sửa"
                    />
                    <FaTrash
                      className="icon-delete"
                      onClick={() => handleDeleteUser(user._id)}
                      title="Xóa"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showEditModal && editUser && (
          <div className="user-management-edit-modal">
            <div className="user-management-edit-modal-content">
              <h3>Chỉnh sửa người dùng</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="user-management-form-group">
                  <label htmlFor="edit-fullname">Họ tên</label>
                  <input
                    type="text"
                    id="edit-fullname"
                    name="fullname"
                    value={editUser.fullname}
                    onChange={(e) =>
                      setEditUser({ ...editUser, fullname: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="user-management-form-group">
                  <label htmlFor="edit-email">Email</label>
                  <input
                    type="email"
                    id="edit-email"
                    name="email"
                    value={editUser.email}
                    onChange={(e) =>
                      setEditUser({ ...editUser, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="user-management-form-group">
                  <label htmlFor="edit-address">Địa chỉ</label>
                  <input
                    type="text"
                    id="edit-address"
                    name="address"
                    value={editUser.address}
                    onChange={(e) =>
                      setEditUser({ ...editUser, address: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="user-management-form-group">
                  <label htmlFor="edit-dob">Ngày sinh</label>
                  <input
                    type="date"
                    id="edit-dob"
                    name="dob"
                    value={editUser.dob}
                    onChange={(e) =>
                      setEditUser({ ...editUser, dob: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="user-management-form-group">
                  <label htmlFor="edit-gender">Giới tính</label>
                  <select
                    id="edit-gender"
                    name="gender"
                    value={editUser.gender}
                    onChange={(e) =>
                      setEditUser({ ...editUser, gender: e.target.value })
                    }
                    required
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                  </select>
                </div>
                <div className="user-management-form-group">
                  <label htmlFor="edit-roleid">Vai trò</label>
                  <select
                    id="edit-roleid"
                    name="roleid"
                    value={editUser.roleid}
                    onChange={(e) =>
                      setEditUser({ ...editUser, roleid: e.target.value })
                    }
                    required
                  >
                    <option value="">Chọn vai trò</option>
                    <option value="1">Admin</option>
                    <option value="0">User</option>
                  </select>
                </div>
                <button
                  className="user-management-btn-save"
                  onClick={handleUpdateUser}
                >
                  Lưu thay đổi
                </button>
                <button
                  className="user-management-btn-cancel"
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

export default UserManagement;
