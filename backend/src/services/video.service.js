import fs from "fs"

import videoRepository from "../repositories/video.repository";
import cloudinaryService from "./cloudinary.service"

class VideoService {

  constructor (videoStorageService) {
    this.videoStorageService = videoStorageService
  }

  async getSignature() {
    return this.videoStorageService.getUploadSignature()
  }

  async createVideo(data) {
    // 2. Commit asset pointers to the Database (No fs.unlink cleanup needed!)
    return videoRepository.create({
      title: data.title,
      description: data.description,
      category: data.category,
      videoUrl: data.videoUrl,
      assetId: data.assetId,
      duration: data.duration
    });
  }

  async getVideos() {
    return videoRepository.findAll({
      isPublished: true
    });
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