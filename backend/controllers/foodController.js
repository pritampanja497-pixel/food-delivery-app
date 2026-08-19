import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";

// Add food item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "food-delivery",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url,
    });

    await food.save();

    res.json({
      success: true,
      message: "Food Added",
    });
  } catch (error) {
    console.error("ADD FOOD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all food items
const listFood = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    const foods = await foodModel.find(filter);

    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.error("LIST FOOD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Food ID is required",
      });
    }

    const food = await foodModel.findById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    await foodModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Food Removed",
    });
  } catch (error) {
    console.error("REMOVE FOOD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addFood, listFood, removeFood };