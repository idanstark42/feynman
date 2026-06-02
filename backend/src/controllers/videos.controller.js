import videoService from "../services/video.service.js"
import endpoint from "./endpoint.js"

class VideosController {
  async create(req, res, next) {
    endpoint(async () => {
      const video = await videoService.createVideo(req.file, req.body)
      return { data: video }
    })
  }

  async getAll(req, res, next) {
    endpoint(async () => {
      const videos = await videoService.getVideos()
      return { data: videos }
    })
  }

  async getById(req, res, next) {
    endpoint(async () => {
      const video = await videoService.getVideoById(req.params.id)
      return { data: video }
    })
  }

  async update(req, res, next) {
    endpoint(async () => {
      const video = await videoService.updateVideo(req.params.id, req.body)
      return { data: video }
    })
  }

  async delete(req, res, next) {
    endpoint(async () => {
      await videoService.deleteVideo(req.params.id)
    })
  }
}

export default new VideosController()
