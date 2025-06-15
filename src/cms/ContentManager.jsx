import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import EditableContent from './EditableContent';

const ContentManager = ({ onClose }) => {
  const { content, updateContent, resetContent } = useContent();
  const [localContent, setLocalContent] = useState({});
  const [activeSection, setActiveSection] = useState('hero');
  const [isSaved, setIsSaved] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Initialize local content from global content
  useEffect(() => {
    if (content) {
      setLocalContent(JSON.parse(JSON.stringify(content)));
    }
  }, [content]);

  // Handle change in form fields
  const handleChange = (sectionKey, fieldKey, value) => {
    setLocalContent(prev => {
      const newContent = { ...prev };
      
      if (!newContent[sectionKey]) {
        newContent[sectionKey] = {};
      }
      
      if (typeof fieldKey === 'string') {
        // Direct field update
        newContent[sectionKey][fieldKey] = value;
      } else if (Array.isArray(fieldKey)) {
        // Nested field update (for arrays and nested objects)
        let target = newContent[sectionKey];
        const lastIndex = fieldKey.length - 1;
        
        for (let i = 0; i < lastIndex; i++) {
          const key = fieldKey[i];
          if (typeof key === 'number') {
            if (!Array.isArray(target)) return prev;
          } else if (typeof target !== 'object') {
            return prev;
          }
          
          if (!target[key]) {
            target[key] = typeof fieldKey[i+1] === 'number' ? [] : {};
          }
          
          target = target[key];
        }
        
        target[fieldKey[lastIndex]] = value;
      }
      
      return newContent;
    });
    
    setIsSaved(false);
  };

  // Save changes
  const saveChanges = () => {
    updateContent(localContent);
    setIsSaved(true);
    
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  // Reset to default content
  const handleReset = async () => {
    const success = await resetContent();
    if (success) {
      setShowConfirmReset(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }
  };

  // Handle export of content
  const handleExport = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(content, null, 2)
    )}`;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'sinad_content.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Section navigation options
  const sections = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'features', label: 'EzyKube Features' },
    { id: 'contact', label: 'Contact Information' },
    { id: 'footer', label: 'Footer' },
    { id: 'navLinks', label: 'Navigation' },
  ];

  return (
    <div className="h-full overflow-auto">
      {/* Admin Panel Header */}
      <div className="sticky top-0 bg-black/95 backdrop-blur-md z-10 border-b border-emerald-500/30 py-4 px-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-emerald-400">
          Sinad.io Content Manager
        </h2>
        <div className="flex items-center space-x-4">
          {isSaved && (
            <span className="text-emerald-400 text-sm animate-fade-in">
              Changes saved successfully!
            </span>
          )}
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm font-medium"
          >
            Save Changes
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-transparent hover:bg-emerald-500/10 text-emerald-400 border border-emerald-500/40 rounded-md text-sm font-medium"
          >
            Export JSON
          </button>
          <button
            onClick={() => setShowConfirmReset(true)}
            className="px-4 py-2 bg-transparent hover:bg-red-500/10 text-red-400 border border-red-500/40 rounded-md text-sm font-medium"
          >
            Reset Content
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-900 border border-red-500/20 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">
              Reset Content?
            </h3>
            <p className="text-gray-300 mb-6">
              This will reset all content to the original default values. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 bg-transparent hover:bg-gray-800 text-gray-400 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Reset Content
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 border-r border-emerald-500/20 bg-black/80 p-4">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeSection === section.id
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'hover:bg-gray-800 text-gray-400'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Editor */}
        <div className="flex-1 p-6 overflow-auto">
          {localContent && (
            <EditableContent
              section={activeSection}
              content={localContent[activeSection] || {}}
              onChange={(fieldKey, value) =>
                handleChange(activeSection, fieldKey, value)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManager;