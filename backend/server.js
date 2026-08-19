// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import connectDB from "./config/db.js";

// import foodRouter from "./routes/foodRoute.js";
// import userRouter from "./routes/userRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use("/api/food", foodRouter);
// app.use("/images", express.static("uploads"));
// app.use("/api/user", userRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);

// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// //connectDB();

// export default app;

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import foodRouter from "./routes/foodRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api/food", foodRouter);

export default app;