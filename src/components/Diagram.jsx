import React, { useState, useEffect, useContext, useRef } from 'react';
import ContentContext from '../context/ContentContext';
import Section from './UI/Section';
import FadeIn from './animations/FadeIn';
import SlideIn from './animations/SlideIn';
import { gsap } from 'gsap';
import '../utils/drawSVGPlugin';

const Diagram = () => {
  const { content, isLoaded } = useContext(ContentContext);
  const [isVisible, setIsVisible] = useState(false);
  const diagramRef = useRef(null);
  const svgRef = useRef(null);
  const timelineRef = useRef(null);

  // Animation timeline setup
  useEffect(() => {
    if (!isVisible || !svgRef.current) return;

    // Create new timeline
    timelineRef.current = gsap.timeline({
      defaults: { duration: 0.8, ease: 'power2.out' }
    });

    const tl = timelineRef.current;

    // Animate elements in sequence
    tl.fromTo('#users-box', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1 }
    )
    .fromTo('#ezykube-box', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1 }, 
      '-=0.5'
    )
    .fromTo('#kubernetes-box', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1 }, 
      '-=0.5'
    )
    .fromTo('#cloud-box', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1 }, 
      '-=0.5'
    )
    .fromTo('#monitoring-box', 
      { x: 30, opacity: 0 }, 
      { x: 0, opacity: 1 }, 
      '-=0.5'
    )
    .fromTo('#apps-box', 
      { x: -30, opacity: 0 }, 
      { x: 0, opacity: 1 }, 
      '-=0.7'
    )
    .fromTo('.connection-line', 
      { drawSVG: "0%" }, 
      { drawSVG: "100%" }, 
      '-=0.5'
    )
    .fromTo('.data-flow', 
      { strokeDashoffset: 200 }, 
      { strokeDashoffset: 0, duration: 1.5, repeat: -1 }, 
      '-=0.2'
    );

    // Pulse animations for key components
    gsap.to('#ezykube-pulse', {
      scale: 1.1,
      opacity: 0.7,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Add hover interactions for boxes
    const boxes = document.querySelectorAll('.diagram-box');
    boxes.forEach(box => {
      box.addEventListener('mouseenter', () => {
        gsap.to(box, {
          scale: 1.05,
          boxShadow: '0 8px 30px rgba(0, 255, 153, 0.3)',
          duration: 0.3
        });
      });
      
      box.addEventListener('mouseleave', () => {
        gsap.to(box, {
          scale: 1,
          boxShadow: '0 4px 20px rgba(0, 255, 153, 0.1)',
          duration: 0.3
        });
      });
    });

    // Clean up animations
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      gsap.killTweensOf('.diagram-box');
      gsap.killTweensOf('#ezykube-pulse');
      gsap.killTweensOf('.data-flow');
    };
  }, [isVisible]);

  // Intersection observer to trigger animations when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (diagramRef.current) {
      observer.observe(diagramRef.current);
    }

    return () => {
      if (diagramRef.current) {
        observer.unobserve(diagramRef.current);
      }
    };
  }, []);

  if (!isLoaded || !content || !content.diagram) {
    return (
      <Section id="diagram" className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-[500px]">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-800 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  const { title, subtitle, description, elements } = content.diagram;

  return (
    <Section id="diagram" className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <SlideIn direction="down">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-700 inline-block text-transparent bg-clip-text">
                {title}
              </h2>
            </SlideIn>
            <h3 className="text-xl text-gray-400 mb-6">{subtitle}</h3>
            <p className="max-w-2xl mx-auto text-gray-300">{description}</p>
          </div>
        </FadeIn>

        <div className="relative" ref={diagramRef}>
          <svg 
            ref={svgRef}
            className="w-full h-auto max-h-[800px] min-h-[500px]" 
            viewBox="0 0 900 600" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background gradient */}
            <defs>
              <linearGradient id="bg-gradient" x1="0" y1="0" x2="900" y2="600" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#050b12" />
                <stop offset="100%" stopColor="#070e1a" />
              </linearGradient>
              
              <linearGradient id="glow-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ff99" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00ff99" stopOpacity="0" />
              </linearGradient>
              
              {/* Filter for the glow effect */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feComposite in="blur" in2="SourceGraphic" operator="over" />
              </filter>
              
              {/* Arrow marker for flow lines */}
              <marker 
                id="arrowhead" 
                markerWidth="10" 
                markerHeight="7" 
                refX="9" 
                refY="3.5" 
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#00ff99" />
              </marker>
              
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="none" />
                <path d="M 20 0 L 0 0 0 20" stroke="#182131" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            
            {/* Background with grid pattern */}
            <rect width="900" height="600" fill="url(#bg-gradient)" />
            <rect width="900" height="600" fill="url(#grid)" />
            
            {/* Connection lines between components */}
            <path 
              className="connection-line" 
              d="M 350 150 L 450 150 L 450 200" 
              stroke="#00ff99" 
              strokeWidth="2" 
              strokeOpacity="0.6"
              strokeDasharray="5,5" 
            />
            
            <path 
              className="connection-line" 
              d="M 450 300 L 450 350" 
              stroke="#00ff99" 
              strokeWidth="2" 
              strokeOpacity="0.6" 
              strokeDasharray="5,5"
            />
            
            <path 
              className="connection-line" 
              d="M 450 450 L 450 500" 
              stroke="#00ff99" 
              strokeWidth="2" 
              strokeOpacity="0.6" 
              strokeDasharray="5,5"
            />
            
            <path 
              className="connection-line" 
              d="M 550 250 L 650 250" 
              stroke="#00ff99" 
              strokeWidth="2" 
              strokeOpacity="0.6" 
              strokeDasharray="5,5"
            />
            
            <path 
              className="connection-line" 
              d="M 350 250 L 250 250" 
              stroke="#00ff99" 
              strokeWidth="2" 
              strokeOpacity="0.6" 
              strokeDasharray="5,5"
            />

            {/* Data flow animations */}
            <path 
              className="data-flow" 
              d="M 350 150 L 450 150 L 450 200" 
              stroke="#00ff99" 
              strokeWidth="2"
              strokeDasharray="6,10"
              strokeDashoffset="0"
              markerEnd="url(#arrowhead)" 
            />
            
            <path 
              className="data-flow" 
              d="M 450 300 L 450 350" 
              stroke="#00ff99" 
              strokeWidth="2"
              strokeDasharray="6,10"
              strokeDashoffset="0"
              markerEnd="url(#arrowhead)" 
            />
            
            <path 
              className="data-flow" 
              d="M 450 450 L 450 500" 
              stroke="#00ff99" 
              strokeWidth="2"
              strokeDasharray="6,10"
              strokeDashoffset="0"
              markerEnd="url(#arrowhead)" 
            />
            
            <path 
              className="data-flow" 
              d="M 550 250 L 650 250" 
              stroke="#00ff99" 
              strokeWidth="2"
              strokeDasharray="6,10"
              strokeDashoffset="0"
              markerEnd="url(#arrowhead)" 
            />
            
            <path 
              className="data-flow" 
              d="M 350 250 L 250 250" 
              stroke="#00ff99" 
              strokeWidth="2"
              strokeDasharray="6,10"
              strokeDashoffset="0" 
              markerEnd="url(#arrowhead)"
            />
            
            {/* Glow effect for EzyKube */}
            <circle 
              id="ezykube-pulse"
              cx="450" 
              cy="250" 
              r="100" 
              fill="url(#glow-gradient)" 
              opacity="0.3"
              filter="url(#glow)" 
            />
            
            {/* Component boxes */}
            <g id="users-box" className="diagram-box">
              <rect x="200" y="100" width="150" height="100" rx="10" 
                fill="#111927" stroke="#00ff99" strokeWidth="2" />
              <text x="275" y="140" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">
                {elements[0]?.title || "Users & Developers"}
              </text>
              <text x="275" y="165" textAnchor="middle" fill="#a0aec0" fontSize="12">
                {elements[0]?.description || "Your technical and business teams"}
              </text>
              <circle cx="230" cy="135" r="15" fill="#00ff99" fillOpacity="0.2" />
              <path d="M 225 135 L 235 135 M 230 130 L 230 140" stroke="#00ff99" strokeWidth="2" />
            </g>
            
            <g id="ezykube-box" className="diagram-box">
              <rect x="375" y="200" width="150" height="100" rx="10" 
                fill="#111927" stroke="#00ff99" strokeWidth="2" />
              <text x="450" y="240" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">
                {elements[1]?.title || "EzyKube Platform"}
              </text>
              <text x="450" y="265" textAnchor="middle" fill="#a0aec0" fontSize="12">
                {elements[1]?.description || "Our centralized management solution"}
              </text>
              <rect x="405" y="225" width="10" height="10" fill="#00ff99" />
              <rect x="425" y="225" width="10" height="10" fill="#00ff99" />
              <rect x="445" y="225" width="10" height="10" fill="#00ff99" />
              <rect x="465" y="225" width="10" height="10" fill="#00ff99" />
              <rect x="485" y="225" width="10" height="10" fill="#00ff99" />
            </g>
            
            <g id="kubernetes-box" className="diagram-box">
              <rect x="375" y="350" width="150" height="100" rx="10" 
                fill="#111927" stroke="#00ff99" strokeWidth="2" />
              <text x="450" y="390" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">
                {elements[2]?.title || "Kubernetes Clusters"}
              </text>
              <text x="450" y="415" textAnchor="middle" fill="#a0aec0" fontSize="12">
                {elements[2]?.description || "Managed container orchestration"}
              </text>
              <path d="M 430 380 L 470 380" stroke="#00ff99" strokeWidth="2" />
              <circle cx="430" cy="380" r="5" fill="#00ff99" />
              <circle cx="450" cy="380" r="5" fill="#00ff99" />
              <circle cx="470" cy="380" r="5" fill="#00ff99" />
            </g>
            
            <g id="cloud-box" className="diagram-box">
              <rect x="375" y="500" width="150" height="100" rx="10" 
                fill="#111927" stroke="#00ff99" strokeWidth="2" />
              <text x="450" y="540" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">
                {elements[3]?.title || "Cloud Infrastructure"}
              </text>
              <text x="450" y="565" textAnchor="middle" fill="#a0aec0" fontSize="12">
                {elements[3]?.description || "AWS, Azure, GCP, and hybrid environments"}
              </text>
              <path d="M 420 530 
                       Q 425 520, 435 525
                       Q 445 510, 455 525
                       Q 465 515, 475 525
                       L 475 540 L 420 540 Z" 
                fill="none" stroke="#00ff99" strokeWidth="1.5" />
            </g>
            
            <g id="monitoring-box" className="diagram-box">
              <rect x="650" y="200" width="150" height="100" rx="10" 
                fill="#111927" stroke="#00ff99" strokeWidth="2" />
              <text x="725" y="240" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">
                {elements[4]?.title || "Monitoring & Security"}
              </text>
              <text x="725" y="265" textAnchor="middle" fill="#a0aec0" fontSize="12">
                {elements[4]?.description || "End-to-end observability and protection"}
              </text>
              <path d="M 700 230 
                       L 750 230
                       M 700 240 
                       L 750 240
                       M 700 250 
                       L 750 250" 
                stroke="#00ff99" strokeWidth="1.5" strokeDasharray="1,2" />
              <circle cx="710" cy="230" r="3" fill="#00ff99" />
              <circle cx="740" cy="240" r="3" fill="#00ff99" />
              <circle cx="720" cy="250" r="3" fill="#00ff99" />
            </g>
            
            <g id="apps-box" className="diagram-box">
              <rect x="100" y="200" width="150" height="100" rx="10" 
                fill="#111927" stroke="#00ff99" strokeWidth="2" />
              <text x="175" y="240" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">
                {elements[5]?.title || "Your Applications"}
              </text>
              <text x="175" y="265" textAnchor="middle" fill="#a0aec0" fontSize="12">
                {elements[5]?.description || "Business services and workloads"}
              </text>
              <rect x="135" y="225" width="20" height="20" rx="2" fill="none" stroke="#00ff99" strokeWidth="1.5" />
              <rect x="165" y="225" width="20" height="20" rx="2" fill="none" stroke="#00ff99" strokeWidth="1.5" />
              <rect x="135" y="255" width="20" height="20" rx="2" fill="none" stroke="#00ff99" strokeWidth="1.5" />
              <rect x="165" y="255" width="20" height="20" rx="2" fill="none" stroke="#00ff99" strokeWidth="1.5" />
            </g>
          </svg>
          
          {/* Labels for the diagram */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="container mx-auto h-full relative">
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 p-3 rounded-lg text-xs text-gray-400 border border-gray-800">
                <p className="mb-1 font-medium text-green-400">Legend:</p>
                <div className="flex items-center mb-1">
                  <span className="w-3 h-0 border-t-2 border-green-400 border-dashed inline-block mr-2"></span>
                  <span>Connection</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-0 border-t-2 border-green-400 inline-block mr-2"></span>
                  <span>Data Flow</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FadeIn>
          <div className="text-center mt-12">
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our solution architecture provides seamless integration between your development teams, cloud infrastructure,
              and application layers through our centralized EzyKube platform.
            </p>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
};

export default Diagram;