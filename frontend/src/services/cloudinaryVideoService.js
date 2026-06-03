import VideoService from "./baseVideoService"

class CloudinaryVideoService extends VideoService {
  async uploadAndSave(token, videoFile, formMetadata) {
    const authHeaders = this.getAuthHeaders(token);

    // 1. Get secure signature from backend
    const sigResponse = await fetch(`${BACKEND}/api/videos/upload-signature`, { headers: authHeaders });
    if (!sigResponse.ok) throw new Error("Failed to generate secure Cloudinary upload signature.");
    const { signature, timestamp, apiKey, cloudName } = await sigResponse.json();

    // 2. Push directly to Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", videoFile);
    cloudinaryFormData.append("api_key", apiKey);
    cloudinaryFormData.append("timestamp", timestamp);
    cloudinaryFormData.append("signature", signature);

    const cloudResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
      method: "POST",
      body: cloudinaryFormData
    });
    if (!cloudResponse.ok) {
      const cloudError = await cloudResponse.json();
      throw new Error(cloudError.error?.message || "Direct upload to Cloudinary failed.");
    }
    const cloudData = await cloudResponse.json();

    // 3. Save tracking metadata to Atlas DB
    const dbResponse = await fetch(`${BACKEND}/api/videos`, {
      method: 'POST',
      headers: this.getAuthHeaders(token, 'application/json'),
      body: JSON.stringify({
        ...formMetadata,
        provider: 'cloudinary',
        videoUrl: cloudData.secure_url,
        cloudinaryPublicId: cloudData.public_id,
        duration: cloudData.duration,
      }),
    });
    if (!dbResponse.ok) throw new Error('Cloudinary upload succeeded, but saving to DB failed.');

    return dbResponse.json();
  }
}

export default CloudinaryVideoService