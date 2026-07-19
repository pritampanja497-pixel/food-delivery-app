import mongoose from "mongoose";
import foodModel from "./models/foodModel.js";
import connectDB from "./config/db.js";

const sampleFoods = [
  {
    name: "Ripple Ice Cream",
    image: "1775649694466food_9.png",
    price: 14,
    description: "Creamy ripple ice cream with chocolate swirls and vanilla base.",
    category: "Deserts"
  },
  {
    name: "Classic Salad",
    image: "1775649700172food_9.png", // Using existing files as placeholders
    price: 12,
    description: "A fresh mix of seasonal greens and vinaigrette.",
    category: "Salad"
  },
  {
    name: "Spicy Pasta",
    image: "1775649708747food_9.png",
    price: 18,
    description: "Penne pasta in a spicy arrabbiata sauce with herbs.",
    category: "Pasta"
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    
    // Clear existing foods (Optional: comment this out if you don't want to clear)
    // await foodModel.deleteMany({});
    // console.log("Cleared existing foods");

    await foodModel.insertMany(sampleFoods);
    console.log("Database Seeded Successfully!");
    
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
