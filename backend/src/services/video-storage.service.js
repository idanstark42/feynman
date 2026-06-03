export default class VideoService {
  constructor() {
    if (this.constructor === VideoService) {
      throw new Error("Abstract class 'VideoService' cannot be instantiated directly.");
    }
  }

  /**
   * Generates a secure, temporary URL for the frontend to upload a video file.
   * @param {Object} options - Custom options like metadata or restrictions.
   * @returns {Promise<{ uploadUrl: string, uploadId: string }>}
   */
  async getUploadUrl(options = {}) {
    throw new Error("Method 'getUploadUrl()' must be implemented.");
  }

  /**
   * Generates a signed playback URL or token for the frontend player.
   * @param {string} identifier - The unique asset/public/playback ID.
   * @returns {Promise<string>} The authenticated streaming URL.
   */
  async getPlaybackUrl(identifier) {
    throw new Error("Method 'getPlaybackUrl()' must be implemented.");
  }

  /**
   * Permanently deletes a video from the provider's storage.
   * @param {string} identifier - The Asset ID (Mux) or Public ID (Cloudinary).
   * @returns {Promise<boolean>} True if successfully deleted, throws error otherwise.
   */
  async deleteVideo(identifier) {
    throw new Error("Method 'deleteVideo()' must be implemented.");
  }
}