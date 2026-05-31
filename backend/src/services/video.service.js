import videoRepository from "../repositories/video.repository.js";
import cloudinaryService from "./cloudinary.service.js";

class VideoService {
  async createVideo(file, metadata) {
    const uploaded =
      await cloudinaryService.uploadVideo(file.path);

    return videoRepository.create({
      title: metadata.title,
      description: metadata.description,
      category: metadata.category,
      videoUrl: uploaded.url,
      cloudinaryPublicId: uploaded.publicId,
      duration: uploaded.duration
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