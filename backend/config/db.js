import mongoose from "mongoose";

export const connectToDataBase = async (mongodb_url) => {
  try {
    await mongoose.connect(mongodb_url);
    console.log("connected to the database");
  } catch (error) { 
    console.log(error); 
  } 
};