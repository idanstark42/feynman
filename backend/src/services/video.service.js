import fs from "fs"

import videoRepository from "../repositories/video.repository.js"
import cloudinaryService from "./cloudinary.service.js"

class VideoService {

  constructor (videoStorageService) {
    this.videoStorageService = videoStorageService
  }

  async getUploadUrl(options = {}) {
    return this.videoStorageService.getUploadUrl(options)
  }

  async createVideo(data) {
    // 2. Commit asset pointers to the Database (No fs.unlink cleanup needed!)
    return videoRepository.create({
      title: data.title,
      description: data.description,
      category: data.category,
      tags: data.tags,
      assetId: data.assetId,
      videoUrl: data.videoUrl,
      thumbnailUrl: data.thumbnailUrl,
      duration: data.duration,
      isPublished: data.isPublished !== undefined ? data.isPublished : false
    });
  }

  async getVideos(filters = {}) {
    return videoRepository.findAll({
      isPublished: true,
      ...filters
    });
  }

  async searchVideos(query) {
    return videoRepository.search(query);
  }

  async getVideoById(id) {
    return videoRepository.findById(id);
  }

  async updateVideo(id, data) {
    return videoRepository.update(id, data);
  }

  async deleteVideo(id) {
    const video = await videoRepository.findById(id);

    if (video?.assetId) {
      await this.videoStorageService.deleteVideo(
        video.assetId
      );
    }

    return videoRepository.delete(id);
  }
}

export default new VideoService(cloudinaryService);