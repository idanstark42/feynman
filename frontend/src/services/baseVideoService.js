const BACKEND = import.meta.env.VITE_BACKEND_URL

/**
 * Base Video Service handling standard CRUD operations
 */
export default class VideoService {
  constructor() {
    if (this.constructor === VideoService) {
      throw new Error("Abstract class 'VideoService' cannot be instantiated directly.");
    }
  }

  // Helper to build auth headers using the passed-in token
  getAuthHeaders(token, contentType = 'application/json') {
    const headers = { 'Authorization': `Bearer ${token}` };
    if (contentType) {
      headers['Content-Type'] = contentType;
    }
    return headers;
  }

  // GET /api/videos
  async getAll(token) {
    const headers = this.getAuthHeaders(token);
    const response = await fetch(`${BACKEND}/api/videos`, { headers });
    if (!response.ok) throw new Error("Failed to fetch videos.");
    return response.json();
  }

  // GET /api/videos/:id
  async getById(token, id) {
    const headers = this.getAuthHeaders(token);
    const response = await fetch(`${BACKEND}/api/videos/${id}`, { headers });
    if (!response.ok) throw new Error(`Failed to fetch video with ID ${id}.`);
    return response.json();
  }

  // PATCH /api/videos/:id
  async update(token, id, updateData) {
    const headers = this.getAuthHeaders(token);
    const response = await fetch(`${BACKEND}/api/videos/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(updateData),
    });
    if (!response.ok) throw new Error("Failed to update video metadata.");
    return response.json();
  }

  // DELETE /api/videos/:id
  async delete(token, id) {
    const headers = this.getAuthHeaders(token);
    const response = await fetch(`${BACKEND}/api/videos/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) throw new Error("Failed to delete video.");
    return response.json();
  }

  /**
   * Abstract method implemented by subclasses
   */
  async uploadAndSave(token, videoFile, formMetadata) {
    throw new Error("Method 'uploadAndSave()' must be implemented by subclass.");
  }
}