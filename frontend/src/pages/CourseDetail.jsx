import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../css/CourseDetail.css";

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        console.log(`Fetching course details for slug: ${slug}`);
        const response = await axios.get(
          `http://localhost:9000/course/slug/${slug}`
        );
        setCourse(response.data);
        setDescription(response.data.description);
        setDetails(response.data.details);
        setFiles(response.data.files);
      } catch (err) {
        console.error(`Error fetching course details for slug ${slug}:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    setIsAdmin(user && user.roleid === 1);

    fetchCourseDetails();
  }, [slug]);

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:9000/course/${slug}/content`, {
        description,
        details,
      });
      alert("Cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  const handleFileUpload = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    try {
      const response = await axios.post(
        `http://localhost:9000/course/${slug}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFiles([...files, response.data]);
      alert("Tải lên thành công!");
    } catch (error) {
      console.error("Lỗi khi tải lên:", error);
    }
  };

  const handleFileDownload = async (fileId) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/course/${slug}/download/${fileId}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Lỗi khi tải xuống:", error);
    }
  };

  if (loading)
    return (
      <div style={{ fontSize: "30px", textAlign: "center" }}>Chờ xíu...</div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="course-detail-container">
        <h2>{course.courseName}</h2>
        <div className="course-details">
          <p>
            <strong>Thời lượng:</strong> {course.duration}
          </p>
          <p>
            <strong>Giảng viên:</strong> {course.instructor}
          </p>
          <p>
            <strong>Giá gốc:</strong> <del>{course.oprice}đ</del>
          </p>
          <p>
            <strong>Giá khuyến mãi:</strong>{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>
              {course.price}đ
            </span>
          </p>
        </div>
        <div className="course-description">
          <h3>Mô tả</h3>
          {isAdmin ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <p>{description}</p>
          )}
        </div>
        <div className="course-details">
          <h3>Chi tiết</h3>
          {isAdmin ? (
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          ) : (
            <p>{details}</p>
          )}
        </div>
        {isAdmin && (
          <div className="edit-buttons">
            <button onClick={handleEdit}>Lưu thay đổi</button>
          </div>
        )}
        <div className="course-files">
          <h3>Tệp tin</h3>
          {isAdmin && <input type="file" onChange={handleFileUpload} />}
          <ul>
            {files.map((file) => (
              <li key={file._id}>
                {file.filename}
                <button onClick={() => handleFileDownload(file._id)}>
                  Tải xuống
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
