import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    await mongoose.connect(`${process.env.MONGODB_URL}/food-del`)
    .then(()=>console.log("Connected to the database.")); 
}