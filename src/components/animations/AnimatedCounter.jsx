import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = ({ 
  value = 0, 
  decimals = 0, 
  duration = 2, 
  prefix = '', 
  suffix = '',
  useCommas = false,
  className = '',
  threshold = 0.5,
  triggerOnce = true,
  color = '#369b6d'
}) => {
  const counterRef = useRef(null);
  const counterValueRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Format number with commas if needed
  const formatNumber = (num) => {
    if (useCommas) {
      return num.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }
    return num.toFixed(decimals);
  };

  useEffect(() => {
    const counter = counterRef.current;
    if (!counter) return;

    const animate = () => {
      // Only animate once the element is visible
      if (!isVisible) return;
      
      // Reset counter value for animation
      counterValueRef.current = 0;

      // Animate counter from 0 to final value
      gsap.to(counterValueRef, {
        current: value,
        duration: duration,
        ease: "power2.out",
        onUpdate: () => {
          if (counter) {
            counter.textContent = `${prefix}${formatNumber(counterValueRef.current)}${suffix}`;
          }
        }
      });
    };

    // Set up scroll trigger to animate when the counter comes into view
    const scrollTrigger = ScrollTrigger.create({
      trigger: counter,
      start: "top 80%",
      onEnter: () => {
        setIsVisible(true);
        animate();
      },
      onEnterBack: () => {
        if (!triggerOnce) {
          setIsVisible(true);
          animate();
        }
      },
      onLeave: () => {
        if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      onLeaveBack: () => {
        if (!triggerOnce) {
          setIsVisible(false);
        }
      }
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [value, duration, decimals, prefix, suffix, useCommas, threshold, triggerOnce]);

  return (
    <div className={`animated-counter-container ${className}`}>
      <span 
        ref={counterRef}
        className="animated-counter-value"
        style={{
          display: 'inline-block',
          color: color,
          fontWeight: 'bold',
          transition: 'color 0.3s ease'
        }}
      >
        {`${prefix}0${suffix}`}
      </span>
    </div>
  );
};

export default AnimatedCounter;