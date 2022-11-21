import mongoose from "mongoose";

const DB_URL = process.env.MONGO_URI;
// console.log("🚀 ~ file: mongoose.config.js ~ line 5 ~ DB_URL", DB_URL);

try {
  await mongoose.connect(DB_URL);
} catch (error) {
  handleError(error);
}
