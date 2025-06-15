import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';

/**
 * MouseTracker component that tracks mouse movement and applies 3D transformations
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to apply mouse tracking effect to
 * @param {number} props.trackSpeed - Speed of the mouse tracking effect (0.1 to 0.5 recommended)
 * @param {number} props.rotationFactor - Factor to multiply rotation by (0.01 to 0.1 recommended)
 * @param {number} props.maxRotation - Maximum rotation in degrees
 * @param {number} props.perspective - CSS perspective value in pixels
 * @param {boolean} props.invert - Whether to invert the rotation direction
 */
const MouseTracker = ({ 
  children,
  trackSpeed = 0.1,
  rotationFactor = 0.03,
  maxRotation = 10,
  perspective = 1000,
  invert = false
}) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let requestId;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    
    const handleMouseMove = (e) => {
      if (!isHovering && !e.target.closest('.card-3d')) return;
      
      // Calculate mouse position relative to the container center
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + dimensions.width / 2;
      const centerY = rect.top + dimensions.height / 2;
      
      // Calculate normalized position (-1 to 1)
      let normalizedX = (e.clientX - centerX) / (dimensions.width / 2);
      let normalizedY = (e.clientY - centerY) / (dimensions.height / 2);
      
      // Invert if needed
      if (invert) {
        normalizedX *= -1;
        normalizedY *= -1;
      }
      
      // Apply rotation factor and limit to max rotation
      targetRotateX = Math.max(Math.min(normalizedY * maxRotation * rotationFactor * 100, maxRotation), -maxRotation);
      targetRotateY = Math.max(Math.min(normalizedX * maxRotation * rotationFactor * 100, maxRotation), -maxRotation);
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      // Reset rotation gradually
      targetRotateX = 0;
      targetRotateY = 0;
    };
    
    const handleMouseEnter = () => {
      setIsHovering(true);
    };
    
    const updateAnimation = () => {
      // Smoothly interpolate current rotation towards target rotation
      currentRotateX += (targetRotateX - currentRotateX) * trackSpeed;
      currentRotateY += (targetRotateY - currentRotateY) * trackSpeed;
      
      // Apply the transformation
      gsap.set(container, {
        rotateX: currentRotateX,
        rotateY: currentRotateY,
      });
      
      requestId = requestAnimationFrame(updateAnimation);
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);
    
    requestId = requestAnimationFrame(updateAnimation);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(requestId);
    };
  }, [dimensions, isHovering, invert, maxRotation, rotationFactor, trackSpeed]);
  
  return (
    <div 
      ref={containerRef}
      className="group"
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: `${perspective}px`,
        transformOrigin: 'center center',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

MouseTracker.propTypes = {
  children: PropTypes.node.isRequired,
  trackSpeed: PropTypes.number,
  rotationFactor: PropTypes.number,
  maxRotation: PropTypes.number,
  perspective: PropTypes.number,
  invert: PropTypes.bool
};

export default MouseTracker;