import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 h-16 bg-gradient-to-b from-[#0b1422]/90 to-transparent px-8 flex items-center justify-between backdrop-blur-sm transition-colors duration-300 hover:bg-[#0b1422]">
      
      {/* Brand Identity Axis */}
      <div className="flex items-center gap-8">
        <Link to="/" className="text-brand-accent font-black text-2xl tracking-wider select-none hover:text-blue-400 transition">
          MATHFLIX
        </Link>
        <Link 
          to="/" 
          className={`text-sm font-medium transition ${location.pathname === '/' ? 'text-brand-accent' : 'text-neutral-400 hover:text-neutral-200'}`}
        >
          Home
        </Link>
        {user?.isAdmin && (
          <Link 
            to="/admin" 
            className={`text-sm font-medium transition ${location.pathname === '/admin' ? 'text-amber-400' : 'text-amber-500/70 hover:text-amber-400'}`}
          >
            Admin Console
          </Link>
        )}
      </div>

      {/* Interactive User Matrix Grid */}
      <div className="flex items-center gap-4">
        {/* Profile Control Hub Button */}
        <Link 
          to="/settings" 
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition shadow-sm ${
            location.pathname === '/settings'
              ? 'bg-brand-accent/20 border-brand-accent text-white shadow-brand-accent/20'
              : 'bg-brand-navy/60 border-brand-navy hover:border-brand-accent/50 text-neutral-300 hover:text-white'
          }`}
        >
          {/* Mock Vector Settings Gear Icon using Standard Typography Text */}
          <span className="text-sm text-brand-accent">⚙</span>
          <span className="max-w-[150px] truncate">{user?.email}</span>
        </Link>

        {/* System Session Sign Out Trigger */}
        <button 
          onClick={() => { logout(); navigate('/login'); }}
          className="bg-neutral-900 hover:bg-red-950/40 text-neutral-400 hover:text-red-400 border border-neutral-800 hover:border-red-900/40 text-xs px-3 py-1.5 rounded-md transition font-medium"
        >
          Sign Out
        </button>
      </div>

    </nav>
  );
}