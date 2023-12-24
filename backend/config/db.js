import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

const connectDB = asyncHandler(async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB Connected on ${ conn.connection.host}`);
    } catch (error) {
        console.log("error ", error);
        process.exit(1)
    }
})

export default connectDB 