import React, { createContext, useContext, useState, useEffect } from 'react'
import { useStytchUser, useStytch } from '@stytch/react'

const AuthContext = createContext(null)

const BACKEND = import.meta.env.VITE_BACKEND_URL

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const { user: stytchUser, isInitialized } = useStytchUser()
  const stytch = useStytch()

  // Sync state with backend whenever Stytch initializes or changes user state
  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (isInitialized && stytchUser) {
        try {
          // Grab the tokens from Stytch client local storage/cookies
          const sessionToken = stytch.session.getTokens()?.session_token

          if (!sessionToken) throw new Error("No session token available")

          // Hit your controller's login endpoint to sync/create the local DB user
          const response = await fetch(BACKEND + '/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionToken }),
          })

          const data = await response.json()
          
          if (response.ok) {
            // Combine Stytch properties and your custom backend User data
            setUser({ ...stytchUser, ...data.user })
          } else {
            console.error("Backend auth sync failed:", data.message)
            setUser(null)
          }
        } catch (error) {
          console.error("Error syncing auth state:", error)
          setUser(null)
        } finally {
          setLoading(false)
        }
      } else if (isInitialized) {
        setUser(null)
        setLoading(false)
      }
    }

    syncUserWithBackend()
  }, [stytchUser, isInitialized, stytch])

  // Email & Password Methods
  const loginWithPassword = async (email, password) => {
    setLoading(true)
    try {
      await stytch.passwords.authenticate({
        email,
        password,
        session_duration_minutes: 60,
      })
    } catch (err) {
      setLoading(false)
      throw err
    }
  }

  const signUpWithPassword = async (email, password) => {
    setLoading(true)
    try {
      await stytch.passwords.create({
        email,
        password,
        session_duration_minutes: 60,
      })
    } catch (err) {
      setLoading(false)
      throw err
    }
  }

  const loginWithOAuth = (provider) => {
    const redirectUrl = window.location.origin
    stytch.oauth[provider].start({
      login_redirect_url: redirectUrl,
      signup_redirect_url: redirectUrl,
    })
  }

  const logout = async () => {
    try {
      await stytch.session.revoke()
    } catch (err) {
      console.error("Error during logout:", err)
    } finally {
      setUser(null)
    }
  }

  const sendPasswordResetEmail = async (email) => {
    setLoading(true);
    try {
      await stytch.passwords.resetByEmailStart({
        email,
        login_redirect_url: `${window.location.origin}`,
        reset_password_redirect_url: `${window.location.origin}/reset-password`,
      });
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPasswordWithToken = async (token, newPassword) => {
    setLoading(true);
    try {
      // FIX: Change from .resetByEmail.reset() to .reset()
      await stytch.passwords.resetByEmail({
        token,
        password: newPassword,
        session_duration_minutes: 60,
      });
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      logout, 
      loginWithPassword, 
      signUpWithPassword, 
      loginWithOAuth,
      sendPasswordResetEmail,
      resetPasswordWithToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)