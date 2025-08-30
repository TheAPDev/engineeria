import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, StarIcon, TrashIcon, CalendarIcon, MapPinIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useSavedItems } from '../contexts/SavedItemsContext';
import { Hackathon, Internship } from '../types';

type TabType = 'hackathons' | 'internships';
type SubTabType = 'liked' | 'priority';

const MyOpportunitiesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('hackathons');
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>('liked');
  const { savedItems, removeItem, togglePriority } = useSavedItems();

  // Only show saved items, no dummies
  const hackathonItems = savedItems.filter(item => item.type === 'hackathon');
  const internshipItems = savedItems.filter(item => item.type === 'internship');

  const getFilteredItems = () => {
    const items = activeTab === 'hackathons' ? hackathonItems : internshipItems;
    return activeSubTab === 'liked' 
      ? items.filter(item => !item.priority)
      : items.filter(item => item.priority);
  };

  const filteredItems = getFilteredItems();

  const renderHackathonCard = (hackathon: Hackathon, item: any) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-900 border border-red-600/20 rounded-lg p-4 space-y-3 relative"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold font-['Montserrat'] text-white flex-1">
          {hackathon.title}
        </h3>
        <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs font-medium ml-4">
          {hackathon.type}
        </span>
      </div>

      <p className="text-gray-300 text-sm">
        {hackathon.shortInfo}
      </p>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center space-x-2 text-gray-400">
          <CalendarIcon className="h-4 w-4" />
          <span>{hackathon.date}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <MapPinIcon className="h-4 w-4" />
          <span>{hackathon.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-700">
        <button
          onClick={() => togglePriority(item.id)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-gray-800"
        >
          {item.priority ? (
            <StarIconSolid className="h-5 w-5 text-yellow-400" />
          ) : (
            <StarIcon className="h-5 w-5 text-gray-400" />
          )}
          <span className={item.priority ? 'text-yellow-400' : 'text-gray-400'}>
            {item.priority ? 'Priority' : 'Mark Priority'}
          </span>
        </button>

        <button
          onClick={() => removeItem(item.id)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-600/10 transition-colors duration-200"
        >
          <TrashIcon className="h-5 w-5" />
          <span>Remove</span>
        </button>
      </div>
    </motion.div>
  );

  const renderInternshipCard = (internship: Internship, item: any) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-900 border border-red-600/20 rounded-lg p-4 space-y-3 relative"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-bold font-['Montserrat'] text-white">
          {internship.title}
        </h3>
        <div className="flex items-center space-x-2 text-red-400">
          <BuildingOfficeIcon className="h-5 w-5" />
          <span className="font-semibold">{internship.company}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center space-x-2 text-gray-400">
          <MapPinIcon className="h-4 w-4" />
          <span>{internship.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <CalendarIcon className="h-4 w-4" />
          <span>{internship.duration}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-700">
        <button
          onClick={() => togglePriority(item.id)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-gray-800"
        >
          {item.priority ? (
            <StarIconSolid className="h-5 w-5 text-yellow-400" />
          ) : (
            <StarIcon className="h-5 w-5 text-gray-400" />
          )}
          <span className={item.priority ? 'text-yellow-400' : 'text-gray-400'}>
            {item.priority ? 'Priority' : 'Mark Priority'}
          </span>
        </button>

        <button
          onClick={() => removeItem(item.id)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-600/10 transition-colors duration-200"
        >
          <TrashIcon className="h-5 w-5" />
          <span>Remove</span>
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold font-['Montserrat'] mb-2 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            My Opportunities
          </h1>
          <p className="text-gray-400">
            Manage your saved hackathons and internships
          </p>
        </motion.div>

        {/* Main Tabs */}
        <div className="flex bg-gray-900 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('hackathons')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'hackathons'
                ? 'bg-red-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Hackathons ({hackathonItems.length})
          </button>
          <button
            onClick={() => setActiveTab('internships')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'internships'
                ? 'bg-red-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Internships ({internshipItems.length})
          </button>
        </div>

        {/* Sub Tabs */}
        <div className="flex bg-gray-900 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveSubTab('liked')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
              activeSubTab === 'liked'
                ? 'bg-red-600/20 text-red-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <HeartIcon className="h-4 w-4" />
            <span>Liked</span>
          </button>
          <button
            onClick={() => setActiveSubTab('priority')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
              activeSubTab === 'priority'
                ? 'bg-red-600/20 text-red-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <StarIcon className="h-4 w-4" />
            <span>Priority</span>
          </button>
        </div>

        {/* Content */}
        <motion.div layout className="space-y-4">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-500 mb-4">
                {activeSubTab === 'liked' ? (
                  <HeartIcon className="h-12 w-12 mx-auto" />
                ) : (
                  <StarIcon className="h-12 w-12 mx-auto" />
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-400 mb-2">
                No {activeSubTab} {activeTab} yet
              </h3>
              <p className="text-gray-500">
                Start swiping to discover and save opportunities!
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredItems.map((item) => (
                <div key={item.id}>
                  {activeTab === 'hackathons' 
                    ? renderHackathonCard(item.item as Hackathon, item)
                    : renderInternshipCard(item.item as Internship, item)
                  }
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyOpportunitiesPage;