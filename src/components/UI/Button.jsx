import React from 'react';

const Button = ({ 
  children, 
  href, 
  onClick, 
  primary = false, 
  fullWidth = false, 
  type = "button", 
  className = "" 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center px-6 py-3 
    border border-transparent font-medium rounded-md 
    shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 
    focus:ring-[#369b6d] transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg hover:shadow-[#369b6d]/20
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;
  
  const primaryClasses = `
    bg-[#369b6d] hover:bg-[#2d8a5f] text-white font-semibold
    hover:shadow-[#369b6d]/30
  `;
  
  const secondaryClasses = `
    bg-transparent hover:bg-[#369b6d]/10 
    text-[#369b6d] hover:text-[#369b6d]/80 
    border border-[#369b6d]/40 hover:border-[#369b6d]
  `;
  
  const buttonClasses = `${baseClasses} ${primary ? primaryClasses : secondaryClasses}`;
  
  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {children}
      </a>
    );
  }
  
  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;