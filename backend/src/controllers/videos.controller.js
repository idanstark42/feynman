import videoService from "../services/video.service.js"
import endpoint from "./endpoint.js"
import cloudinary from "../config/cloudinary.js";

class VideosController {
  async getSignature(req, res, next) {
    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      
      // ONLY include timestamp in the signing parameters object
      const paramsToSign = {
        timestamp: timestamp
      };

      if (!process.env.CLOUDINARY_API_SECRET) {
        return res.status(500).json({ error: "Backend environment variable CLOUDINARY_API_SECRET is missing." });
      }

      // Generate signature using ONLY the timestamp
      const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET
      );

      return res.status(200).json({
        signature,
        timestamp,
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME
      });
    } catch (error) {
      return res.status(500).json({ 
        error: "Cloudinary signing exception", 
        message: error.message 
      });
    }
  }

  async create(req, res, next) {
    // Now we just accept standard JSON metadata from the frontend
    endpoint(async () => {
      const video = await videoService.saveVideoRecord(req.body);
      return { data: video };
    }, res, next);
  }

  async getAll(req, res, next) {
    endpoint(async () => {
      const videos = await videoService.getVideos()
      return { data: videos }
    }, res, next)
  }

  async getById(req, res, next) {
    endpoint(async () => {
      const video = await videoService.getVideoById(req.params.id)
      return { data: video }
    }, res, next)
  }

  async update(req, res, next) {
    endpoint(async () => {
      const video = await videoService.updateVideo(req.params.id, req.body)
      return { data: video }
    }, res, next)
  }

  async delete(req, res, next) {
    endpoint(async () => {
      await videoService.deleteVideo(req.params.id)
    }, res, next)
  }
}

export default new VideosController()
