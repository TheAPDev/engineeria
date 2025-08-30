import { useState, useRef } from 'react';
import { SwipeState } from '../types';

export const useSwipe = (onSwipeLeft: () => void, onSwipeRight: () => void, onDoubleTap: () => void) => {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    x: 0,
    y: 0,
    rotation: 0,
    opacity: 1
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const lastTapRef = useRef(0);
  const startPosRef = useRef({ x: 0, y: 0 });

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    startPosRef.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const deltaX = clientX - startPosRef.current.x;
    const deltaY = clientY - startPosRef.current.y;
    const rotation = deltaX * 0.1;
    const opacity = Math.max(0.5, 1 - Math.abs(deltaX) / 300);

    setSwipeState({
      x: deltaX,
      y: deltaY,
      rotation,
      opacity
    });
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(swipeState.x) > threshold) {
      if (swipeState.x > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    }
    
    // Reset position
    setSwipeState({ x: 0, y: 0, rotation: 0, opacity: 1 });
  };

  const handleTap = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (timeSinceLastTap < 300) {
      onDoubleTap();
    }
    
    lastTapRef.current = now;
  };

  return {
    swipeState,
    handlers: {
      onMouseDown: (e: React.MouseEvent) => handleStart(e.clientX, e.clientY),
      onMouseMove: (e: React.MouseEvent) => handleMove(e.clientX, e.clientY),
      onMouseUp: handleEnd,
      onMouseLeave: handleEnd,
      onTouchStart: (e: React.TouchEvent) => handleStart(e.touches[0].clientX, e.touches[0].clientY),
      onTouchMove: (e: React.TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY),
      onTouchEnd: handleEnd,
      onClick: handleTap
    },
    isDragging
  };
};