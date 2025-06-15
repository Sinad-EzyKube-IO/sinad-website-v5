import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';

/**
 * ParallaxEffect component for creating parallax scrolling effects
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to apply parallax effect to
 * @param {number} props.speed - Speed of parallax effect (0.1 to 0.5 recommended)
 * @param {'vertical'|'horizontal'|'both'} props.direction - Direction of parallax effect
 * @param {Object} props.style - Additional styles for the container
 */
const ParallaxEffect = ({ children, speed = 0.1, direction = 'vertical', style = {} }) => {
  const elementRef = useRef(null);
  const initialPositionRef = useRef(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Store the initial position for reference
    initialPositionRef.current = {
      top: element.offsetTop,
      left: element.offsetLeft
    };
    
    const handleParallax = () => {
      const scrollPosition = window.scrollY;
      
      if (direction === 'vertical' || direction === 'both') {
        gsap.to(element, {
          y: scrollPosition * speed,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
      
      if (direction === 'horizontal' || direction === 'both') {
        // For horizontal parallax, we'll use mouse position
        const mouseX = window.innerWidth / 2 - (window.mouseX || 0);
        gsap.to(element, {
          x: mouseX * speed * 0.05,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
    };
    
    // Handle mouse move for horizontal parallax
    const handleMouseMove = (e) => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;
      if (direction === 'horizontal' || direction === 'both') {
        handleParallax();
      }
    };
    
    window.addEventListener('scroll', handleParallax);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial positioning
    handleParallax();
    
    return () => {
      window.removeEventListener('scroll', handleParallax);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [speed, direction]);
  
  return (
    <div 
      ref={elementRef}
      style={{
        position: 'relative',
        willChange: 'transform',
        ...style
      }}
    >
      {children}
    </div>
  );
};

ParallaxEffect.propTypes = {
  children: PropTypes.node.isRequired,
  speed: PropTypes.number,
  direction: PropTypes.oneOf(['vertical', 'horizontal', 'both']),
  style: PropTypes.object
};

export default ParallaxEffect;