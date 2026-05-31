import React, { useState } from 'react';
import VideoRow from '../components/VideoRow';
import { useAuth } from '../context/AuthContext';
import Latex from 'react-latex-next'

export default function HomeScreen() {
  const { user } = useAuth();
  
  // High-fidelity stub data mimicking MongoDB architecture outputs
  const [mockHistory] = useState([
    { id: 'vid-1', title: 'Deriving the Riemann Curvature Tensor', courseName: 'General Relativity', progress: 1200, duration: 3600, label: 'Core Proof' },
    { id: 'vid-2', title: 'Feynman Rules for Scalar Φ⁴ Theory', courseName: 'Quantum Field Theory', progress: 450, duration: 2400, label: 'Methods' }
  ]);

  const [mockCourses] = useState([
    {
      name: 'Differential Geometry & Manifolds',
      videos: [
        { id: 'vid-3', title: 'Stokes Theorem on Smooth Manifolds', courseName: 'Differential Geometry', label: 'Core Proof' },
        { id: 'vid-4', title: 'Orientability of Real Projective Space ℝPⁿ', courseName: 'Differential Geometry', label: 'Problems' }
      ]
    },
    {
      name: 'Quantum Field Theory Basics',
      videos: [
        { id: 'vid-2', title: 'Feynman Rules for Scalar Φ⁴ Theory', courseName: 'Quantum Field Theory', label: 'Methods' },
        { id: 'vid-5', title: '1PI Propagators and the Sunset Diagram', courseName: 'Quantum Field Theory', label: 'Derivation' }
      ]
    }
  ]);

  const handlePaymentRedirect = (type) => {
    alert(`Connecting to Sumit.co.il Gateway for transaction payload: ${type}`);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-neutral-950">
      {/* Dynamic Subscription Wall */}
      {!user?.isSubscribed && (
        <div className="mx-8 mb-10 p-6 rounded-md bg-gradient-to-r via-neutral-900 to-neutral-900 border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-neutral-100">Unlock Theoretical Physics Modules</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-xl">Gain immediate streaming access to all comprehensive mathematical derivations, lecture archives, and deep dives.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handlePaymentRedirect('subscription')} className="bg-brand-accent hover:bg-blue-600 px-4 py-2 rounded text-xs font-bold transition shadow-lg whitespace-nowrap">
              Monthly All-Access Pass
            </button>
            <button onClick={() => handlePaymentRedirect('single')} className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded text-xs font-bold transition border border-neutral-700 whitespace-nowrap">
              Pay Per Video
            </button>
          </div>
        </div>
      )}

      {/* Hero Header Space */}
      <div className="px-8 mb-10">
        <div className="h-[35vh] w-full rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-950 border border-brand-navy/60/60 p-8 flex flex-col justify-end relative overflow-hidden">
          <h1 className="text-3xl md:text-4xl font-black text-neutral-100 max-w-2xl tracking-tight leading-none mb-3">
            The Sunset Diagram & 1PI Propagators
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 max-w-xl mb-4 line-clamp-2">
            Evaluating multi-loop self-energy contributions inside scalar field theories utilizing Feynman parameters and dimensional regularization ($d = 4 - \epsilon$).
          </p>
        </div>
      </div>

      {/* Main Content Feeds */}
      <VideoRow title="Continue Watching" videos={mockHistory} />
      
      {mockCourses.map((course, idx) => (
        <VideoRow key={idx} title={course.name} videos={course.videos} />
      ))}
    </div>
  );
}