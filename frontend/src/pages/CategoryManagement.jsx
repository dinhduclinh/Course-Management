import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import SidebarAdmin from "../components/SidebarAdmin";
import "../css/CategoryManagement.css";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:9000/category");
        setCategories(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setShowEditModal(true);
  };

  const handleUpdateCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:9000/category/${editCategory._id}`,
        editCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Cập nhật danh mục thành công!");
      const response = await axios.get("http://localhost:9000/category");
      setCategories(response.data);
      setEditCategory(null);
      setShowEditModal(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:9000/category/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Xóa danh mục thành công!");
        const updatedCategories = categories.filter(
          (category) => category._id !== id
        );
        setCategories(updatedCategories);
      } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error);
      }
    }
  };

  if (loading)
    return <div className="category-management-loading">Loading...</div>;
  if (error)
    return <div className="category-management-error">Error: {error}</div>;

  return (
    <div className="d-flex">
      <SidebarAdmin />
      <div className="category-management-container">
        <h2>Quản lý danh mục</h2>
        <div className="category-management-table-container">
          <table className="category-management-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>ID danh mục</th>
                <th>Tên danh mục</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>{category.categoryid}</td>
                  <td>{category.categoryname}</td>
                  <td>
                    <FaEdit
                      className="category-management-icon-edit"
                      onClick={() => handleEditCategory(category)}
                      title="Sửa"
                    />
                    <FaTrash
                      className="category-management-icon-delete"
                      onClick={() => handleDeleteCategory(category._id)}
                      title="Xóa"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showEditModal && editCategory && (
          <div className="category-management-edit-modal">
            <div className="category-management-edit-modal-content">
              <h3>Chỉnh sửa danh mục</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="category-management-form-group">
                  <label htmlFor="edit-categoryid">ID danh mục</label>
                  <input
                    type="text"
                    id="edit-categoryid"
                    name="categoryid"
                    value={editCategory.categoryid}
                    onChange={(e) =>
                      setEditCategory({
                        ...editCategory,
                        categoryid: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="category-management-form-group">
                  <label htmlFor="edit-categoryname">Tên danh mục</label>
                  <input
                    type="text"
                    id="edit-categoryname"
                    name="categoryname"
                    value={editCategory.categoryname}
                    onChange={(e) =>
                      setEditCategory({
                        ...editCategory,
                        categoryname: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <button
                  className="category-management-btn-save"
                  onClick={handleUpdateCategory}
                >
                  Lưu thay đổi
                </button>
                <button
                  className="category-management-btn-cancel"
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

export default CategoryManagement;
