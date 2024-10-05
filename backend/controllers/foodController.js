import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Error while saving food item." });
  }
};

// food list

const foodList = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "error" });
  }
};

// remove food

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.query.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.query.id);
    res.json({success: true, message: "food removed successfully!"});
  } catch (e) {
    console.log(e);
    res.json({success: false, message: "Error while deleting food."});
  }
};

// Update food

const updateFood = async (req, res) => {
  try {
    const { name, description, price, category, foodId } = req.body;
    const updateFields = { name, description, price, category };

    if (req.file) {
      updateFields.image = req.file.filename; // Only update image if a new one is uploaded
    }

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      updateFields,
      { new: true }
    );

    if (updatedFood) {
      res.json({
        success: true,
        message: "Food updated successfully!",
        data: updatedFood,
      });
    } else {
      res.json({ success: false, message: "Food not found" });
    }
    
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error while updating Food" });
  }
}

export { addFood, foodList, removeFood, updateFood };
