import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.post("/add", addFood);

export default foodRouter;