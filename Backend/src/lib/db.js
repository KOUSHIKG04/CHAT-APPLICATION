import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected !!");
  } catch (error) {
    console.error(`"Error connecting to MongoDB": ${error.message}`);
    process.exit(1);
  }
};
