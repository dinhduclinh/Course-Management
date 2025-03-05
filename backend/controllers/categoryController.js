// backend/controllers/categoryController.js
import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, "categoryid categoryname");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
