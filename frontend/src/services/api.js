// Backend Service Stubs - Connect to your Express app here

const BACKEND = import.meta.env.VITE_BACKEND_URL

export const api = {
  // Video & Course Data
  getCourses: async () => {
    // GET /api/courses (Populated with matching videos from Atlas)
    return [];
  },
  getVideoData: async (videoId) => {
    // GET /api/videos/:id
    return null;
  },
  getContinueWatching: async () => {
    // GET /api/users/history
    return [];
  },
  updateProgress: async (videoId, progressSeconds) => {
    // POST /api/users/history { videoId, progressSeconds }
    return { success: true };
  },

  // Payment Hooks (Sumit.co.il stubs)
  createSubscriptionSession: async (planId) => {
    // POST /api/payments/sumit/subscribe -> returns redirect URL
    return { checkoutUrl: '#' };
  },
  createPayPerVideoSession: async (videoId) => {
    // POST /api/payments/sumit/single -> returns redirect URL
    return { checkoutUrl: '#' };
  },

  // Admin Controls
  admin: {
    addVideo: async (videoData) => {
      // POST /api/admin/videos (videoData containing Cloudinary secure_url)
      return { success: true };
    },
    getUsers: async () => {
      // GET /api/admin/users
      return [];
    },
    getGlobalStats: async () => {
      // GET /api/admin/stats
      return {
        mostWatched: [],
        entersPerDay: [],
        revenueHistory: []
      };
    }
  }
};