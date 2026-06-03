import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext' // Match your actual context path

export default function Login() {
  const { loginWithPassword, signUpWithPassword, loginWithOAuth } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setIsSubmitting(true)

    try {
      if (isSignUp) {
        await signUpWithPassword(email, password)
      } else {
        await loginWithPassword(email, password)
      }
      window.location.href = '/'
    } catch (err) {
      setErrorMsg(err?.error_message || 'An authentication error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black flex items-center justify-center px-4">
      <div className="bg-black/80 border border-neutral-800 p-10 rounded-md w-full max-w-md backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-black tracking-wider text-sky-800 mb-6 text-center select-none">feynman</h1>
        <h2 className="text-xl font-bold text-neutral-200 mb-4">{isSignUp ? 'Create Account' : 'Sign In'}</h2>
        
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-900/40 border border-red-800 text-red-200 text-xs rounded">
            {errorMsg}
          </div>
        )}

        {/* Traditional Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-semibold">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2.5 text-sm focus:outline-none focus:border-sky-800 focus:ring-1 focus:ring-sky-800 tracking-wide text-neutral-100"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-sky-800 hover:bg-sky-900 text-white font-semibold py-2.5 rounded transition text-sm tracking-wide shadow-md disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        {/* Toggle between registration states */}
        <div className="mt-6 pt-4 border-t border-neutral-800 text-center text-xs text-neutral-400">
          <button onClick={() => { setIsSignUp(!isSignUp); setErrorMsg('') }} className="hover:underline cursor-pointer text-neutral-200 font-medium">
            {isSignUp ? 'Already registered? Sign in here' : 'New to the platform? Create an account'}
          </button>
        </div>

        {!isSignUp && (
          <div className="text-center mt-1.5">
            <a href="/reset-password" className="text-xs text-neutral-400 hover:underline hover:text-neutral-200">
              Forgot password? Click here to get a reset email
            </a>
          </div>
        )}

      </div>
    </div>
  )
}