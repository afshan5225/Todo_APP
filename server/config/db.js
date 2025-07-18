import mongoose  from "mongoose";
import dotenv from "dotenv";

dotenv.config()


const connectDB = async()=>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log("mongoDB is connected")
        })
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error.message)
        
    }
}

export default connectDB;