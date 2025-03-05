// backend/models/Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryid: String,
  categoryname: String,
});

const Category = mongoose.model("Category", categorySchema,"categories");

export default Category;
