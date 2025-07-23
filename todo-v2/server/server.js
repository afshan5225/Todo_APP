import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRouter from "./routes/authRouter.js"
import todoRouter from './routes/todoRoutes.js';
import cookieParser from 'cookie-parser';



dotenv.config()
const app = express();
const PORT = process.env.PORT ||5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
await connectDB()



app.get('/',(req,res)=>{res.send("Api is working")});


app.use('/api/auth',authRouter)
app.use('/api/todo',todoRouter)


app.listen(PORT,()=>{
    console.log(`The app is running at ${PORT}`)
})


