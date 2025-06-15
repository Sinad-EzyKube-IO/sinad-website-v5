import React from 'react';
import { useContent } from '../context/ContentContext';
import ScaleIn from './animations/ScaleIn';
import Section from './UI/Section';
import { FiClipboard, FiAward, FiSettings, FiUsers, FiTrendingUp, FiHeadphones } from 'react-icons/fi';

const WhySinad = () => {
  const { content, isLoaded } = useContent();
  
  // Return empty fragment if content is still loading or whySinad section doesn't exist
  if (!isLoaded || !content || !content.whySinad) {
    return <Section id="whySinad" className="bg-gray-900">
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-white">Loading content...</p>
      </div>
    </Section>;
  }
  
  const { whySinad } = content;

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'clarity': return <FiClipboard className="w-8 h-8 text-[#369b6d]" />;
      case 'experience': return <FiAward className="w-8 h-8 text-[#369b6d]" />;
      case 'solutions': return <FiSettings className="w-8 h-8 text-[#369b6d]" />;
      case 'partnership': return <FiUsers className="w-8 h-8 text-[#369b6d]" />;
      case 'innovation': return <FiTrendingUp className="w-8 h-8 text-[#369b6d]" />;
      case 'support': return <FiHeadphones className="w-8 h-8 text-[#369b6d]" />;
      default: return <FiClipboard className="w-8 h-8 text-[#369b6d]" />;
    }
  };

  return (
    <Section id="whySinad" className="bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {whySinad.title}
          </h2>
          <p className="text-xl md:text-2xl text-[#369b6d] mb-6">
            {whySinad.subtitle}
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {whySinad.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whySinad.reasons.map((reason, index) => (
            <ScaleIn key={reason.title} delay={index * 0.1}>
              <div className="bg-gray-800 rounded-lg p-6 h-full border-l-4 border-[#369b6d] hover:bg-gray-750 transition-all duration-300 transform hover:-translate-y-1">
                <div className="mb-4">
                  {getIconComponent(reason.icon)}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {reason.title}
                </h3>
                <p className="text-gray-300">
                  {reason.description}
                </p>
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default WhySinad;