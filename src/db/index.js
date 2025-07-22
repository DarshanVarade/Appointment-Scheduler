import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log("MongoDB connection Successful");
  } catch (error) {
    console.log("Error Connecting to MongoDB", error);
    process.exit(1);
  }
};

mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error after initial connection:", err);
});

export default connectDB;
