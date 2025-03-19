// frontend/src/pages/UserDepositXu.jsx
import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../css/UserDepositXu.css";

const UserDepositXu = () => {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDeposit = async () => {
    try {
      const response = await axios.post("http://localhost:9000/wallet/update", {
        userId: user._id,
        amount,
        type: "credit",
      });
      setMessage("Nạp xu thành công!");
    } catch (error) {
      setMessage("Lỗi khi nạp xu: " + error.response.data.message);
    }
  };

  return (
    <div className="user-deposit-xu-page">
      <Navbar fullWidth={true} />
      <div className="user-deposit-xu-container">
        <h2>Nạp Xu</h2>
        <div className="user-deposit-xu-form">
          <div className="form-group">
            <label htmlFor="amount">Số Xu</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
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

export default UserDepositXu;
