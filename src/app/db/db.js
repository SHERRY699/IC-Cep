import mongoose from "mongoose";

export default async function ConnectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB_URL);
    if (connection) {
      console.log("Database Connected");
    }
  } catch (error) {
    console.log("Error Connecting Database", error);
  }
}
