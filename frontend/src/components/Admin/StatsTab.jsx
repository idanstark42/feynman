import React from 'react';

export default function StatsTab() {
  return (
    <div>
      <h2 className="text-base font-bold text-neutral-200 mb-4">Platform Aggregated Key Performance Indicators</h2>
      
      {/* Grid Dashboard Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Unique Enters Today', value: '142 logs' },
          { label: 'Monthly Active Subscribers', value: '89 accounts' },
          { label: 'Gross Volume Revenue (Last Month)', value: '₪ 14,350' },
          { label: 'Total Content Run Duration', value: '48.5 hours' }
        ].map((stat, i) => (
          <div key={i} className="bg-neutral-900 border border-neutral-800 p-4 rounded-md">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">{stat.label}</p>
            <p className="text-lg font-black text-neutral-100 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Structured Content Data Tables */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-md p-4">
        <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-3">Top Performing Media Assets</h3>
        <div className="space-y-2 text-xs font-mono">
          <div className="flex justify-between border-b border-neutral-800 pb-1.5 text-neutral-400 font-sans">
            <span>Video Asset Path Pointer</span>
            <span>View Metric Calculations</span>
          </div>
          <div className="flex justify-between text-neutral-200">
            <span>/course/gr/riemann-curvature-tensor</span>
            <span className="text-sky-700 font-bold">342 streaming queries</span>
          </div>
          <div className="flex justify-between text-neutral-200">
            <span>/course/qft/sunset-diagram-derivation</span>
            <span className="text-sky-700 font-bold">289 streaming queries</span>
          </div>
          <div className="flex justify-between text-neutral-200">
            <span>/course/diffgeom/stokes-theorem-proof</span>
            <span className="text-sky-700 font-bold">195 streaming queries</span>
          </div>
        </div>
      </div>
    </div>
  );
}