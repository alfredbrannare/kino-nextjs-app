import express from 'express';
//Behövs för att använda .env
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Måste deklareras högst upp i filen (process.env)

dotenv.config();

// Express init
const app = express();

// Middleware to parse JSON and log HTTP method and URL
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Behövs för att lägga ut server på Render sen
const port = process.env.PORT || 5080;

// Ansluta till databasen
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB successfully');
} catch {
  console.log('❌ Not connected to MongoDB');
  console.log(`❌ MONGO_URI: ${process.env.MONGO_URI ? ' Active ' : ' Inactive '}`);
}



// Starta server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});

// https://emojipedia.org/