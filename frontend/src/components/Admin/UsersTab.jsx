import React, { useState } from 'react';

export default function UsersTab() {
  const [selectedUser, setSelectedUser] = useState(null);

  const mockUsers = [
    { id: '1', email: 'dirac@quantum.edu', status: 'Active Subscriber', views: 42, joinDate: '2026-01-12' },
    { id: '2', email: 'emmy.noether@math.org', status: 'Pay-Per-Video', views: 19, joinDate: '2026-03-05' },
    { id: '3', email: 'feynman@caltech.edu', status: 'Expired Trial', views: 3, joinDate: '2026-04-22' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* User Selection Matrix Menu */}
      <div className="md:col-span-1 border-r border-neutral-800/80 pr-4 space-y-2">
        <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-3">Enrolled Users</h3>
        {mockUsers.map(u => (
          <div
            key={u.id}
            onClick={() => setSelectedUser(u)}
            className={`p-3 rounded cursor-pointer transition text-xs border ${
              selectedUser?.id === u.id 
                ? 'bg-neutral-800 border-neutral-700' 
                : 'bg-neutral-900/40 border-transparent hover:bg-neutral-900'
            }`}
          >
            <p className="font-bold text-neutral-200 truncate">{u.email}</p>
            <p className="text-neutral-400 text-[11px] mt-0.5">{u.status}</p>
          </div>
        ))}
      </div>

      {/* User Analytics Viewpanel */}
      <div className="md:col-span-2">
        {selectedUser ? (
          <div>
            <h3 className="text-base font-bold text-neutral-200 mb-2">Metrics: {selectedUser.email}</h3>
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
                <p className="text-[11px] text-neutral-400 uppercase tracking-wider">Account Access Class</p>
                <p className="text-sm font-bold text-amber-400 mt-0.5">{selectedUser.status}</p>
              </div>
              <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
                <p className="text-[11px] text-neutral-400 uppercase tracking-wider">Historical Total Views</p>
                <p className="text-sm font-bold text-neutral-200 mt-0.5">{selectedUser.views} videos</p>
              </div>
            </div>
            <div className="bg-neutral-900/60 p-3 rounded border border-neutral-800 text-xs text-neutral-400 space-y-1">
              <p><strong>System Identification Index:</strong> {selectedUser.id}</p>
              <p><strong>Created Date timestamp:</strong> {selectedUser.joinDate}</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-neutral-500 py-12">
            Select an account matrix profile vector to populate analytics reports.
          </div>
        )}
      </div>
    </div>
  );
}