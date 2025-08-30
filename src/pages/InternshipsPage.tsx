import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FunnelIcon, MapPinIcon, ClockIcon, CurrencyDollarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import SwipeCard from '../components/SwipeCard/SwipeCard';
// import EnrollModal from '../components/Modal/EnrollModal';
import { supabase } from '../supabaseClient';
import { useSavedItems } from '../contexts/SavedItemsContext';

const InternshipsPage: React.FC = () => {
  const [internships, setInternships] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [showEnrollModal, setShowEnrollModal] = useState(false);
  // const [selectedInternship, setSelectedInternship] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [debugData, setDebugData] = useState<any>(null);
  const { saveItem, savedItems } = useSavedItems();
  const navigate = useNavigate();
  const location = useLocation();
  const [direction, setDirection] = useState<1 | -1>(1);


  // Helper to format date as '2nd September 2025'
  function formatDateString(dateStr: string | null | undefined) {
    if (!dateStr) return '';
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

  // useEffect(() => {
  //   setShowEnrollModal(false);
  //   setSelectedInternship('');
  // }, [location.pathname]);

  useEffect(() => {
    const fetchInternships = async () => {
      setLoading(true);
      setFetchError(null);
      const { data, error } = await supabase.from('internships').select('*').order('id', { ascending: false });
      setDebugData({ data, error });
      if (error) {
        setFetchError(error.message || 'Unknown error');
        setInternships([]);
      } else if (data && Array.isArray(data)) {
        const mapped = data.map((i: any) => ({
          ...i,
          title: i.title,
          company: i.company || '',
          location: i.location || '',
          stipend: i.Stripend || i.stipend || i.stripend || '',
          otherBenefits: i["Other benefits"] || i.otherBenefits || i["other benefits"] || '',
          deadline: i.deadline || i.end_date || '',
          duration: i.duration || '',
          applyLink: i.applyLink || i.link || '',
          description: i.description || '',
          requirements: Array.isArray(i.requirements)
            ? i.requirements
            : (typeof i.requirements === 'string' ? i.requirements.split(/[,\n]/).map((r: string) => r.trim()).filter(Boolean) : []),
        }));
        setInternships(mapped);
      } else {
        setInternships([]);
      }
      setLoading(false);
    };
    fetchInternships();
  }, []);

  useEffect(() => {
    if (currentIndex >= internships.length) {
      setCurrentIndex(0);
    }
  }, [internships.length, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <div className="text-center text-white">Loading internships...</div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error loading internships</h2>
          <p className="text-gray-300 mb-2">{fetchError}</p>
          <pre className="bg-gray-800 text-gray-200 p-2 rounded text-xs overflow-x-auto max-w-md mx-auto">{JSON.stringify(debugData, null, 2)}</pre>
        </div>
      </div>
    );
  }

  if (internships.length === 0 || currentIndex >= internships.length) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold font-['Montserrat'] mb-4 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            No More Internships
          </h2>
          <p className="text-gray-400 mb-6">
            You've seen all available internships. Check back later for new opportunities!
          </p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Start Over
          </button>
        </motion.div>
      </div>
    );
  }

  const currentInternship = internships[currentIndex];
  if (!currentInternship) return null;

  const savedItem = savedItems.find(item => item.id === currentInternship.id && item.type === 'internship');
  const isLiked = !!savedItem && !savedItem.priority;
  const isPriority = !!savedItem && savedItem.priority;

  const handleSwipeLeft = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? internships.length - 1 : prev - 1
    );
  };
  const handleSwipeRight = () => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === internships.length - 1 ? 0 : prev + 1
    );
  };
  const handleLike = () => {
    if (currentInternship && !isLiked) {
      saveItem('internship', currentInternship, false);
    }
  };
  const handlePriority = () => {
    if (currentInternship && !isPriority) {
      saveItem('internship', currentInternship, true);
    }
  };
  const handleDoubleTap = () => {
    if (currentInternship && !isPriority) {
      saveItem('internship', currentInternship, true);
    }
    navigate('/my-opportunities');
  };
  // const handleEnroll = (internshipTitle: string) => {
  //   setSelectedInternship(internshipTitle);
  //   setShowEnrollModal(true);
  // };

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold font-['Montserrat'] mb-2 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            Discover Internships
          </h1>
          <p className="text-gray-400">
            Swipe to find your next opportunity
          </p>
        </motion.div>

        {/* Swipe Card with Arrow Buttons */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Left Arrow */}
            <button
              aria-label="Swipe Left"
              className="absolute left-2 sm:left-4 z-20 bg-gray-800 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-colors duration-200 top-1/2 -translate-y-1/2 flex items-center justify-center"
              onClick={handleSwipeLeft}
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-7 sm:h-7">
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
              className="w-[75vw] max-w-[260px] mx-auto"
            >
              <SwipeCard
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                onDoubleTap={handleDoubleTap}
                className="p-2 sm:p-4"
              >
                <div className="space-y-4">
                  {/* Like and Priority Buttons */}
                  <div className="flex justify-end space-x-2 mb-2">
                    <button
                      aria-label="Like"
                      className={`bg-gray-800 p-2 rounded-full shadow transition-colors duration-200 ${isLiked ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 text-white'}`}
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
                    <h3 className="text-2xl font-bold font-['Montserrat'] text-white flex-1">
                      {currentInternship.title}
                    </h3>
                  </div>
                  {/* Description Section */}
                  <div>
                    <h4 className="font-semibold text-white mb-1">Description</h4>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                      {currentInternship.description ? currentInternship.description : 'TBD'}
                    </p>
                  </div>
                  {/* Deadline, Stipend, Other Benefits (all bold subheadings) */}
                  <div className="space-y-2 mt-4">
                    <div>
                      <span className="font-semibold text-white">Deadline: </span>
                      <span className="text-gray-300 text-sm leading-relaxed">{currentInternship.deadline ? currentInternship.deadline : 'TBD'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-white">Stipend: </span>
                      <span className="text-gray-300 text-sm leading-relaxed">{currentInternship.stipend ? currentInternship.stipend : 'TBD'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-white">Other Benefits: </span>
                      {currentInternship.otherBenefits ? (
                        Array.isArray(currentInternship.otherBenefits)
                          ? (
                              <ul className="list-disc list-inside text-gray-300 text-sm leading-relaxed">
                                {currentInternship.otherBenefits.map((benefit: string, idx: number) => (
                                  <li key={idx}>{benefit}</li>
                                ))}
                              </ul>
                            )
                          : (() => {
                              // Try to split by period, semicolon, or newline for bullet points
                              const benefitsArr = currentInternship.otherBenefits
                                .split(/\n|\.|;/)
                                .map((b: string) => b.trim())
                                .filter((b: string) => b.length > 0);
                              return benefitsArr.length > 1 ? (
                                <ul className="list-disc list-inside text-gray-300 text-sm leading-relaxed">
                                  {benefitsArr.map((benefit: string, idx: number) => (
                                    <li key={idx}>{benefit}</li>
                                  ))}
                                </ul>
                              ) : (
                                <span className="text-gray-300 text-sm leading-relaxed">{currentInternship.otherBenefits}</span>
                              );
                            })()
                      ) : (
                        <span className="text-gray-300 text-sm leading-relaxed">TBD</span>
                      )}
                    </div>
                  </div>
                  {/* Apply Button */}
                  {currentInternship.applyLink && (
                    <a
                      href={currentInternship.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] mt-4 text-center"
                    >
                      Apply Now
                    </a>
                  )}
                </div>
              </SwipeCard>
            </motion.div>
          </AnimatePresence>
          {/* Right Arrow */}
            <button
              aria-label="Swipe Right"
              className="absolute right-2 sm:right-4 z-20 bg-gray-800 hover:bg-green-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-colors duration-200 top-1/2 -translate-y-1/2 flex items-center justify-center"
              onClick={handleSwipeRight}
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-7 sm:h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-400 mb-4"
        >
          ♥ Double Tap: Priority Save
        </motion.div>

        {/* Filter Button removed */}
      </div>


    </div>
  );
};

export default InternshipsPage;
// (end of file)
// (end of file)