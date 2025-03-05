// frontend/src/components/EditAnnouncementPopup.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/EditAnnouncementPopup.css";

const EditAnnouncementPopup = ({ onClose, onUpdate }) => {
  const [announcement, setAnnouncement] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await axios.get("http://localhost:9000/announcements");
        setAnnouncement(response.data.message);
      } catch (error) {
        setError("Error fetching announcement");
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncement();
  }, []);

  const handleInputChange = (e) => {
    setAnnouncement(e.target.value);
  };

  const handleUpdateAnnouncement = async () => {
    try {
      const response = await axios.post("http://localhost:9000/announcements", {
        message: announcement,
      });
      onUpdate(response.data.message); // Pass the updated message to the parent component
      setSuccessMessage("Announcement updated successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2 seconds delay
    } catch (error) {
      setError("Error updating announcement");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Cập nhật thông báo</h2>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <textarea
          value={announcement}
          onChange={handleInputChange}
          rows="4"
          cols="50"
        />
        <div className="popup-buttons">
          <button onClick={handleUpdateAnnouncement}>Update</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditAnnouncementPopup;
