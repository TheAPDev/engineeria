import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import ForgotPasswordForm from '../components/Auth/ForgotPasswordForm';

type AuthView = 'login' | 'signup' | 'forgot-password';

const AuthPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginForm
            onSwitchToSignup={() => setCurrentView('signup')}
            onForgotPassword={() => setCurrentView('forgot-password')}
          />
        );
      case 'signup':
        return (
          <SignupForm
            onSwitchToLogin={() => setCurrentView('login')}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onBack={() => setCurrentView('login')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-red-600/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-red-800/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-gray-900/80 backdrop-blur-xl border border-red-600/20 rounded-2xl shadow-2xl shadow-red-600/10 p-8">
          {renderCurrentView()}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;