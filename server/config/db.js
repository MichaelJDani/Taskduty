import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ Missing MONGO_URI in environment variables");
    process.exit(1);
  }

  const mongooseOptions = {
    // default dbName can be provided in URI or via MONGODB_DB_NAME
    dbName: process.env.MONGODB_DB_NAME || undefined,
  };

  try {
    await mongoose.connect(process.env.MONGO_URI, mongooseOptions);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;