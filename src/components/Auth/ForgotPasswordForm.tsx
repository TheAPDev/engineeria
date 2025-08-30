import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface ForgotPasswordFormProps {
  onBack: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold font-['Montserrat'] mb-2 text-green-400">
            Email Sent!
          </h2>
          <p className="text-gray-300">
            We've sent a password reset link to {email}
          </p>
        </div>
        
        <button
          onClick={onBack}
          className="flex items-center justify-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back to Login</span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-200 mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back to Login</span>
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-['Montserrat'] mb-2 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
          Forgot Password?
        </h1>
        <p className="text-gray-400">
          Enter your email address and we'll send you a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400 transition-colors duration-200"
            placeholder="Enter your email"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-red-600/25"
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </motion.div>
  );
};

export default ForgotPasswordForm;