import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
const DB_URL = process.env.MONGO_URI;

try {
  await mongoose.connect(DB_URL);
  console.log('Connected to the DB 🔥🔥🔥');
} catch (error) {
  handleError(error);
}
