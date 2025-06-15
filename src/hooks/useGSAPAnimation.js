import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for creating GSAP animations with various effects
 */
export const useGSAPAnimation = ({
  target, // Reference to the target element(s)
  type = 'fade', // Animation type: 'fade', 'slide', 'scale', 'rotate', 'path'
  trigger, // Trigger element (defaults to target)
  start = 'top 80%', // ScrollTrigger start position
  end = 'bottom 20%', // ScrollTrigger end position
  scrub = false, // Whether animation should be tied to scroll position
  duration = 1, // Animation duration in seconds
  delay = 0, // Animation delay in seconds
  stagger = 0, // Stagger delay for multiple elements
  direction = 'up', // Direction for slide animations: 'up', 'down', 'left', 'right'
  distance = 100, // Distance for slide animations in pixels
  scale = [0.8, 1], // Scale values for scale animations [from, to]
  opacity = [0, 1], // Opacity values [from, to]
  rotation = [0, 0], // Rotation values in degrees [from, to]
  ease = 'power3.out', // GSAP easing function
  markers = false, // Show ScrollTrigger markers (for debugging)
  pin = false, // Pin the element during animation
  toggleActions = 'play none none none', // ScrollTrigger toggle actions
  once = true, // Whether animation should only play once
}) => {
  const animationRef = useRef(null);
  const timelineRef = useRef(null);
  
  // Clean up function to kill any active timelines and scroll triggers
  const cleanup = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === (trigger || target)) {
        trigger.kill();
      }
    });
  }, [target, trigger]);
  
  // Function to create and run the animation
  const createAnimation = useCallback(() => {
    if (!target || !target.current) return;
    
    cleanup();
    
    const tl = gsap.timeline({
      delay,
      paused: !scrub,
      scrollTrigger: {
        trigger: trigger?.current || target.current,
        start,
        end,
        scrub: scrub ? 1 : false, // Smooth scrubbing
        markers,
        pin: pin && (trigger?.current || target.current),
        pinSpacing: pin,
        toggleActions: once ? 'play none none none' : toggleActions,
        onEnter: () => !scrub && tl.play(),
      },
    });
    
    timelineRef.current = tl;
    
    // Configure animation based on animation type
    switch (type) {
      case 'fade':
        tl.fromTo(
          target.current,
          { autoAlpha: opacity[0] },
          { 
            autoAlpha: opacity[1], 
            duration, 
            ease, 
            stagger 
          }
        );
        break;
        
      case 'slide':
        let fromVars = { autoAlpha: opacity[0] };
        let toVars = { autoAlpha: opacity[1], duration, ease, stagger };
        
        // Set transform properties based on direction
        if (direction === 'up') {
          fromVars.y = distance;
          toVars.y = 0;
        } else if (direction === 'down') {
          fromVars.y = -distance;
          toVars.y = 0;
        } else if (direction === 'left') {
          fromVars.x = distance;
          toVars.x = 0;
        } else if (direction === 'right') {
          fromVars.x = -distance;
          toVars.x = 0;
        }
        
        tl.fromTo(target.current, fromVars, toVars);
        break;
        
      case 'scale':
        tl.fromTo(
          target.current,
          { 
            autoAlpha: opacity[0],
            scale: scale[0] 
          },
          { 
            autoAlpha: opacity[1],
            scale: scale[1],
            duration,
            ease,
            stagger
          }
        );
        break;
        
      case 'rotate':
        tl.fromTo(
          target.current,
          {
            autoAlpha: opacity[0],
            rotation: rotation[0],
          },
          {
            autoAlpha: opacity[1],
            rotation: rotation[1],
            duration,
            ease,
            stagger
          }
        );
        break;
        
      case 'path':
        if (target.current.getTotalLength) {
          const pathLength = target.current.getTotalLength();
          
          tl.fromTo(
            target.current,
            {
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength
            },
            {
              strokeDashoffset: 0,
              duration,
              ease,
            }
          );
        }
        break;
        
      default:
        // Default fade animation
        tl.fromTo(
          target.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration, ease, stagger }
        );
    }
    
    return tl;
  }, [target, type, trigger, start, end, scrub, duration, delay, stagger, 
      direction, distance, scale, opacity, rotation, ease, markers, pin,
      toggleActions, once]);
  
  // Set up the animation when the component mounts or dependencies change
  useEffect(() => {
    if (!target || !target.current) return;
    
    animationRef.current = createAnimation();
    
    return () => {
      cleanup();
    };
  }, [target, createAnimation, cleanup]);
  
  // Return methods to control the animation
  return {
    play: () => timelineRef.current?.play(),
    pause: () => timelineRef.current?.pause(),
    reset: () => {
      timelineRef.current?.kill();
      createAnimation();
    },
    timeline: timelineRef.current,
  };
};

export default useGSAPAnimation;