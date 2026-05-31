import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function UserSettings() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // Interactive local states for stubs
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [paymentCap, setPaymentCap] = useState(350); // Default monthly cap in New Israeli Shekels (₪)
  const [isEditingCap, setIsEditingCap] = useState(false);

  // High-fidelity mocking matching your Atlas DB design
  const [paymentHistory] = useState([
    { id: 'TX-9041', date: '2026-05-01', description: 'Monthly Subscription All-Access', amount: 180, status: 'Paid' },
    { id: 'TX-8832', date: '2026-04-15', description: 'Single Video: Sunset Diagram Derivation', amount: 35, status: 'Paid' },
    { id: 'TX-7421', date: '2026-03-12', description: 'Single Video: Riemann Curvature Tensor', amount: 35, status: 'Paid' }
  ]);

  const [watchAnalytics] = useState([
    { id: 'vid-5', title: '1PI Propagators and the Sunset Diagram', totalWatched: '42 mins', lastAccessed: 'Yesterday', completed: true },
    { id: 'vid-3', title: 'Stokes Theorem on Smooth Manifolds', totalWatched: '18 mins', lastAccessed: '3 days ago', completed: false },
    { id: 'vid-4', title: 'Orientability of Real Projective Space ℝPⁿ', totalWatched: '55 mins', lastAccessed: '2026-05-20', completed: true }
  ]);

  const totalSpent = paymentHistory.reduce((acc, curr) => acc + curr.amount, 0);

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    alert('Password change request dispatched to Stytch verification servers.');
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const handleSumitRedirect = () => {
    alert('Redirecting secure frame gateway to Sumit.co.il updating system profiles...');
  };

  const handleDeleteAccount = () => {
    if (confirm('CRITICAL ACTION: Are you sure you want to completely delete your profile? This deletes all viewing history metrics.')) {
      alert('Account termination request queued.');
      logout();
    }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen px-8 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        
        {/* Left Side Tab Navigation Rail */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="premium-card rounded-lg p-4 space-y-1">
            <div className="px-3 py-2 mb-2">
              <p className="text-sm font-bold text-white truncate">{user?.email}</p>
              <span className="text-[10px] text-brand-accent font-semibold tracking-wider uppercase">
                {user?.isSubscribed ? 'Premium Member' : 'Pay-As-You-Go Client'}
              </span>
            </div>
            
            {[
              { id: 'profile', label: 'Security & Profile' },
              { id: 'billing', label: 'Subscription & Billing' },
              { id: 'history', label: 'Telemetry & History' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-2 rounded text-xs font-bold transition tracking-wide block ${
                  activeTab === tab.id 
                    ? 'bg-brand-navy text-brand-accent border-l-2 border-brand-accent' 
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side Working Content Workspace */}
        <div className="flex-1 premium-card rounded-lg p-6 min-h-[500px]">
          
          {/* TAB 1: PROFILE MANAGEMENT & SECURITY */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Identity Settings</h2>
                <p className="text-xs text-neutral-400 mt-0.5">Manage your credentials and platform presence parameters.</p>
              </div>

              <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">Change Authentication Password</h3>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Current Password</label>
                  <input 
                    type="password" required value={passwordForm.current}
                    onChange={e => setPasswordForm({...passwordForm, current: e.target.value})}
                    className="w-full bg-black/40 border border-brand-navy/80 rounded p-2 text-xs text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">New Password</label>
                  <input 
                    type="password" required value={passwordForm.new}
                    onChange={e => setPasswordForm({...passwordForm, new: e.target.value})}
                    className="w-full bg-black/40 border border-brand-navy/80 rounded p-2 text-xs text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <button type="submit" className="bg-brand-accent hover:bg-blue-600 text-white font-bold px-4 py-2 rounded text-xs transition">
                  Update Password via Stytch
                </button>
              </form>

              <div className="pt-6 border-t border-brand-navy/60">
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-1">Danger Zone</h3>
                <p className="text-xs text-neutral-400 mb-3">Permanently purge your access tokens and clear database watch configurations.</p>
                <button onClick={handleDeleteAccount} className="bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-900/40 font-bold px-4 py-2 rounded text-xs transition">
                  Delete Account Profile
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SUBSCRIPTION & SUMIT BILLING CONTROLS */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Financial Controls</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">Manage subscription terms, payment parameters, and structural financial tiers.</p>
                </div>
                <span className="text-xs font-mono px-2 py-1 bg-brand-navy border border-brand-navy/80 rounded text-neutral-300">
                  Aggregate Spend: ₪ {totalSpent}
                </span>
              </div>

              {/* Subscription Core Summary */}
              <div className="bg-black/20 border border-brand-navy/60 p-4 rounded-md flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Current Tier Class</p>
                  <p className="text-base font-black text-white mt-0.5">
                    {user?.isSubscribed ? 'Monthly All-Access Private Pass' : 'Pay-Per-Video Asset Access Only'}
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-1">Next automatic clearing transaction processed through Sumit.co.il systems.</p>
                </div>
                <button onClick={handleSumitRedirect} className="bg-brand-accent hover:bg-blue-600 text-white font-bold px-4 py-2 rounded text-xs transition whitespace-nowrap self-start sm:self-center">
                  Modify Payment Method
                </button>
              </div>

              {/* Dynamic Budget Safety Cap Module */}
              <div className="bg-brand-navy/20 border border-brand-navy p-4 rounded-md">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-glow mb-1">Budget Safety Threshold Cap</h3>
                <p className="text-xs text-neutral-400 mb-4">A safety mechanism built for private lesson students. If pay-per-video purchases exceed this cap in a month, further lecture files instantly unlock for free.</p>
                
                <div className="flex items-center gap-4">
                  {isEditingCap ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-300 font-mono">₪</span>
                      <input 
                        type="number" 
                        value={paymentCap} 
                        onChange={(e) => setPaymentCap(Number(e.target.value))}
                        className="bg-black/60 border border-brand-accent w-24 rounded p-1 text-xs font-mono text-white text-center focus:outline-none"
                      />
                      <button onClick={() => setIsEditingCap(false)} className="bg-brand-accent text-white px-3 py-1 rounded text-[11px] font-bold">
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-base font-black font-mono text-white">₪ {paymentCap} / month</span>
                      <button onClick={() => setIsEditingCap(true)} className="text-xs text-neutral-400 hover:text-white underline">
                        Edit Cap Limit
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Itemized Ledger Table */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3">Historical Ledger Statements</h3>
                <div className="bg-black/20 border border-brand-navy/40 rounded-md overflow-hidden text-xs">
                  <div className="grid grid-cols-4 bg-brand-navy/60 p-3 text-neutral-400 font-sans border-b border-brand-navy/80">
                    <span>Date</span>
                    <span>Description</span>
                    <span className="text-center">Reference</span>
                    <span className="text-right">Amount</span>
                  </div>
                  <div className="divide-y divide-brand-navy/40">
                    {paymentHistory.map((h) => (
                      <div key={h.id} className="grid grid-cols-4 p-3 font-mono items-center text-neutral-300">
                        <span>{h.date}</span>
                        <span className="font-sans text-white truncate">{h.description}</span>
                        <span className="text-center text-neutral-500">{h.id}</span>
                        <span className="text-right text-brand-glow">₪ {h.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VIDEO WATCH HISTORY & TELEMETRY */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Viewing Metrics & Analytics</h2>
                <p className="text-xs text-neutral-400 mt-0.5">Trace completed derivations and runtime logs cached inside the database backend.</p>
              </div>

              <div className="space-y-3">
                {watchAnalytics.map((video) => (
                  <div key={video.id} className="p-4 bg-black/20 border border-brand-navy/40 rounded-md flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-bold text-neutral-200 tracking-tight">{video.title}</h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        Time spent interacting: <span className="text-neutral-300 font-mono">{video.totalWatched}</span> • Checked: {video.lastAccessed}
                      </p>
                    </div>
                    <div>
                      {video.completed ? (
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                          Fully Reviewed
                        </span>
                      ) : (
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                          Incomplete Segment
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}