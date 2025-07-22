import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log("MongoDB connection Successful");
  } catch (error) {
    console.log("Error Connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
