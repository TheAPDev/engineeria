import React, { createContext, useContext, useState } from 'react';
import { SavedItem, Hackathon, Internship } from '../types';

interface SavedItemsContextType {
  savedItems: SavedItem[];
  saveItem: (type: 'hackathon' | 'internship', item: Hackathon | Internship, priority?: boolean) => void;
  removeItem: (id: string) => void;
  togglePriority: (id: string) => void;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

export const useSavedItems = () => {
  const context = useContext(SavedItemsContext);
  if (!context) {
    throw new Error('useSavedItems must be used within SavedItemsProvider');
  }
  return context;
};

export const SavedItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage on mount
  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => {
    try {
      const stored = localStorage.getItem('savedItems');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert savedAt back to Date object
        return parsed.map((item: any) => ({ ...item, savedAt: new Date(item.savedAt) }));
      }
    } catch (e) {}
    return [];
  });

  // Persist to localStorage on change
  React.useEffect(() => {
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [savedItems]);

  const saveItem = (type: 'hackathon' | 'internship', item: Hackathon | Internship, priority = false) => {
    const existingItem = savedItems.find(saved => saved.id === item.id && saved.type === type);
    
    if (existingItem) {
      // Update priority if item already exists
      setSavedItems(prev => prev.map(saved => 
        saved.id === item.id && saved.type === type
          ? { ...saved, priority }
          : saved
      ));
    } else {
      // Add new item
      const newSavedItem: SavedItem = {
        id: item.id,
        type,
        item,
        savedAt: new Date(),
        priority
      };
      setSavedItems(prev => [...prev, newSavedItem]);
    }
  };

  const removeItem = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const togglePriority = (id: string) => {
    setSavedItems(prev => prev.map(item => 
      item.id === id ? { ...item, priority: !item.priority } : item
    ));
  };

  return (
    <SavedItemsContext.Provider value={{ savedItems, saveItem, removeItem, togglePriority }}>
      {children}
    </SavedItemsContext.Provider>
  );
};