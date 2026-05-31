import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function WatchScreen() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    // Sync telemetry analytics tracking back to Atlas
    const progressInterval = setInterval(() => {
      if (videoRef.current) {
        const currentSeconds = Math.floor(videoRef.current.currentTime);
        console.log(`Syncing progress metadata for ${videoId}: ${currentSeconds}s`);
        // api.updateProgress(videoId, currentSeconds);
      }
    }, 10000);

    return () => clearInterval(progressInterval);
  }, [videoId]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
      {/* Return Navigation Axis */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-[110] text-neutral-400 hover:text-white transition flex items-center gap-2 group text-sm font-semibold tracking-wide bg-black/40 px-3 py-2 rounded"
      >
        <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to Dashboard
      </button>

      {/* Full Screen Native Framework (Fed by Cloudinary asset links) */}
      <video
        ref={videoRef}
        controls
        autoPlay
        className="w-full h-full object-contain"
        src="https://res.cloudinary.com/demo/video/upload/elephants.mp4" // Placeholder schema mapping target cloud path
      />
    </div>
  );
}