import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
const connectDB = async()=>{
    try{
        console.log("Connecting to Mongodb");
        const conn=await mongoose.connect(process .MONGO_URI);
        console.log('MongoDB Connected Succesfullly at:$(conn.connection.host)'

        )
    }
    catch(e){
        console.error("Error Occured")
        process.exit(1);
    }
}