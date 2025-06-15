import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedCursor = ({
  size = 24,
  color = '#369b6d', 
  trailColor = 'rgba(54, 155, 109, 0.2)',
  outlineWidth = 2,
  outlineColor = '#ffffff',
  blendMode = 'normal',
  trailLength = 8,
  clickScale = 0.6,
  hoverScale = 2.5,
  hoverElements = 'a, button, .hoverable',
}) => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const trailsRef = useRef([]);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Position tracking
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const trail = useRef(Array(trailLength).fill({ x: 0, y: 0 }));
  
  // Trail setup
  useEffect(() => {
    // Create trail elements
    const trailContainer = document.createElement('div');
    trailContainer.className = 'cursor-trails';
    trailContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9998;
    `;
    document.body.appendChild(trailContainer);
    
    // Create each trail dot
    const trailElements = [];
    for (let i = 0; i < trailLength; i++) {
      const trailDot = document.createElement('div');
      const scale = 1 - (i / trailLength) * 0.7;
      const opacity = 1 - (i / trailLength) * 0.8;
      
      trailDot.style.cssText = `
        position: fixed;
        width: ${size / 3}px;
        height: ${size / 3}px;
        transform: translate(-50%, -50%) scale(${scale});
        border-radius: 50%;
        background-color: ${trailColor};
        opacity: ${opacity};
        pointer-events: none;
        mix-blend-mode: ${blendMode};
        z-index: 9998;
        top: 0;
        left: 0;
        transition: opacity 0.1s ease;
      `;
      
      trailContainer.appendChild(trailDot);
      trailElements.push(trailDot);
    }
    
    trailsRef.current = trailElements;
    
    return () => {
      document.body.removeChild(trailContainer);
    };
  }, [size, trailColor, blendMode, trailLength]);
  
  // Mouse event handlers
  useEffect(() => {
    const onMouseMove = e => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };
    
    const onMouseLeave = () => {
      setIsVisible(false);
    };
    
    const onMouseDown = () => {
      setIsClicking(true);
    };
    
    const onMouseUp = () => {
      setIsClicking(false);
    };
    
    // Check if element is hoverable
    const handleElementHover = () => {
      const hoveredElement = document.elementFromPoint(
        mousePosition.current.x,
        mousePosition.current.y
      );
      
      if (!hoveredElement) return false;
      
      const isHoverable = hoveredElement.matches(hoverElements) ||
        hoveredElement.closest(hoverElements);
        
      setIsHovering(!!isHoverable);
      return !!isHoverable;
    };
    
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    // Set up animation loop
    const animate = (time) => {
      if (previousTimeRef.current === 0) {
        previousTimeRef.current = time;
      }
      
      const deltaTime = time - previousTimeRef.current;
      previousTimeRef.current = time;
      
      // Smooth cursor movement
      if (!cursorRef.current) return;
      
      // Calculate cursor position with easing
      cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x) * (deltaTime * 0.01);
      cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y) * (deltaTime * 0.01);
      
      // Update main cursor
      cursorRef.current.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0) scale(${isClicking ? clickScale : isHovering ? hoverScale : 1})`;
      
      // Update follower with slight delay
      if (followerRef.current) {
        const followerX = cursorPosition.current.x;
        const followerY = cursorPosition.current.y;
        followerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) scale(${isHovering ? 1.5 : 1})`;
      }
      
      // Update trail positions
      trail.current.unshift({ x: cursorPosition.current.x, y: cursorPosition.current.y });
      trail.current = trail.current.slice(0, trailLength);
      
      // Apply positions to trail elements
      trailsRef.current.forEach((dot, i) => {
        if (trail.current[i]) {
          dot.style.transform = `translate3d(${trail.current[i].x}px, ${trail.current[i].y}px, 0) scale(${1 - (i / trailLength) * 0.7})`;
          dot.style.opacity = isVisible ? (1 - (i / trailLength) * 0.8) : 0;
        }
      });
      
      // Check for hoverable elements
      handleElementHover();
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(requestRef.current);
    };
  }, [size, clickScale, hoverScale, hoverElements, isHovering, isClicking, trailLength]);
  
  return (
    <>
      <div
        ref={cursorRef}
        className="animated-cursor"
        style={{
          position: 'fixed',
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 0 ${outlineWidth}px ${outlineColor}`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          mixBlendMode: blendMode,
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          willChange: 'transform'
        }}
      />
      <div
        ref={followerRef}
        className="animated-cursor-follower"
        style={{
          position: 'fixed',
          width: `${size * 3}px`,
          height: `${size * 3}px`,
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: `1px solid ${color}`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: isVisible ? 0.3 : 0,
          transition: 'opacity 0.2s, width 0.3s, height 0.3s',
          willChange: 'transform'
        }}
      />
    </>
  );
};

export default AnimatedCursor;