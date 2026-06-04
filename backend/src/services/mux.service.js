import Mux from '@mux/mux-node';
import VideoService from "./video-storage.service.js";

class MuxService extends VideoService {
  constructor({ tokenId, tokenSecret, signingKeyId, signingKeySecret, corsOrigin }) {
    super();
    // Initialize the official Mux SDK
    const muxClient = new Mux(tokenId, tokenSecret);
    this.video = muxClient.Video;
    
    this.signingKeyId = signingKeyId;
    this.signingKeySecret = signingKeySecret;
    this.corsOrigin = corsOrigin || '*';
  }

  async getUploadUrl(options = {}) {
    const upload = await this.video.Uploads.create({
      cors_origin: this.corsOrigin,
      new_asset_settings: {
        playback_policy: 'signed', // Enforces paywall security from birth
        ...options.assetSettings
      },
    });

    return {
      uploadUrl: upload.url,
      uploadId: upload.id // Used to track webhook status later
    };
  }

  async getPlaybackUrl(playbackId) {
    // Generate a temporary JWT token (valid for 15 minutes) signed with your private key
    const token = Mux.JWT.signPlaybackId(playbackId, {
      keyId: this.signingKeyId,
      keySecret: this.signingKeySecret,
      type: 'video',
      expiration: '15m', 
    });

    // Mux Player expects either the tokenized HLS URL or the token passed natively
    return `https://stream.mux.com/${playbackId}.m3u8?token=${token}`;
  }

  async deleteVideo(assetId) {
    try {
      // Mux requires the Asset ID (not the playback ID) to delete an asset
      await this.video.Assets.delete(assetId);
      return true;
    } catch (error) {
      console.error(`Mux deletion failed for asset ${assetId}:`, error.message);
      throw new Error(`Failed to delete video from Mux: ${error.message}`);
    }
  }
}

export default new MuxService({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
  signingKeyId: process.env.MUX_SIGNING_KEY_ID,
  signingKeySecret: process.env.MUX_SIGNING_KEY_SECRET,
  corsOrigin: process.env.FRONTEND_URL
});