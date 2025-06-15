/**
 * A custom implementation of GSAP's DrawSVG plugin functionality
 * This simulates the premium DrawSVG plugin by using stroke-dasharray and stroke-dashoffset
 * to create drawing animations for SVG paths
 */

import { gsap } from 'gsap';

// Register the custom plugin
gsap.registerPlugin({
  name: "drawSVG",
  init: function(target, values) {
    if (!target.getBBox) return false; // Only work with SVG elements
    
    // Get the path length
    let length = target.getTotalLength && target.getTotalLength();
    
    if (!length) {
      // If getTotalLength is not available, try to calculate from the bounding box
      try {
        const bbox = target.getBBox();
        // Approximation based on the perimeter of the bounding box
        length = (bbox.width + bbox.height) * 2;
      } catch (e) {
        console.warn("DrawSVG: Cannot determine path length for", target);
        return false;
      }
    }
    
    // Store original values if not already set
    if (!target._gsapDrawSVG) {
      target._gsapDrawSVG = {
        length: length,
        originalStroke: (target.getAttribute("stroke") || "none"),
        originalDasharray: (target.getAttribute("stroke-dasharray") || "none"),
        originalDashoffset: (target.getAttribute("stroke-dashoffset") || "0")
      };
    }
    
    // Set up the initial dasharray and offset for animation
    let start, end;
    
    // Convert drawSVG values to percentages/pixels
    if (values.drawSVG === "0%" || values.drawSVG === 0) {
      start = 0;
      end = 0;
    } else if (values.drawSVG === "100%" || values.drawSVG === "true" || values.drawSVG === true || values.drawSVG === 1) {
      start = 0;
      end = length;
    } else {
      // Parse values like "0% 50%" or "10% 90%"
      const parts = (values.drawSVG + "").split(" ");
      
      // If only one value is provided, assume starting from 0
      if (parts.length === 1) {
        start = 0;
        end = parseFloat(parts[0]) / 100 * length;
      } else {
        start = parseFloat(parts[0]) / 100 * length;
        end = parseFloat(parts[1]) / 100 * length;
      }
    }
    
    // Set the initial state for animation
    target.setAttribute("stroke-dasharray", length);
    target.setAttribute("stroke-dashoffset", length - start);
    
    // Store variables that will be animated
    this._length = length;
    this._target = target;
    this._start = start;
    this._end = end;
    
    return true;
  },
  
  // The actual animation logic
  render: function(progress, data) {
    const length = data._length;
    const target = data._target;
    const initialStart = data._start;
    const initialEnd = data._end;
    
    // Calculate the current start and end points based on progress
    const start = initialStart + (0 - initialStart) * progress;
    const end = initialEnd + (length - initialEnd) * progress;
    
    // Update the stroke-dasharray and stroke-dashoffset
    target.setAttribute("stroke-dasharray", (end - start) + "," + length);
    target.setAttribute("stroke-dashoffset", length - start);
  },
  
  // Cleanup function when animation completes
  kill: function(context) {
    const target = context._target;
    const stored = target._gsapDrawSVG;
    
    if (stored) {
      // Restore original attributes or set final state
      if (stored.originalDasharray !== "none") {
        target.setAttribute("stroke-dasharray", stored.originalDasharray);
      } else {
        target.removeAttribute("stroke-dasharray");
      }
      
      if (stored.originalDashoffset !== "0") {
        target.setAttribute("stroke-dashoffset", stored.originalDashoffset);
      } else {
        target.removeAttribute("stroke-dashoffset");
      }
    }
  }
});

/**
 * Helper function to create drawSVG animations
 * @param {Element|Array} targets - SVG element(s) to animate
 * @param {Object} vars - Animation variables
 * @returns {GSAPTween} The GSAP tween instance
 */
export const drawSVG = (targets, vars) => {
  return gsap.to(targets, { drawSVG: "100%", ...vars });
};

export default drawSVG;