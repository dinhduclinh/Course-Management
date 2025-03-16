import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import connectDB from "./config/connectDB.js";
import courseRoutes from "./routes/courseRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";

dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the "img" directory
app.use('/img', express.static(path.join(__dirname, '../frontend/src/img')));

app.use("/course", courseRoutes);
app.use("/announcements", announcementRoutes);
app.use("/category", categoryRoutes);
app.use("/auth", authRoutes);
app.use("/enrollments", enrollmentRoutes);

// Khởi động server
const HOST = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng http://${HOST}:${PORT}/`);
});
