import React, { useState, useRef, useEffect } from 'react';
import { useStytch } from '@stytch/react'

import videoService from '../../services/videoService'

const BACKEND = import.meta.env.VITE_BACKEND_URL

const SUBMIT_TEXTS = {
  "pending": "upload video",
  "uploading": "uploading...",
  "saving": "saving to DB..."
}

export default function VideosTab() {
  const stytch = useStytch()
  const [form, setForm] = useState({ title: '', course: '' });
  const [videoFile, setVideoFile] = useState(null);
  const [status, setStatus] = useState("pending");
  
  // Tag Management States
  const [tags, setTags] = useState(['Core Lecture']);
  const [tagInput, setTagInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Pre-defined suggestions for the tags dropdown
  const suggestions = ['Core Lecture', 'Problem Session', 'Derivation Deep Dive', 'Review', 'Guest Seminar'];
  
  // Filter out suggestions that match the search string or are already active tags
  const filteredSuggestions = suggestions.filter(
    item => item.toLowerCase().includes(tagInput.toLowerCase()) && !tags.includes(item)
  );

  // Close the tag dropdown when clicking anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddTag = (tagText) => {
    const trimmed = tagText.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput('');
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e) => {
    // Intercept Enter key inside the tag field to prevent premature form submission
    if (e.key === 'Enter') {
      e.preventDefault(); 
      if (tagInput.trim()) {
        handleAddTag(tagInput);
      }
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!videoFile) {
      alert("Please select a video file first.");
      return;
    }

    setStatus("uploading");

    try {
      // Prep payload structure for the server POST request
      const formMetadata = {
        title: form.title,
        category: form.course,
        labels: tags 
      };

      // The sub-class handles the sequence automatically!
      await videoService.uploadAndSave(videoFile, formMetadata);

      alert('Success! Video successfully processed and cataloged.');
      
      // Reset form UI elements
      setForm({ title: '', course: '' });
      setVideoFile(null);
      setTags(['Core Lecture']);
      setTagInput('');
      e.target.reset();

    } catch (error) {
      console.error(error);
      alert(`Upload Failure: ${error.message}`);
    } finally {
      setStatus("pending");
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-base font-bold text-neutral-200 mb-4">Publish a New Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title Field */}
        <div>
          <label className="block text-xs text-neutral-400 mb-1">Title</label>
          <input 
            type="text" required value={form.title} disabled={status !== "pending"}
            onChange={e => setForm({...form, title: e.target.value})}
            className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-xs text-neutral-100 focus:outline-none focus:border-sky-800 disabled:opacity-50"
            placeholder="e.g., Evaluating Boundary Conditions in Schwarzschild Metric"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Category Field */}
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Category</label>
            <input 
              type="text" required value={form.course} disabled={status !== "pending"}
              onChange={e => setForm({...form, course: e.target.value})}
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-xs text-neutral-100 focus:outline-none focus:border-sky-800 disabled:opacity-50"
              placeholder="e.g., General Relativity"
            />
          </div>

          {/* Searchable Tags Custom Field */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-xs text-neutral-400 mb-1">Tags</label>
            <div className="w-full bg-neutral-900 border border-neutral-700 rounded p-1.5 focus-within:border-sky-800 min-h-[34px]">
              {/* Flex wrapper for showing active pill tags */}
              <div className="flex flex-wrap gap-1 mb-1 empty:mb-0">
                {tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 bg-neutral-800 border border-neutral-600 text-neutral-200 rounded px-1.5 py-0.5 text-[10px]">
                    {tag}
                    <button 
                      type="button" disabled={status !== "pending"}
                      onClick={() => handleRemoveTag(idx)}
                      className="text-neutral-400 cursor-pointer hover:text-red-400 font-bold ml-0.5 focus:outline-none disabled:opacity-50"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              
              {/* Inline query string text input */}
              <input 
                type="text" value={tagInput} disabled={status !== "pending"}
                onFocus={() => setIsDropdownOpen(true)}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-xs text-neutral-100 focus:outline-none p-0.5 disabled:opacity-50"
                placeholder={tags.length === 0 ? "Type and press Enter..." : "Add tag..."}
              />
            </div>

            {/* Custom Dropdown Suggestion Menu overlay */}
            {isDropdownOpen && filteredSuggestions.length > 0 && status === "pending" && (
              <ul className="absolute z-10 w-full bg-neutral-900 border border-neutral-700 rounded mt-1 max-h-40 overflow-y-auto shadow-xl">
                {filteredSuggestions.map((suggestion, index) => (
                  <li 
                    key={index} onClick={() => handleAddTag(suggestion)}
                    className="cursor-pointer px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Binary Video File Upload Field */}
        <div>
          <label className="block text-xs text-neutral-400 mb-1">Upload Video File</label>
          <input 
            type="file" 
            required
            accept="video/*"
            disabled={status !== "pending"}
            onChange={e => setVideoFile(e.target.files[0])}
            className="w-full bg-neutral-900 border border-neutral-700 rounded p-1.5 text-xs text-neutral-400 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-neutral-800 file:text-neutral-200 hover:file:bg-neutral-700 file:cursor-pointer text-neutral-100 focus:outline-none focus:border-sky-800 disabled:opacity-50"
          />
        </div>

        {/* Reactive UI Submit Button */}
        <button 
          type="submit" 
          disabled={status !== "pending"}
          className={`w-full cursor-pointer ${status === "pending" ? 'bg-sky-800 hover:bg-sky-700' : 'bg-neutral-700 cursor-not-allowed'} text-white font-bold px-4 py-2 rounded text-xs transition tracking-wide`}
        >
          {SUBMIT_TEXTS[status]}
        </button>
      </form>
    </div>
  );
}