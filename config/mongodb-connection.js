import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB.", error);
    process.exit(1);
  }
};

export default connectToMongoDB;
