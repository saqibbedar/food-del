import express from 'express';
import { addFood, foodList, removeFood } from '../controllers/foodController.js';
import upload from '../config/imageStorage.js'

const foodRouter = express.Router();

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", foodList);
foodRouter.delete("/remove", removeFood);

export default foodRouter;