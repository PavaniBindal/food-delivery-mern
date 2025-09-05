import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/food-delivery");
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};