import mongoose from "mongoose"
import { ROLES } from "../constants/roles.js"

const userSchema = new mongoose.Schema(
  {
    stytchUserId: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    firstName: {
      type: String
    },

    lastName: {
      type: String
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER
    },
    
    subscriptionType: {
      type: String,
      enum: ["full_access", "pay_per_video"],
      default: "pay_per_video"
    },

    videoAccess: [
      {
        videoId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video"
        },
        openedAt: Date,
        expiresAt: Date
      }
    ]
  },
  {
    timestamps: true
  }
)

export default mongoose.model("User", userSchema)
