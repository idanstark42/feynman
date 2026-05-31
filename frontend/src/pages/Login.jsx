import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleStytchAuth = (e) => {
    e.preventDefault();
    alert(`Stytch Magic Link triggered for: ${email}. Add your Stytch configuration inside /src/context/AuthContext.jsx.`);
  };

  return (
    <div className="h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black flex items-center justify-center px-4">
      <div className="bg-black/80 border border-neutral-800 p-10 rounded-md w-full max-w-md backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-black tracking-wider text-red-600 mb-6 text-center select-none">MATHFLIX</h1>
        <h2 className="text-xl font-bold text-neutral-200 mb-4">{isSignUp ? 'Create Account' : 'Sign In'}</h2>
        
        <form onSubmit={handleStytchAuth} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-semibold">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2.5 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 tracking-wide text-neutral-100"
              placeholder="you@domain.com"
            />
          </div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded transition text-sm tracking-wide shadow-md">
            Send Magic Link
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-neutral-800 text-center text-xs text-neutral-400">
          <button onClick={() => setIsSignUp(!isSignUp)} className="hover:underline text-neutral-200 font-medium">
            {isSignUp ? 'Already registered? Sign in here' : 'New to the platform? Create an account'}
          </button>
        </div>
      </div>
    </div>
  );
}