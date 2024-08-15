import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

const app = express();
dotenv.config();

app.use(cors());

const PORT = process.env.PORT || 8000

app.get('/', (req, res)=>{
    res.send("Server is working!");
})

app.listen(PORT, ()=> console.log(`Server started on PORT: ${PORT}`));