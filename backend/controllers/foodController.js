import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";

// Add food item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
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
    console.error("Add food error:", error);

    res.json({
      success: false,
      message: "Error adding food",
    });
  }
};

// All food list
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
    console.error("List food error:", error);

    res.json({
      success: false,
      message: "Error",
    });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({
        success: false,
        message: "Food not found",
      });
    }

    await foodModel.findByIdAndDelete(req.body.id);

    // Delete image from Cloudinary if a Cloudinary public ID is stored.
    // We are currently storing the secure URL, so MongoDB deletion is handled here.
    
    res.json({
      success: true,
      message: "Food Removed",
    });
  } catch (error) {
    console.error("Remove food error:", error);

    res.json({
      success: false,
      message: "Error",
    });
  }
};

export { addFood, listFood, removeFood };