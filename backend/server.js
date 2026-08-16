// import 'dotenv/config'
// import express from "express";
// import cors from "cors";
// import connectDB from "./config/db.js"
// import foodRouter from "./routes/foodRoute.js";
// import userRouter from "./routes/userRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";




// const app = express()
// const port = 4000


// app.use(express.json())
// app.use(cors())

// connectDB()

// app.use("/api/food", foodRouter)
// app.use("/images", express.static('uploads'))
// app.use("/api/user", userRouter)
// app.use("/api/cart", cartRouter)
// app.use("/api/order", orderRouter)


// app.get("/",(req,res)=>{
//     res.send("API Working")
// })

// app.listen(port,()=>{
//   console.log(`Server Started on http://localhost:${port}`);
  
// })


import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  try {
    res.json({ message: "Food Delivery API Working" });
  }catch (err) {
    console.log(err,"Error")
    res.json({ message: `${err}` });
  }
});

connectDB();

export default app;
