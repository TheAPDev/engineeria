import React from 'react';
import { motion } from 'framer-motion';
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gray-900/95 backdrop-blur-sm border-b border-red-600/20 px-6 py-4 flex items-center justify-between sticky top-0 z-30"
    >
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-600/10 transition-colors duration-200 lg:hidden"
          title="Open sidebar menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        
        <h1 className="ml-4 text-xl font-bold font-['Montserrat'] bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent lg:hidden">
          OpportunityHub
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-gray-300">
          <UserCircleIcon className="h-6 w-6" />
          <span className="font-medium">{user?.name}</span>
        </div>
        
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </motion.header>
  );
};

export default Header;