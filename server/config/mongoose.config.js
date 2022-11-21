import mongoose from "mongoose";

const DB_URL = process.env.MONGO_URI;

try {
  await mongoose.connect(DB_URL);
  console.log("Connected to the DB 🔥🔥🔥");
} catch (error) {
  handleError(error);
}
