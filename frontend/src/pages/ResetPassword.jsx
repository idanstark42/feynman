import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ResetPassword() {
  const { sendPasswordResetEmail, resetPasswordWithToken } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check URL for Stytch's reset token on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');
    console.log(tokenFromUrl)
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  const handleRequestEmail = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      await sendPasswordResetEmail(email);
      setSuccessMsg('Check your inbox! We sent you a password reset link.');
    } catch (err) {
      setErrorMsg(err?.error_message || 'Failed to send reset email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      await resetPasswordWithToken(token, password);
      setSuccessMsg('Password updated successfully! You can now log in.');
      // Clean up the token from UI state
      setToken(null);
      // Remove query token from browser address bar
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (err) {
      console.error(err)
      setErrorMsg(err?.error_message || 'Failed to update your password. Link may be expired.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black flex items-center justify-center px-4">
      <div className="bg-black/80 border border-neutral-800 p-10 rounded-md w-full max-w-md backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-black tracking-wider text-sky-800 mb-6 text-center select-none">feynman</h1>
        <h2 className="text-xl font-bold text-neutral-200 mb-4">
          {token ? 'Create New Password' : 'Reset Password'}
        </h2>
        
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-900/40 border border-red-800 text-red-200 text-xs rounded">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-900/40 border border-emerald-800 text-emerald-200 text-xs rounded">
            {successMsg}
          </div>
        )}

        {token ? (
          /* FORM 2: Actually setting the new password using token from URL */
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-semibold">New Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded p-2.5 text-sm focus:outline-none focus:border-sky-800 focus:ring-1 focus:ring-sky-800 tracking-wide text-neutral-100"
                placeholder="Minimum 8 characters"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-sky-800 hover:bg-sky-900 text-white font-semibold py-2.5 rounded transition text-sm tracking-wide disabled:opacity-50"
            >
              {isSubmitting ? 'Updating...' : 'Save New Password'}
            </button>
          </form>
        ) : (
          /* FORM 1: Initial request to send the email link */
          <form onSubmit={handleRequestEmail} className="space-y-4">
            <p className="text-xs text-neutral-400 leading-relaxed">
              Enter your email address and we'll send you a specialized secure link to pick a brand new password.
            </p>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-semibold">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded p-2.5 text-sm focus:outline-none focus:border-sky-800 focus:ring-1 focus:ring-sky-800 tracking-wide text-neutral-100"
                placeholder="you@domain.com"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-sky-800 hover:bg-sky-900 text-white font-semibold py-2.5 rounded transition text-sm tracking-wide disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Recovery Link'}
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-neutral-800 text-center text-xs text-neutral-400">
          <a href="/" className="hover:underline text-neutral-200 font-medium">
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
}