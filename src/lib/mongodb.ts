import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let isConnected = false;

// Ansluta till databasen
const connectDB = async () => {
  if (isConnected) return;

  console.log(`🗄️ MONGO_URI: ${process.env.MONGO_URI ? " Active " : " Inactive "}`);
  console.log(`🎞️ OMDB: ${process.env.OMDB ? " Active " : " Inactive "}`);
  console.log(`🤐 SECRET: ${process.env.SECRET ? " Active " : " Inactive "}`);

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB successfully");
    isConnected = true;
  } catch {
    console.log("❌ Not connected to MongoDB");
  }
};

export default connectDB;
