import fs from "fs"

import videoRepository from "../repositories/video.repository.js";
import cloudinaryService from "./cloudinary.service.js";

class VideoService {
  async createVideo(data) {
    // 2. Commit asset pointers to the Database (No fs.unlink cleanup needed!)
    return videoRepository.create({
      title: metadata.title,
      description: metadata.description,
      category: metadata.category,
      videoUrl: metadata.videoUrl,
      cloudinaryPublicId: metadata.cloudinaryPublicId,
      duration: metadata.duration
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
    const video =
      await videoRepository.findById(id);

    if (video?.cloudinaryPublicId) {
      await cloudinaryService.deleteVideo(
        video.cloudinaryPublicId
      );
    }

    return videoRepository.delete(id);
  }
}

export default new VideoService();