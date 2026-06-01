import Video from "../models/Video.js"

class VideoRepository {
  async create(data) {
    return Video.create(data)
  }

  async findAll(filter = {}) {
    return Video.find(filter)
  }

  async findById(id) {
    return Video.findById(id)
  }

  async update(id, data) {
    return Video.findByIdAndUpdate(id, data, { new: true })
  }

  async delete(id) {
    return Video.findByIdAndDelete(id)
  }
}

export default new VideoRepository()