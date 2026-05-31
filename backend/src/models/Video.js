import mongoose from "mongoose"

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    category: {
      type: String
    },

    cloudinaryPublicId: {
      type: String,
      required: true
    },

    videoUrl: {
      type: String,
      required: true
    },

    thumbnailUrl: {
      type: String
    },

    duration: {
      type: Number
    },

    isPublished: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model("Video", videoSchema)