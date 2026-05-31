import cloudinary from "../config/cloudinary.js";
import fs from "fs";

class CloudinaryService {
  async uploadVideo(filePath) {
    try {
      const result =
        await cloudinary.uploader.upload(filePath, {
          resource_type: "video",
          folder: "streaming-platform/videos"
        });

      fs.unlinkSync(filePath);

      return {
        url: result.secure_url,
        publicId: result.public_id,
        duration: result.duration
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteVideo(publicId) {
    return cloudinary.uploader.destroy(publicId, {
      resource_type: "video"
    });
  }
}

export default new CloudinaryService();