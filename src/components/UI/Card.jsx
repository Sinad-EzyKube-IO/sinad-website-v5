import React from 'react';

const Card = ({ children, className = "" }) => {
  return (
    <div className={`
      bg-gradient-to-br from-gray-900 to-black 
      border border-emerald-500/20 
      rounded-xl p-6 
      shadow-lg shadow-emerald-500/5
      hover:shadow-emerald-500/15 
      transition-all duration-300
      hover:border-emerald-500/30
      hover:-translate-y-1
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;