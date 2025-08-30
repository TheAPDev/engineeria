import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar Toggle Button (Hamburger) - always visible at top left */}
      <button
        className="fixed top-4 left-4 z-50 flex flex-col justify-center items-center w-10 h-10 bg-gray-900 border border-red-600/30 rounded-lg shadow-lg hover:bg-red-700/20 transition-colors duration-200 lg:hidden"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-label="Toggle sidebar"
      >
        <span className="block w-6 h-0.5 bg-white mb-1 rounded"></span>
        <span className="block w-6 h-0.5 bg-white mb-1 rounded"></span>
        <span className="block w-6 h-0.5 bg-white rounded"></span>
      </button>

      {/* Desktop Sidebar (always open, left-aligned) */}
      <div className="hidden lg:block lg:w-80">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>

      {/* Mobile Sidebar (toggle, left-aligned) */}
      <div className="lg:hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-2 sm:p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;