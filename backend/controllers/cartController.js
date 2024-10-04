import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    // we are getting userId from auth middleware
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error while saving items to the Cart",
    });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId); // req.body.userId from authMiddleware
    const cartData = userData.cartData;
    const itemId = req.query.itemId; // Get itemId from query params
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error while removing data from Cart",
    });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error while getting cart data" });
  }
};

export { addToCart, removeFromCart, getCart };
