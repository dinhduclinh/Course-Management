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
import AddCourse from "./pages/AddCourse";
import CourseDetail from "./pages/CourseDetail";
import EnrollmentManagement from "./pages/EnrollmentManagement";
import EnrolledCourses from "./pages/EnrolledCourses";
import Profile from "./pages/Profile";
import UserManagement from "./pages/UserManagement";
import AddUser from "./pages/AddUser";
import AddEnrollment from "./pages/AddEnrollment";

const App = () => {
  const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.roleid === 1;
  };

  const ProtectedRoute = ({ element }) => {
    return isAdmin() ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPopup onClose={() => {}} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route
          path="/course-management"
          element={<ProtectedRoute element={<CourseManagement />} />}
        />
        <Route
          path="/add-course"
          element={<ProtectedRoute element={<AddCourse />} />}
        />
        <Route
          path="/enrollment-management"
          element={<ProtectedRoute element={<EnrollmentManagement />} />}
        />
        <Route path="/course/:slug" element={<CourseDetail />} />
        <Route path="/enrolled-courses" element={<EnrolledCourses />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/user-management"
          element={<ProtectedRoute element={<UserManagement />} />}
        />
        <Route
          path="/add-user"
          element={<ProtectedRoute element={<AddUser />} />}
        />
        <Route
          path="/add-enrollment"
          element={<ProtectedRoute element={<AddEnrollment />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
