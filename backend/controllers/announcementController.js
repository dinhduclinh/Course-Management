import Announcement from "../models/Announcement.js";

// Lấy thông báo duy nhất từ MongoDB
export const getAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findOne();
    if (!announcement) {
      return res.json({ message: "Chưa có thông báo nào." });
    }
    res.json(announcement);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy thông báo", error: error.message });
  }
};

// Cập nhật hoặc tạo mới thông báo
export const updateAnnouncement = async (req, res) => {
  try {
    const { message } = req.body;

    let announcement = await Announcement.findOne(); // Kiểm tra nếu đã có thông báo

    if (announcement) {
      // Nếu có, cập nhật nội dung thông báo
      announcement.message = message;
    } else {
      // Nếu chưa có, tạo một thông báo mới
      announcement = new Announcement({ message });
    }

    await announcement.save();
    res
      .status(200)
      .json({ success: true, message: "Thông báo đã được cập nhật!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật thông báo", error: error.message });
  }
};