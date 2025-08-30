import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  BookmarkIcon,
  CurrencyDollarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/hackathons', label: 'Hackathons', icon: AcademicCapIcon },
    { path: '/internships', label: 'Internships', icon: BriefcaseIcon },
    { path: '/my-opportunities', label: 'My Opportunities', icon: BookmarkIcon },
    // Pricing link removed
    { path: '/coming-soon', label: 'Coming Soon', icon: ClockIcon },
  ];

  // Removed Saved Hackathons/Internships and their sub-menus as My Opportunities already exists
  const subMenuItems: any[] = [];

  const allMenuItems = [...menuItems, ...subMenuItems];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed left-0 top-0 h-full w-72 sm:w-80 bg-gray-900 border-r border-red-600/20 z-50 lg:sticky lg:translate-x-0"
          >
            <div className="flex items-center p-4 sm:p-6 border-b border-red-600/20">
              {/* Hamburger always visible and always closes sidebar */}
              <button
                onClick={onClose}
                className="mr-3 sm:mr-4 p-2 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-600/10 transition-colors duration-200"
                title="Close sidebar"
                aria-label="Close sidebar"
              >
                <Bars3Icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
              <h2 className="text-xl sm:text-2xl font-bold font-['Montserrat'] bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Engineeria
              </h2>
            </div>
            <nav className="mt-4 sm:mt-6 px-2 sm:px-4">
              {allMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                const isSubMenu = 'parent' in item;
                const isIndented = 'indent' in item && item.indent;
                return (
                  <motion.div
                    key={item.path}
                    whileHover={{ x: 4 }}
                    className={`mb-2 ${isIndented ? 'ml-6 sm:ml-8' : isSubMenu ? 'ml-3 sm:ml-4' : ''}`}
                  >
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/25'
                          : 'text-gray-300 hover:bg-red-600/10 hover:text-red-400'
                      }`}
                    >
                      <Icon className={`h-5 w-5 mr-2 sm:mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span className={`font-medium text-base sm:text-lg ${isIndented ? 'text-sm' : ''}`}>
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;