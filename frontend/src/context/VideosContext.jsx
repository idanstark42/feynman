import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; 
import { useStytch } from '@stytch/react'; // Cleanest way to grab the stytch client instance directly
import videoService from '../services/videoService';

const VideosContext = createContext(null);

export function VideosProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { user } = useAuth();
  const stytch = useStytch();

  // Helper inside the context to safely grab the current fresh session token
  const getFreshToken = () => {
    const token = stytch.session.getTokens()?.session_token;
    if (!token) throw new Error("Authentication token is missing. Please log in again.");
    return token;
  };

  // Automatically load all videos when authenticated
  useEffect(() => {
    const fetchVideos = async () => {
      if (!user) {
        setVideos([]);
        return;
      }
      
      setLoading(true);
      setError(null);
      try {
        const token = getFreshToken();
        const data = await videoService.getAll(token);
        setVideos(data);
      } catch (err) {
        console.error("Error loading videos:", err);
        setError(err.message || "Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [user]);

  // Action: Upload
  const uploadVideo = async (videoFile, formMetadata) => {
    setLoading(true);
    setError(null);
    try {
      const token = getFreshToken();
      const newVideo = await videoService.uploadAndSave(token, videoFile, formMetadata);
      
      if (newVideo) {
        setVideos((prev) => [newVideo, ...prev]);
      } else {
        const refreshedData = await videoService.getAll(token);
        setVideos(refreszedData);
      }
      return newVideo;
    } catch (err) {
      setError(err.message || "Failed to upload video.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Action: Update
  const updateVideo = async (id, updateData) => {
    setError(null);
    try {
      const token = getFreshToken();
      const updatedVideo = await videoService.update(token, id, updateData);
      setVideos((prev) => prev.map((v) => (v._id === id ? updatedVideo : v)));
      return updatedVideo;
    } catch (err) {
      setError(err.message || "Failed to update video.");
      throw err;
    }
  };

  // Action: Delete
  const deleteVideo = async (id) => {
    setError(null);
    try {
      const token = getFreshToken();
      await videoService.delete(token, id);
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete video.");
      throw err;
    }
  };

  return (
    <VideosContext.Provider value={{ 
      videos, 
      loading, 
      error,
      uploadVideo,
      updateVideo,
      deleteVideo,
    }}>
      {children}
    </VideosContext.Provider>
  );
}

export const useVideos = () => {
  const context = useContext(VideosContext);
  if (!context) throw new Error("useVideos must be used within a VideosProvider");
  return context;
};