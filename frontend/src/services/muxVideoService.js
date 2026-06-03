import VideoService from "./baseVideoService";

class MuxVideoService extends VideoService {
  async uploadAndSave(token, videoFile, formMetadata) {
    const authHeaders = this.getAuthHeaders(token);

    // 1. Get direct upload URL from backend
    const sigResponse = await fetch(`${BACKEND}/api/videos/upload-signature`, { headers: authHeaders });
    if (!sigResponse.ok) throw new Error("Failed to generate secure Mux upload URL.");
    const { uploadUrl, uploadId } = await sigResponse.json();

    // 2. HTTP PUT raw binary stream to Mux
    const muxResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: { 'Content-Type': videoFile.type },
      body: videoFile
    });
    if (!muxResponse.ok) throw new Error("Direct binary upload to Mux failed.");

    // 3. Register asset tracking ID in DB
    const dbResponse = await fetch(`${BACKEND}/api/videos`, {
      method: 'POST',
      headers: this.getAuthHeaders(token, 'application/json'),
      body: JSON.stringify({
        ...formMetadata,
        provider: 'mux',
        muxUploadId: uploadId, 
      }),
    });
    if (!dbResponse.ok) throw new Error('Mux upload succeeded, but registering asset in DB failed.');

    return dbResponse.json();
  }
}

export default new MuxVideoService()