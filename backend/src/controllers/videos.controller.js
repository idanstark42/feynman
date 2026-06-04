import videoService from "../services/video.service.js"
import endpoint from "./endpoint.js"

class VideosController {
  async getUploadUrl(req, res, next) {
    endpoint(async () => {
      return await videoService.getUploadUrl()
    }, res, next);
  }

  async create(req, res, next) {
    // Now we just accept standard JSON metadata from the frontend
    endpoint(async () => {
      const video = await videoService.createVideo(req.body);
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
