import express from 'express';
import { addFood, foodList, removeFood, updateFood } from '../controllers/foodController.js';
import upload from '../config/imageStorage.js'

const foodRouter = express.Router();

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", foodList);
foodRouter.delete("/remove", removeFood);
foodRouter.put("/update", upload.single("image") , updateFood);

export default foodRouter;