import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://pritampanja497_db_user:Pritam%402003@cluster0.atli1uj.mongodb.net/food-del"
    )
    .then(() => console.log("DB connected"))
    .catch((err) => {
      console.log(err,"DB Connection error")
    })
};

export default connectDB;
