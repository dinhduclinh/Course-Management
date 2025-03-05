import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Announcement.css";

const Announcement = () => {
  const [announcement, setAnnouncement] = useState("Đang tải thông báo...");

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await axios.get("http://localhost:9000/announcements");
        setAnnouncement(response.data.message);
      } catch (error) {
        console.error("Lỗi khi lấy thông báo:", error);
        setAnnouncement("Không thể tải thông báo.");
      }
    };

    fetchAnnouncement();
  }, []);

  return (
    <div className="welcome-message">
      <span>🔥 {announcement} 🚀</span>
    </div>
  );
};

export default Announcement;
