import { gsap } from 'gsap';

/**
 * Creates a text reveal animation effect
 * @param {HTMLElement} element - Element to apply animation to
 * @param {Object} options - Animation options
 * @returns {Function} - Cleanup function
 */
export const textReveal = (element, options = {}) => {
  const {
    duration = 0.8,
    staggerAmount = 0.03,
    startDelay = 0.2,
    ease = "power3.out"
  } = options;

  if (!element) return () => {};

  // Split text into spans for each character if not already done
  if (!element.dataset.textSplit) {
    const originalText = element.textContent.trim();
    const chars = originalText.split('');
    
    element.innerHTML = '';
    element.dataset.textSplit = 'true';
    
    chars.forEach(char => {
      const span = document.createElement('span');
      span.className = 'text-reveal-char';
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(25px) rotateX(45deg)';
      span.style.transformOrigin = 'center center';
      span.textContent = char === ' ' ? '\u00A0' : char;
      element.appendChild(span);
    });
  }
  
  // Animate each character
  const chars = element.querySelectorAll('.text-reveal-char');
  const tl = gsap.timeline();
  
  tl.to(chars, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration,
    stagger: staggerAmount,
    ease,
    delay: startDelay,
  });
  
  return () => {
    tl.kill();
  };
};

/**
 * Creates a magnetic effect on an element
 * @param {HTMLElement} element - Element to apply magnetic effect to
 * @param {Object} options - Magnetic effect options
 * @returns {Function} - Cleanup function
 */
export const createMagneticEffect = (element, options = {}) => {
  if (!element) return null;
  
  const {
    strength = 40,
    radius = 400,
    scale = 1.05
  } = options;
  
  let isHovering = false;
  let bounds = {};
  
  const setTransform = (x, y) => {
    // Calculate distance from mouse to center of element
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    
    // Calculate distance from mouse to center of element
    const distance = Math.sqrt(
      Math.pow(x - centerX, 2) + 
      Math.pow(y - centerY, 2)
    );
    
    // Only apply effect if mouse is within radius
    if (distance < radius) {
      // Calculate strength based on distance (closer = stronger)
      const strengthFactor = 1 - Math.min(distance / radius, 1);
      
      // Calculate magnetic pull (movement towards mouse)
      const pullX = (x - centerX) * strengthFactor * (strength / 100);
      const pullY = (y - centerY) * strengthFactor * (strength / 100);
      
      gsap.to(element, {
        x: pullX,
        y: pullY,
        scale: scale * strengthFactor + (1 - strengthFactor),
        duration: 0.35,
        ease: "power2.out"
      });
    } else if (isHovering) {
      // Reset position if outside radius but was previously hovering
      resetPosition();
    }
  };
  
  const resetPosition = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)"
    });
    isHovering = false;
  };
  
  const handleMouseMove = (e) => {
    setTransform(e.clientX, e.clientY);
    isHovering = true;
  };
  
  const handleMouseLeave = () => {
    resetPosition();
  };
  
  const updateBounds = () => {
    bounds = element.getBoundingClientRect();
  };
  
  // Initial setup
  updateBounds();
  
  // Add event listeners
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', updateBounds);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', updateBounds);
    element.removeEventListener('mouseleave', handleMouseLeave);
    gsap.set(element, { clearProps: 'all' });
  };
};

/**
 * Creates a glitch text effect
 * @param {HTMLElement} element - Element to apply glitch to 
 * @param {Object} options - Glitch options
 * @returns {Function} - Cleanup function
 */
export const createGlitchEffect = (element, options = {}) => {
  if (!element) return null;
  
  const {
    intensity = 10,
    duration = 0.2,
    interval = 4,
    colors = ['#369b6d', '#ff3333', '#0066ff']
  } = options;
  
  let animating = false;
  let intervalId = null;
  
  // Create glitch elements
  const createGlitchElements = () => {
    const container = document.createElement('div');
    container.className = 'glitch-container';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.overflow = 'hidden';
    container.style.pointerEvents = 'none';
    
    // Create layers
    colors.forEach((color, i) => {
      const layer = document.createElement('div');
      layer.className = `glitch-layer glitch-layer-${i}`;
      layer.style.position = 'absolute';
      layer.style.top = '0';
      layer.style.left = '0';
      layer.style.width = '100%';
      layer.style.height = '100%';
      layer.style.color = color;
      layer.style.mixBlendMode = 'multiply';
      layer.textContent = element.textContent;
      container.appendChild(layer);
    });
    
    element.style.position = 'relative';
    element.appendChild(container);
  };
  
  // Animate glitch effect
  const animate = () => {
    if (!animating) return;
    
    const layers = element.querySelectorAll('.glitch-layer');
    
    layers.forEach((layer, i) => {
      const xPos = Math.random() * intensity - intensity / 2;
      const yPos = Math.random() * intensity - intensity / 2;
      
      gsap.to(layer, {
        x: xPos,
        y: yPos,
        skewX: Math.random() * intensity / 10,
        duration: duration,
        onComplete: () => {
          gsap.to(layer, {
            x: 0,
            y: 0,
            skewX: 0,
            duration: duration * 1.5
          });
        }
      });
    });
  };
  
  const startGlitch = () => {
    animating = true;
    createGlitchElements();
    animate();
    
    // Set up interval for repeated glitches
    intervalId = setInterval(() => {
      animate();
    }, interval * 1000);
  };
  
  const stopGlitch = () => {
    animating = false;
    clearInterval(intervalId);
    
    // Remove glitch elements
    const container = element.querySelector('.glitch-container');
    if (container) {
      element.removeChild(container);
    }
  };
  
  return {
    start: startGlitch,
    stop: stopGlitch,
    cleanup: stopGlitch
  };
};

/**
 * Create a shimmer effect on elements
 * @param {HTMLElement} element - Element to apply shimmer to
 * @param {Object} options - Shimmer options
 * @returns {Function} - Cleanup function
 */
export const createShimmerEffect = (element, options = {}) => {
  if (!element) return null;
  
  const {
    duration = 2,
    delay = 0,
    angle = 45,
    baseColor = 'rgba(255,255,255,0.1)',
    shimmerColor = 'rgba(255,255,255,0.8)'
  } = options;
  
  // Add a pseudo-element for the shimmer effect
  const shimmer = document.createElement('div');
  shimmer.className = 'shimmer-effect';
  shimmer.style.position = 'absolute';
  shimmer.style.top = '0';
  shimmer.style.left = '-100%';
  shimmer.style.width = '50%';
  shimmer.style.height = '100%';
  shimmer.style.background = `linear-gradient(${angle}deg, ${baseColor}, ${shimmerColor}, ${baseColor})`;
  shimmer.style.transform = 'skewX(-20deg)';
  shimmer.style.pointerEvents = 'none';
  
  // Set parent element position to relative if not already
  if (getComputedStyle(element).position === 'static') {
    element.style.position = 'relative';
  }
  
  element.style.overflow = 'hidden';
  element.appendChild(shimmer);
  
  // Animate the shimmer
  const animate = () => {
    gsap.fromTo(shimmer, 
      { x: '-100%' },
      { 
        x: '200%', 
        duration: duration, 
        delay: delay,
        ease: 'power2.inOut',
        onComplete: animate,
      }
    );
  };
  
  animate();
  
  return () => {
    if (element.contains(shimmer)) {
      element.removeChild(shimmer);
    }
    gsap.killTweensOf(shimmer);
  };
};