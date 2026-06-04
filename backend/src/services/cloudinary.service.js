import { v2 as cloudinary } from "cloudinary"
import VideoService from "./video-storage.service.js";

export class CloudinaryService extends VideoService {
  constructor({ cloudName, apiKey, apiSecret, folder }) {
    super();
    this.cloudinary = cloudinary;
    this.cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true
    });
    this.folder = folder || 'videos';
  }

  async getUploadUrl(options = {}) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    
    // Define signature parameters for an authenticated direct upload
    const paramsToSign = {
      timestamp: timestamp,
      folder: this.folder,
      type: 'authenticated', // Restricts public URL scanning
      ...options
    };

    // Generate the cryptographic signature using Cloudinary apiSecret
    const signature = this.cloudinary.utils.sign_request(paramsToSign);

    // Cloudinary direct uploads require a signed payload sent to their api endpoint
    const uploadUrl = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/video/upload`;

    return {
      uploadUrl,
      uploadId: `cl-${timestamp}`, // Placeholder ID since Cloudinary generates asset public_ids post-upload
      signatureData: {
        ...paramsToSign,
        signature,
        api_key: this.cloudinary.config().api_key
      }
    };
  }

  async getPlaybackUrl(publicId) {
    // Generates a time-restricted tokenized URL for authenticated delivery
    return this.cloudinary.utils.private_download_url(publicId, 'mp4', {
      resource_type: 'video',
      type: 'authenticated',
      expires_at: Math.round(Date.now() / 1000) + 900 // Valid for 15 minutes
    });
  }

  async deleteVideo(publicId) {
    try {
      // Cloudinary needs the resource_type explicitly defined as 'video'
      // and the storage type set matching the delivery policy ('authenticated')
      const result = await this.cloudinary.uploader.destroy(publicId, {
        resource_type: 'video',
        type: 'authenticated'
      });

      if (result.result === 'ok' || result.result === 'not_found') {
        return true;
      }
      throw new Error(`Cloudinary returned status: ${result.result}`);
    } catch (error) {
      console.error(`Cloudinary deletion failed for publicId ${publicId}:`, error.message);
      throw new Error(`Failed to delete video from Cloudinary: ${error.message}`);
    }
  }
}

export default new CloudinaryService({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
