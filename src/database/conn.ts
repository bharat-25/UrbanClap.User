import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/UrbanClap");
    mongoose.set({ debug: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};
export { dbConnect };
