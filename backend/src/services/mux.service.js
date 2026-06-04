import Mux from '@mux/mux-node';
import VideoService from "./video-storage.service.js";

const TOKEN_ID = process.env.MUX_TOKEN_ID;
const TOKEN_SECRET = process.env.MUX_TOKEN_SECRET;
const SIGNING_KEY_ID = process.env.MUX_SIGNING_KEY_ID;
const SIGNING_KEY_SECRET = process.env.MUX_SIGNING_KEY_SECRET;
const CORS_ORIGIN = process.env.FRONTEND_URL;

class MuxService extends VideoService {
  initialize () {
    super();
    // Initialize the official Mux SDK
    const muxClient = new Mux(TOKEN_ID, TOKEN_SECRET);
    this.video = muxClient.Video;
    
    this.signingKeyId = SIGNING_KEY_ID;
    this.signingKeySecret = SIGNING_KEY_SECRET;
    this.corsOrigin = CORS_ORIGIN || '*';
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

export default new MuxService();