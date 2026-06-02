import mongoose from "mongoose"

export default async function connectMongo() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_NAME })

  console.log("MongoDB connected")
}
