// frontend/src/pages/AdminDepositXu.jsx
import React, { useState } from "react";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import "../css/AdminDepositXu.css";

const AdminDepositXu = () => {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("credit");
  const [message, setMessage] = useState("");

  const handleDeposit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/wallet/admin/update",
        {
          userId,
          amount,
          type,
        }
      );
      setMessage("Nạp xu thành công!");
    } catch (error) {
      setMessage("Lỗi khi nạp xu: " + error.response.data.message);
    }
  };

  return (
    <div className="d-flex">
      <SidebarAdmin />
      <div className="admin-deposit-xu-container">
        <h2>Nạp Xu cho Người Dùng</h2>
        <div className="admin-deposit-xu-form">
          <div className="form-group">
            <label htmlFor="userId">ID Người Dùng</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Số Xu</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Loại Giao Dịch</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="credit">Nạp Xu</option>
              <option value="debit">Trừ Xu</option>
            </select>
          </div>
          <button className="btn-deposit" onClick={handleDeposit}>
            Nạp Xu
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminDepositXu;
