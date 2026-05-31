import mongoose from "mongoose"

export default async function connectMongo() {
  await mongoose.connect(process.env.MONGODB_URI)

  console.log("MongoDB connected")
}
