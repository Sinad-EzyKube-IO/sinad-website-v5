import React, { createContext, useState, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Create context
const ContentContext = createContext();

// Provider component
export const ContentProvider = ({ children }) => {
  // Default content state loaded from local storage with fallback to null
  const [content, setContent] = useLocalStorage('sinad_content', null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch content from JSON file if not in local storage
  useEffect(() => {
    const fetchContent = async () => {
      if (content === null) {
        try {
          const response = await fetch('/data/content.json');
          const data = await response.json();
          setContent(data);
        } catch (error) {
          console.error('Failed to fetch content:', error);
          // Set empty content structure as fallback
          setContent({});
        } finally {
          setIsLoaded(true);
        }
      } else {
        setIsLoaded(true);
      }
    };

    fetchContent();
  }, [content, setContent]);

  // Update content handler
  const updateContent = (newContent) => {
    setContent(newContent);
  };

  // Reset content to original from JSON file
  const resetContent = async () => {
    try {
      const response = await fetch('/data/content.json');
      const data = await response.json();
      setContent(data);
      return true;
    } catch (error) {
      console.error('Failed to reset content:', error);
      return false;
    }
  };

  // Export options to consumer components
  const value = {
    content,
    updateContent,
    resetContent,
    isLoaded
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

// Custom hook for using the content context
export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export default ContentContext;