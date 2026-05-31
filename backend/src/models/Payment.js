import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    provider: {
      type: String,
      default: "sumit"
    },

    amount: Number,

    currency: {
      type: String,
      default: "ILS"
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },

    externalId: String
  },
  { timestamps: true }
)

export default mongoose.model("Payment", paymentSchema)
