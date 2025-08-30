import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const EnrollModal: React.FC<EnrollModalProps> = ({ isOpen, onClose, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gray-900 border border-red-600/30 rounded-xl p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              title="Close"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold font-['Montserrat'] mb-4 text-white">
              Register for {title}
            </h3>
            
            <p className="text-gray-300 mb-6">
              Did you register for this {title.toLowerCase().includes('hackathon') ? 'hackathon' : 'internship'}?
            </p>

            <div className="space-y-3">
              <button
                disabled
                className="w-full py-3 px-4 bg-gray-600 text-gray-400 rounded-lg font-medium cursor-not-allowed flex items-center justify-between"
              >
                <span>Create a Team</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">Coming Soon</span>
              </button>
              
              <button
                disabled
                className="w-full py-3 px-4 bg-gray-600 text-gray-400 rounded-lg font-medium cursor-not-allowed flex items-center justify-between"
              >
                <span>Join a Team</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">Coming Soon</span>
              </button>
              
              <button
                onClick={onClose}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                I'll Register Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnrollModal;