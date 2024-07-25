import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONN_KEY);
    console.log("Database Connected.")
  } catch (error) {
    console.error(error);
    throw error;
  }
}