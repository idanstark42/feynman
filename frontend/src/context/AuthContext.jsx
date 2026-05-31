import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useStytchUser, useStytch } from '@stytch/react'; // Uncomment when running yarn add @stytch/react

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Stub states mimicking Stytch's hook responses
  const [user, setUser] = useState({
    id: 'mock-user-123',
    email: 'physicist@example.com',
    isAdmin: true,
    isSubscribed: true,
    enrolledVideos: ['vid-1']
  });
  const [loading, setLoading] = useState(false);

  /* Actual Stytch Integration Blueprint:
  const { user: stytchUser, isInitialized } = useStytchUser();
  const stytch = useStytch();

  useEffect(() => {
    if (isInitialized && stytchUser) {
      // Fetch corresponding DB profile mapping role/subscription metadata from Atlas
      fetch(`/api/users/${stytchUser.user_id}`)
        .then(res => res.json())
        .then(dbData => setUser({ ...stytchUser, ...dbData }))
        .finally(() => setLoading(false));
    } else if (isInitialized) {
      setUser(null);
      setLoading(false);
    }
  }, [stytchUser, isInitialized]);
  */

  const logout = () => {
    // stytch.session.revoke();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);