import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined. Please add it to your environment variables.");
    return;
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // Returning error here instead of throw to avoid crashing Vercel function cold starts if DB is down.
    // The individual routes will fail if the connection doesn't succeed due to mongoose buffering timeout.
  }
};

export default connectDB;