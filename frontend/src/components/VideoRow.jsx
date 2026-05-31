import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function VideoRow({ title, videos }) {
  const navigate = useNavigate();

  if (!videos || videos.length === 0) return null;

  return (
    <div className="mb-8 px-8">
      <h2 className="text-xl font-bold tracking-wide text-neutral-200 mb-3">{title}</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 max-w-full">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => navigate(`/watch/${video.id}`)}
            className="flex-none w-64 aspect-video bg-neutral-900 rounded-md overflow-hidden relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10 shadow-md hover:shadow-black/50 border border-neutral-800"
          >
            {/* Thumbnail Canvas */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950 flex flex-col justify-between p-3">
              <span className="text-xs font-bold tracking-tight bg-sky-600/20 text-sky-600 border border-sky-500/30 px-1.5 py-0.5 rounded self-start uppercase">
                {video.label || 'Lecture'}
              </span>
              <div>
                <h3 className="text-sm font-bold text-neutral-100 truncate">{video.title}</h3>
                <p className="text-xs text-neutral-400 truncate mt-0.5">{video.courseName}</p>
              </div>
            </div>

            {/* Visual indicator for video progress */}
            {video.progress > 0 && (
              <div className="absolute bottom-0 left-0 w-full bg-neutral-800 h-1">
                <div 
                  className="bg-sky-600 h-full" 
                  style={{ width: `${(video.progress / video.duration) * 100}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}