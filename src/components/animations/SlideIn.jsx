import React, { useEffect, useRef } from 'react';

const SlideIn = ({ 
  children, 
  direction = "left", 
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = ""
}) => {
  const ref = useRef(null);
  
  // Set initial transform based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'left':
        return 'translateX(-40px)';
      case 'right':
        return 'translateX(40px)';
      case 'up':
        return 'translateY(40px)';
      case 'down':
        return 'translateY(-40px)';
      default:
        return 'translateX(-30px)';
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // When element is in view, add the animation class
          setTimeout(() => {
            if (ref.current) {
              ref.current.style.opacity = '1';
              ref.current.style.transform = 'translate(0)';
              ref.current.style.filter = 'blur(0)';
            }
          }, delay * 1000);
          
          // Stop observing once animation is triggered
          observer.unobserve(entry.target);
        }
      },
      {
        threshold, // Percentage of element visible to trigger animation
        rootMargin: '0px 0px -50px 0px' // Adjust when animation triggers
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold, direction]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: getInitialTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.34, 1.56, 0.64, 1), transform ${duration}s cubic-bezier(0.34, 1.56, 0.64, 1), filter ${duration}s cubic-bezier(0.34, 1.56, 0.64, 1)`,
        filter: 'blur(2px)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        willChange: 'opacity, transform, filter',
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};

export default SlideIn;