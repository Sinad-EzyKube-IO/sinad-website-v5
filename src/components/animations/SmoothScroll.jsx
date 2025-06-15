import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const SmoothScroll = ({ children }) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const smoothScrollOptions = useRef({
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  });

  // Set up the smooth scrolling effect
  useLayoutEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    
    // Initialize container height
    const setHeight = () => {
      document.body.style.height = `${scroller.getBoundingClientRect().height}px`;
    };

    // Update on resize
    window.addEventListener('resize', setHeight);
    setHeight();

    // Animation loop for smooth scrolling
    const smoothScroll = gsap.ticker.add(() => {
      const options = smoothScrollOptions.current;
      options.current = window.scrollY;
      options.previous += (options.current - options.previous) * options.ease;
      options.rounded = Math.round(options.previous * 100) / 100;
      
      // Apply the transformed position using GSAP
      gsap.to(scroller, {
        y: -options.rounded,
        duration: 0,
        ease: 'power4.out',
      });
    });

    // Handle anchor link clicks for smooth navigation
    const handleAnchorClick = (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href');
        const element = document.querySelector(id);
        
        if (element) {
          // Smooth scroll to the section
          gsap.to(window, {
            duration: 1.5,
            scrollTo: {
              y: element,
              offsetY: 50,
            },
            ease: 'power4.inOut',
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Clean up event listeners and animations
    return () => {
      gsap.ticker.remove(smoothScroll);
      window.removeEventListener('resize', setHeight);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="smooth-scroll-container" ref={containerRef}>
      <div className="smooth-scroll-content" ref={scrollerRef}>
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;