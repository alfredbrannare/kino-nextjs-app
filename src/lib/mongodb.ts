import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let isConnected = false;

// Ansluta till databasen
const connectDB = async () => {
  if (isConnected) return;

  console.log(
    `🗄️ MONGO_URI: ${process.env.MONGO_URI ? ' Active ' : ' Inactive '}`,
  );
  console.log(`🎞️ OMDB: ${process.env.OMDB ? ' Active ' : ' Inactive '}`);
  console.log(`🤐 SECRET: ${process.env.SECRET ? ' Active ' : ' Inactive '}`);

  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.error('❌ MONGO_URI environment variable is not set.');
      throw new Error('MONGO_URI environment variable is not set.');
    }
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB successfully');
    isConnected = true;
  } catch (error) {
    console.error(
      '❌ Not connected to MongoDB:',
      error instanceof Error ? error.message : error,
    );
  }
};

export default connectDB;
