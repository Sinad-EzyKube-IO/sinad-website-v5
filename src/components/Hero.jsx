import React, { useEffect, useRef } from 'react';
import Button from './UI/Button';
import { useContent } from '../context/ContentContext';
import FadeIn from './animations/FadeIn';
import SlideIn from './animations/SlideIn';
import ScaleIn from './animations/ScaleIn';
import ParallaxEffect from './animations/ParallaxEffect';
import MouseTracker from './animations/MouseTracker';
import { gsap } from 'gsap';
import { textReveal, createMagneticEffect } from '../utils/animationUtils';

const Hero = () => {
  const { content } = useContent();
  const titleRef = useRef(null);
  const heroImageRef = useRef(null);
  const techSymbolsRef = useRef(null);
  
  const heroData = content?.hero || {
    title: 'Simplifying Cloud & Kubernetes Excellence',
    subtitle: 'DevOps, Kubernetes, and Cloud Solutions for Enterprise Innovation',
    description: 'Expert consulting and proprietary solutions that transform your infrastructure and operations',
    cta: 'Learn More',
    secondaryCta: 'Contact Us'
  };
  
  useEffect(() => {
    // Text reveal animation for title
    if (titleRef.current) {
      const titleSpan = titleRef.current.querySelector('.text-transparent');
      if (titleSpan) {
        titleSpan.setAttribute('data-text', titleSpan.textContent);
        titleSpan.classList.add('text-glitch');
      }
    }
    
    // Add magnetic effect to the hero image
    const cleanup = createMagneticEffect(heroImageRef.current, {
      strength: 20,
      radius: 400
    });
    
    // Animated tech symbols
    const techSymbols = techSymbolsRef.current?.querySelectorAll('.tech-symbol');
    if (techSymbols) {
      gsap.fromTo(techSymbols, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.3, 
          ease: 'back.out(1.7)',
          duration: 1.5,
          delay: 0.8
        }
      );
    }
    
    return () => {
      // Clean up magnetic effect
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient elements with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxEffect speed={0.15} direction="both">
          <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[100px] bg-[#369b6d]/30 animate-pulse" style={{animationDuration: '8s'}} />
        </ParallaxEffect>
        <ParallaxEffect speed={0.1} direction="both">
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[100px] bg-[#369b6d]/20 animate-pulse" style={{animationDelay: '1s', animationDuration: '10s'}} />
        </ParallaxEffect>
        <ParallaxEffect speed={0.2} direction="both">
          <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full blur-[80px] bg-[#369b6d]/10 animate-pulse" style={{animationDelay: '2s', animationDuration: '7s'}} />
        </ParallaxEffect>
        
        {/* Grid pattern overlay with parallax effect */}
        <ParallaxEffect speed={0.05} direction="vertical">
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        </ParallaxEffect>
        
        {/* Tech symbol elements with enhanced animations */}
        <div ref={techSymbolsRef} className="absolute w-full h-full pointer-events-none">
          <div className="absolute top-1/4 right-1/4 text-[#369b6d]/20 text-9xl animate-float transition-all duration-500 tech-symbol hover-glow">
            &#123;&#125;
          </div>
          <div className="absolute bottom-1/4 left-1/4 text-[#369b6d]/20 text-9xl animate-float-delay transition-all duration-500 tech-symbol hover-glow">
            &lt;/&gt;
          </div>
          <div className="absolute top-2/3 right-1/3 text-[#369b6d]/20 text-7xl animate-float-alternative tech-symbol hover-glow" style={{animationDelay: '1.5s'}}>
            #
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <SlideIn direction="left">
            <div ref={titleRef}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                To <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#369b6d] to-[#369b6d]/80">Empower</span>, Not To Overwhelm
              </h1>
              <ScaleIn delay={0.3}>
                <p className="text-xl sm:text-2xl font-medium text-[#369b6d]/90 mb-4 hover-scale">
                  {heroData.subtitle}
                </p>
              </ScaleIn>
              <ScaleIn delay={0.5}>
                <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-lg">
                  {heroData.description}
                </p>
              </ScaleIn>
              <div className="flex flex-wrap gap-4">
                <FadeIn delay={0.7}>
                  <Button href="#features" primary>
                    {heroData.cta}
                  </Button>
                </FadeIn>
                <FadeIn delay={0.8}>
                  <Button href="#contact">
                    {heroData.secondaryCta}
                  </Button>
                </FadeIn>
              </div>
            </div>
          </SlideIn>

          <MouseTracker trackSpeed={0.2} rotationFactor={0.04} maxRotation={8}>
            <div className="relative" ref={heroImageRef}>
              <div className="aspect-square max-w-md mx-auto relative card-3d">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#369b6d] to-[#369b6d]/80 rounded-3xl transform rotate-6 opacity-30 blur-xl animate-pulse" style={{animationDuration: '4s'}}></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#369b6d]/50 to-[#369b6d]/40 rounded-3xl opacity-30 blur-sm transform rotate-6 scale-105 card-3d-inner"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#369b6d]/20 transform transition-transform-slow hover-lift border border-[#369b6d]/30 hover:border-[#369b6d]/50 card-3d-inner">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-[#369b6d]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -inset-px bg-gradient-to-tr from-[#369b6d]/50 to-transparent opacity-0 group-hover:opacity-20 transition-opacity animate-shimmer"></div>
                  <img 
                    src="/assets/images/hero-image-new.png" 
                    alt="SINAD LLC Hero" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </MouseTracker>
        </div>
      </div>
    </section>
  );
};

export default Hero;