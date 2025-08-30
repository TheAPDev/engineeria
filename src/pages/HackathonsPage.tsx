import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FunnelIcon, CalendarIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import SwipeCard from '../components/SwipeCard/SwipeCard';
import EnrollModal from '../components/Modal/EnrollModal';
import { supabase } from '../supabaseClient';
import { useSavedItems } from '../contexts/SavedItemsContext';


const HackathonsPage: React.FC = () => {

  const [hackathons, setHackathons] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState<string>('');
  // For post-enroll modal
  const [showPostEnrollModal, setShowPostEnrollModal] = useState(false);
  const [postEnrollStep, setPostEnrollStep] = useState<'ask'|'team'|null>(null);
  const [postEnrollTitle, setPostEnrollTitle] = useState<string>('');
  const enrollLinkClicked = useRef(false);
  const { saveItem, savedItems } = useSavedItems();
  const navigate = useNavigate();
  const location = useLocation();
  // Reset modal states on route change
  useEffect(() => {
    setShowEnrollModal(false);
    setShowPostEnrollModal(false);
    setPostEnrollStep(null);
    setSelectedHackathon('');
    setPostEnrollTitle('');
  }, [location.pathname]);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 for right, -1 for left
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [debugData, setDebugData] = useState<any>(null);

  // Helper to format date as '1st July 2025' if possible, else show as plain text
  function formatDateString(dateStr: string | null | undefined) {
    if (!dateStr) return '';
    // If already in YYYY-MM-DD or similar, just show as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    // Try to parse as date
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    // Suffix logic
    const j = day % 10, k = day % 100;
    let suffix = 'th';
    if (j === 1 && k !== 11) suffix = 'st';
    else if (j === 2 && k !== 12) suffix = 'nd';
    else if (j === 3 && k !== 13) suffix = 'rd';
    return `${day}${suffix} ${month} ${year}`;
  }

  useEffect(() => {
    const fetchHackathons = async () => {
      setLoading(true);
      setFetchError(null);
      const { data, error } = await supabase.from('hackathon').select('*').order('id', { ascending: false });
      setDebugData({ data, error });
      if (error) {
        setFetchError(error.message || 'Unknown error');
        setHackathons([]);
      } else if (data && Array.isArray(data)) {
        // Map Supabase columns to expected UI fields
        const mapped = data.map((h: any) => {
          let dateStr = h.date || '';
          if (!dateStr && h.start_date && h.end_date) {
            // Treat start_date and end_date as plain text (not Date objects)
            dateStr = `${h.start_date} to ${h.end_date}`;
          }
          return {
            ...h,
            title: h.title,
            shortInfo: h.shortInfo || h.description || '',
            moreInfo: h.moreInfo || h.description || '',
            location: h.location || '',
            type: h.type || '',
            date: dateStr,
            prize: h.prize || '',
            website: h.website || h.link || '',
          };
        });
        setHackathons(mapped);
      } else {
        setHackathons([]);
      }
      setLoading(false);
    };
    fetchHackathons();
  }, []);
  if (hackathons.length === 0) {

  // Reset currentIndex if hackathons list changes or index is out of bounds
  useEffect(() => {
    if (currentIndex >= hackathons.length) {
      setCurrentIndex(0);
    }
    // Also reset when returning to /hackathons
  }, [hackathons.length, location.pathname]);


  
  if (currentIndex >= hackathons.length) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Index out of bounds</h2>
          <p className="text-gray-400 mb-2">Current index: {currentIndex}, hackathons: {hackathons.length}</p>
        </div>
      </div>
    );
  }
// ...existing code...
}
  const currentHackathon = hackathons[currentIndex];

  // All hooks must be called before any conditional return
  // Guard: if currentHackathon is undefined, do not render anything that uses it
  // Place this after all hooks, before any code that uses currentHackathon
  if (!currentHackathon) {
    return null;
  }

  const handleSwipeLeft = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? hackathons.length - 1 : prev - 1
    );
  };

  const handleSwipeRight = () => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === hackathons.length - 1 ? 0 : prev + 1
    );
  };


  const savedItem = savedItems.find(item => item.id === currentHackathon.id && item.type === 'hackathon');
  const isLiked = !!savedItem && !savedItem.priority;
  const isPriority = !!savedItem && savedItem.priority;

  const handleLike = () => {
    if (currentHackathon && !isLiked) {
      saveItem('hackathon', currentHackathon, false);
    }
  };

  const handlePriority = () => {
    if (currentHackathon && !isPriority) {
      saveItem('hackathon', currentHackathon, true);
    }
  };

  const handleDoubleTap = () => {
    // Always mark as priority and route to My Opportunities
    if (currentHackathon && !isPriority) {
      saveItem('hackathon', currentHackathon, true);
    }
    navigate('/my-opportunities');
  };

  const handleEnroll = (hackathonTitle: string) => {
    setSelectedHackathon(hackathonTitle);
    setShowEnrollModal(true);
  };

  // Handle when user clicks Enroll Now (link)
  const handleEnrollLink = (hackathonTitle: string, website: string) => {
    enrollLinkClicked.current = true;
    setPostEnrollTitle(hackathonTitle);
    window.open(website, '_blank', 'noopener');
  };

  // On return, show post-enroll modal if user clicked enroll link
  useEffect(() => {
    const onFocus = () => {
      if (enrollLinkClicked.current) {
        setShowPostEnrollModal(true);
        setPostEnrollStep('ask');
        enrollLinkClicked.current = false;
      }
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <div className="text-center text-white">Loading hackathons...</div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error loading hackathons</h2>
          <p className="text-gray-300 mb-2">{fetchError}</p>
          <pre className="bg-gray-800 text-gray-200 p-2 rounded text-xs overflow-x-auto max-w-md mx-auto">{JSON.stringify(debugData, null, 2)}</pre>
        </div>
      </div>
    );
  }

  if (hackathons.length === 0 || currentIndex >= hackathons.length) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold font-['Montserrat'] mb-4 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            No More Hackathons
          </h2>
          <p className="text-gray-400 mb-6">
            You've seen all available hackathons. Check back later for new opportunities!
          </p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Start Over
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center py-4 px-2 sm:px-6 sm:py-8">
      <div className="w-full max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold font-['Montserrat'] mb-2 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Discover Hackathons
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Swipe to find your next coding adventure
          </p>
        </motion.div>

        {/* Swipe Card with Arrow Buttons */}
        <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
          {/* Left Arrow - always enabled, further aside */}
          <button
            aria-label="Swipe Left"
            className="absolute -left-6 sm:-left-20 z-20 bg-gray-800 hover:bg-red-700 text-white p-3 sm:p-4 rounded-full shadow-lg transition-colors duration-200 top-1/2 -translate-y-1/2"
            onClick={handleSwipeLeft}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ x: direction === 1 ? 40 : -40, opacity: 0, rotate: direction * 2 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: direction === 1 ? -40 : 40, opacity: 0, rotate: -direction * 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30, duration: 0.15 }}
              className="w-full"
            >
              <SwipeCard
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                onDoubleTap={handleDoubleTap}
                className="p-2 sm:p-6"
              >
                <div className="space-y-4">
                  {/* Like and Priority Buttons */}
                  <div className="flex justify-end space-x-2 mb-2">
                    <button
                      aria-label="Like"
                      className={`bg-gray-800 p-2 rounded-full shadow transition-colors duration-200 ${isLiked ? 'bg-red-600 text-white' : 'hover:bg-red-600 text-white'}`}
                      onClick={handleLike}
                    >
                      {isLiked ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12.62 4.5c-1.19 0-2.34.52-3.12 1.44C8.34 5.02 7.19 4.5 6 4.5 3.52 4.5 1.5 6.52 1.5 9c0 4.28 7.05 9.36 9.07 10.77.28.19.65.19.93 0C15.45 18.36 22.5 13.28 22.5 9c0-2.48-2.02-4.5-4.5-4.5-1.19 0-2.34.52-3.12 1.44C14.96 5.02 13.81 4.5 12.62 4.5z" /></svg>
                      )}
                    </button>
                    <button
                      aria-label="Priority"
                      className={`bg-gray-800 p-2 rounded-full shadow transition-colors duration-200 ${isPriority ? 'bg-yellow-400 text-white' : 'hover:bg-yellow-400 text-yellow-400 hover:text-white'}`}
                      onClick={handlePriority}
                      disabled={isPriority}
                    >
                      {isPriority ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l6.16 3.24-1.18-6.88 5-4.87-6.91-1-3.07-6.22-3.07 6.22-6.91 1 5 4.87-1.18 6.88L12 17.25z" /></svg>
                      )}
                    </button>
                  </div>
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold font-['Montserrat'] text-white flex-1">
                      {currentHackathon.title}
                    </h3>
                    <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs font-medium ml-4">
                      {currentHackathon.type}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {currentHackathon.shortInfo}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{currentHackathon.date}</span>
                    </div>
                    {/* Location removed as requested */}
                    {/* Prize section removed as requested */}
                  </div>
                  {/* Requirements Section (if available) */}
                  {currentHackathon.requirements && currentHackathon.requirements.length > 0 && (
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="font-semibold text-white mb-2">Requirements</h4>
                      <ul className="list-disc list-inside text-gray-300 text-sm leading-relaxed space-y-1">
                        {currentHackathon.requirements.map((req: string, idx: number) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {currentHackathon.website ? (
                    <button
                      onClick={() => handleEnrollLink(currentHackathon.title, currentHackathon.website)}
                      className="w-full block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] text-center"
                    >
                      Enroll Now
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnroll(currentHackathon.title)}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </SwipeCard>
            </motion.div>
          </AnimatePresence>
          {/* Right Arrow - always enabled, further aside */}
          <button
            aria-label="Swipe Right"
            className="absolute -right-6 sm:-right-20 z-20 bg-gray-800 hover:bg-green-700 text-white p-3 sm:p-4 rounded-full shadow-lg transition-colors duration-200 top-1/2 -translate-y-1/2"
            onClick={handleSwipeRight}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs sm:text-sm text-gray-400 mb-4"
        >
          ♥ Double Tap: Priority Save
        </motion.div>

        {/* Progress removed as requested */}

        {/* Filter Button */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
          <button className="bg-red-600 hover:bg-red-700 text-white p-3 sm:p-4 rounded-full shadow-lg transition-colors duration-200" title="Filter">
            <FunnelIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>

      <EnrollModal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        title={selectedHackathon}
      />

      {/* Post-enroll modal flow */}
      {/* Only wrap modal in AnimatePresence, not the whole page */}
      <AnimatePresence>
        {showPostEnrollModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPostEnrollModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-900 border border-red-600/30 rounded-xl p-6 max-w-md w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPostEnrollModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                title="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              {postEnrollStep === 'ask' && (
                <>
                  <h3 className="text-xl font-bold font-['Montserrat'] mb-4 text-white">Did you register for {postEnrollTitle}?</h3>
                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={() => setPostEnrollStep('team')}
                      className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowPostEnrollModal(false)}
                      className="flex-1 py-3 px-4 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg font-medium transition-colors duration-200"
                    >
                      No
                    </button>
                  </div>
                </>
              )}
              {postEnrollStep === 'team' && (
                <>
                  <h3 className="text-xl font-bold font-['Montserrat'] mb-4 text-white">Team Options</h3>
                  <div className="space-y-3 mb-4">
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
                  </div>
                  <button
                    onClick={() => setShowPostEnrollModal(false)}
                    className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Close
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HackathonsPage;