import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


let isConnected = false;

// Ansluta till databasen
const connectDB = async () => {
  if (isConnected) return;

  console.log(`MONGO_URI: ${process.env.MONGO_URI ? "[✅] Done" : "[❌] Failed "}`);
  console.log(`TMDB: ${process.env.TMDB ? "[✅] Done" : "[❌] Failed"}`);
  console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? "[✅] Done" : "[❌] Failed "}`);
  console.log(`GOOGLE_API_KEY: ${process.env.GOOGLE_API_KEY ? "[✅] Done " : " [❌] Failed "}`);
  console.log(`CLOUDINARY_API_KEY: ${process.env.CLOUDINARY_API_KEY ? "[✅] Done " : "[❌] Failed "}`);
  console.log(`CLOUDINARY_API_SECRET: ${process.env.CLOUDINARY_API_SECRET ? "[✅] Done " : "[❌] Failed "}`);
  console.log(`CLOUDINARY_CLOUD_NAME: ${process.env.CLOUDINARY_CLOUD_NAME ? "[✅] Done " : "[❌] Failed "}`);

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection to MongoDB [✅] Done");
    isConnected = true;
  } catch {
    console.log("onnection to MongoDB [❌] Failed");
  }
};

export default connectDB;
