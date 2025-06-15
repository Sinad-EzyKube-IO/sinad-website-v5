import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhySinad from './components/WhySinad';
// Diagram section removed per user request
import Services from './components/Services';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ContentManager from './cms/ContentManager';
import { ContentProvider } from './context/ContentContext';

// Animation components
import SmoothScroll from './components/animations/SmoothScroll';
import AnimatedCursor from './components/animations/AnimatedCursor';

// Styles
import './styles/animations.css';

// GSAP and ScrollTrigger setup
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // CTRL + SHIFT + A to toggle admin panel
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        setShowAdmin(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <ContentProvider>
      <AnimatedCursor 
        color="#369b6d"
        trailColor="rgba(54, 155, 109, 0.2)"
        size={12}
        outlineColor="rgba(255, 255, 255, 0.8)"
        outlineWidth={1.5}
        trailLength={6}
      />
      <SmoothScroll>
        <div className="min-h-screen bg-black text-white">
          <Navbar />
          <Hero />
          <About />
          <WhySinad />
          {/* Diagram section removed per user request */}
          <Services />
          <Features />
          <Contact />
          <Footer />
          
          {showAdmin && (
            <div className="fixed inset-0 bg-black/90 z-50 overflow-auto">
              <ContentManager onClose={() => setShowAdmin(false)} />
            </div>
          )}
          
          <div className="fixed bottom-4 right-4 text-xs opacity-30">
            Press CTRL+SHIFT+A to access admin panel
          </div>
        </div>
      </SmoothScroll>
    </ContentProvider>
  );
}

export default App;