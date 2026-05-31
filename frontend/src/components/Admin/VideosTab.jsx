import React, { useState } from 'react';

export default function VideosTab() {
  const [form, setForm] = useState({ title: '', course: '', label: 'Core Lecture', videoUrl: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Saving artifact data payload to Atlas DB:\n${JSON.stringify(form, null, 2)}`);
    setForm({ title: '', course: '', label: 'Core Lecture', videoUrl: '' });
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-base font-bold text-neutral-200 mb-4">Publish New Instructional Resource</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-neutral-400 mb-1">Lecture Title</label>
          <input 
            type="text" required value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
            className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-xs text-neutral-100 focus:outline-none focus:border-sky-800"
            placeholder="e.g., Evaluating Boundary Conditions in Schwarzschild Metric"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Course Catalog Classification</label>
            <input 
              type="text" required value={form.course}
              onChange={e => setForm({...form, course: e.target.value})}
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-xs text-neutral-100 focus:outline-none focus:border-sky-800"
              placeholder="e.g., General Relativity"
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Display Flag tag</label>
            <select 
              value={form.label} onChange={e => setForm({...form, label: e.target.value})}
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-xs text-neutral-100 focus:outline-none focus:border-sky-800"
            >
              <option>Core Lecture</option>
              <option>Problem Session</option>
              <option>Derivation Deep Dive</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs text-neutral-400 mb-1">Cloudinary Target Asset Resource URL</label>
          <input 
            type="text" required value={form.videoUrl}
            onChange={e => setForm({...form, videoUrl: e.target.value})}
            className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-xs text-neutral-100 focus:outline-none focus:border-sky-800 font-mono"
            placeholder="https://res.cloudinary.com/..."
          />
        </div>
        <button type="submit" className="bg-sky-800 hover:bg-red-700 text-white font-bold px-4 py-2 rounded text-xs transition tracking-wide">
          Commit Record to Database
        </button>
      </form>
    </div>
  );
}