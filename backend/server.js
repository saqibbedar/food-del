import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { connectToDataBase } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

// app config
const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(cors());

// Database connection
connectToDataBase(`${process.env.MONGODB_URL}/food-del`);

// api endpoints
app.use("/api/food", foodRouter);
app.use('/images', express.static('uploads'))
app.use("/api/user", userRouter);

app.get('/', (req, res)=>{
    res.send("Server is working!");
})

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));