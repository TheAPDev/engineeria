import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SavedItemsProvider } from './contexts/SavedItemsContext';
import AuthPage from './pages/AuthPage';
import MainLayout from './components/Layout/MainLayout';
import HackathonsPage from './pages/HackathonsPage';
import InternshipsPage from './pages/InternshipsPage';
import MyOpportunitiesPage from './pages/MyOpportunitiesPage';
// ...existing code...
import ComingSoonPage from './pages/ComingSoonPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/auth" />;
};

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/auth" 
        element={user ? <Navigate to="/hackathons" /> : <AuthPage />} 
      />
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/hackathons" />} />
        <Route path="hackathons" element={<HackathonsPage />} />
        <Route path="internships" element={<InternshipsPage />} />
        <Route path="my-opportunities" element={<MyOpportunitiesPage />} />
        <Route path="saved-hackathons" element={<MyOpportunitiesPage />} />
        <Route path="saved-hackathons/liked" element={<MyOpportunitiesPage />} />
        <Route path="saved-hackathons/priority" element={<MyOpportunitiesPage />} />
        <Route path="saved-internships" element={<MyOpportunitiesPage />} />
        <Route path="saved-internships/liked" element={<MyOpportunitiesPage />} />
        <Route path="saved-internships/priority" element={<MyOpportunitiesPage />} />
        {/* Pricing route removed */}
        <Route path="coming-soon" element={<ComingSoonPage />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <SavedItemsProvider>
          <div className="App">
            <AppContent />
          </div>
        </SavedItemsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;