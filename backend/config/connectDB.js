// backend/config/connectDB.js

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; 
    console.log("Kết nối đến MongoDB với URI:", uri); 
    await mongoose.connect(uri); 
    console.log("Kết nối đến cơ sở dữ liệu thành công");
  } catch (error) {
    console.error("Lỗi kết nối đến cơ sở dữ liệu:", error.message);
    process.exit(1);
  }
};

export default connectDB;
