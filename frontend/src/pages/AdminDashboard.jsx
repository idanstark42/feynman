import React, { useState } from 'react';
import VideosTab from '../components/Admin/VideosTab';
import UsersTab from '../components/Admin/UsersTab';
import StatsTab from '../components/Admin/StatsTab';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('videos');

  return (
    <div className="pt-24 pb-12 min-h-screen bg-neutral-950 px-8">
      <div className="border-b border-neutral-800 pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-neutral-100">System Management Console</h1>
          <p className="text-xs text-neutral-400 mt-0.5">Manage lectures, monitor user engagement metrics, and trace billing statements.</p>
        </div>

        {/* Tab Selection Matrix */}
        <div className="flex bg-neutral-900 border border-neutral-800 p-1 rounded-md self-start">
          {['videos', 'users', 'stats'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded text-xs font-bold tracking-wide transition capitalize ${
                activeTab === tab ? 'bg-sky-800 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Render Active Subsection Matrix Contexts */}
      <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-lg p-6">
        {activeTab === 'videos' && <VideosTab />}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'stats' && <StatsTab />}
      </div>
    </div>
  );
}