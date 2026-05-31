import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import HomeScreen from './pages/HomeScreen';
import WatchScreen from './pages/WatchScreen';
import AdminDashboard from './pages/AdminDashboard';
import UserSettings from './pages/UserSettings';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="h-screen bg-neutral-950 text-white flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && !user.isAdmin) return <Navigate to="/" replace />;

  return children;
};

function AppContent() {
  const { user } = useAuth();
  return (
    <div className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-sky-800 selection:text-white">
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        
        <Route path="/" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
        <Route path="/watch/:videoId" element={<ProtectedRoute><WatchScreen /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><UserSettings /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to={user ? "/" : "/landing"} />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}