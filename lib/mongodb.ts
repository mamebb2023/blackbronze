import mongoose from 'mongoose';
import process from 'process';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) {
    return console.log('MongoDB URL is not provided!');
  }

  if (isConnected) {
    return console.log('Using existing database connection...');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'blackbronze'
    })
    
    isConnected = true;
    console.log("MongoDB Connected.")
  } catch (error) {
    console.log(error)
  }
}