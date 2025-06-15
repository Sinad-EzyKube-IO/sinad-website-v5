import React, { useEffect, useRef } from 'react';

const ScaleIn = ({ children, delay = 0, className = '', threshold = 0.1, duration = 0.7 }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (ref.current) {
              ref.current.style.opacity = '1';
              ref.current.style.transform = 'scale(1)';
              ref.current.style.filter = 'blur(0)';
            }
          }, delay * 1000);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold,
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
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: 'scale(0.92)',
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

export default ScaleIn;