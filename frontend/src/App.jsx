// frontend/src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPopup from "./components/LoginPopup";
import Register from "./components/Register";
import ChangePassword from "./pages/ChangePassword";
import CourseManagement from "./pages/CourseManagement";

const App = () => {
  const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.roleid === 1;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPopup onClose={() => {}} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route
          path="/add-course"
          element={isAdmin() ? <CourseManagement /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
