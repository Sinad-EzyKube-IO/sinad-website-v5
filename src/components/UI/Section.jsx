import React from 'react';

const Section = ({ id, className = "", children }) => {
  return (
    <section 
      id={id} 
      className={`py-24 overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;