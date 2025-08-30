import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useSwipe } from '../../hooks/useSwipe';

interface SwipeCardProps {
  children: React.ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onDoubleTap: () => void;
  className?: string;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  onDoubleTap,
  className = ""
}) => {
  const { swipeState, handlers, isDragging } = useSwipe(onSwipeLeft, onSwipeRight, onDoubleTap);

  // Enable double tap for both mouse (laptop) and touch (mobile)
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (onDoubleTap) onDoubleTap();
  };

  return (
    <div className="relative">
      {/* Swipe Indicators */}
      {isDragging && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: swipeState.x < -50 ? 1 : 0, 
              scale: swipeState.x < -50 ? 1 : 0.8,
              x: -100
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-red-600 text-white p-4 rounded-full shadow-lg"
          >
            <ArrowLeftIcon className="h-8 w-8" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: swipeState.x > 50 ? 1 : 0, 
              scale: swipeState.x > 50 ? 1 : 0.8,
              x: 100
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-green-600 text-white p-4 rounded-full shadow-lg"
          >
            <ArrowRightIcon className="h-8 w-8" />
          </motion.div>
        </>
      )}

      {/* Main Card */}
      <motion.div
        {...handlers}
        onDoubleClick={handleDoubleClick}
        animate={{
          x: swipeState.x,
          y: swipeState.y,
          rotate: swipeState.rotation,
          opacity: swipeState.opacity
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className={`bg-gray-900 border border-red-600/20 rounded-xl shadow-xl cursor-grab active:cursor-grabbing select-none ${className}`}
        style={{ touchAction: 'none' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SwipeCard;