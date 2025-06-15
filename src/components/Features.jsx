import React from 'react';
import { useContent } from '../context/ContentContext';
import Section from './UI/Section';
import Card from './UI/Card';
import Button from './UI/Button';
import FadeIn from './animations/FadeIn';
import SlideIn from './animations/SlideIn';

const Features = () => {
  const { content } = useContent();
  
  const featuresData = content?.features || {
    title: "EzyKube",
    subtitle: "Simplifying Kubernetes Management",
    description: "Our flagship product designed to make Kubernetes accessible, manageable, and efficient for teams of all sizes.",
    mainFeatures: [
      {
        title: "Intuitive Dashboard",
        description: "Visualize your entire Kubernetes infrastructure with our user-friendly dashboard that simplifies cluster management.",
        image: "dashboard"
      },
      {
        title: "One-Click Deployments",
        description: "Deploy applications to your Kubernetes clusters with simple, repeatable configurations and zero downtime.",
        image: "deployment"
      },
      {
        title: "Automated Scaling",
        description: "Intelligently scale your applications based on real-time metrics and predefined rules.",
        image: "scaling"
      }
    ],
    benefits: [
      {
        icon: "speed",
        title: "50% Faster Deployment",
        description: "Reduce your deployment time and focus on innovation rather than infrastructure."
      },
      {
        icon: "cost",
        title: "30% Cost Reduction",
        description: "Optimize resource utilization and automatically scale down when not needed."
      },
      {
        icon: "security",
        title: "Enhanced Security",
        description: "Built-in security scanning and compliance checks for your applications."
      },
      {
        icon: "simplicity",
        title: "Reduced Complexity",
        description: "Abstract away Kubernetes complexities while maintaining full control."
      }
    ],
    cta: {
      title: "Ready to Simplify Kubernetes?",
      description: "Get started with EzyKube today and transform how you manage containerized applications.",
      primaryButton: "Request Demo",
      secondaryButton: "Learn More"
    }
  };
  
  // Image placeholders that would be replaced with actual designs
  const images = {
    dashboard: (
      <div className="relative aspect-video w-full max-w-md mx-auto bg-gray-900 border border-[#369b6d]/30 rounded-lg overflow-hidden shadow-lg shadow-[#369b6d]/10">
        {/* Dashboard mockup */}
        <div className="absolute inset-0 flex flex-col">
          {/* Top bar */}
          <div className="h-8 bg-black/60 border-b border-[#369b6d]/30 flex items-center px-4">
            <div className="w-3 h-3 rounded-full bg-[#369b6d]/40 mr-2"></div>
            <div className="h-2 w-24 bg-[#369b6d]/20 rounded"></div>
            <div className="ml-auto flex space-x-4">
              <div className="h-2 w-8 bg-[#369b6d]/20 rounded"></div>
              <div className="h-2 w-8 bg-[#369b6d]/20 rounded"></div>
            </div>
          </div>
          
          {/* Content area */}
          <div className="flex-1 grid grid-cols-4 gap-2 p-4">
            <div className="col-span-1">
              <div className="h-full bg-black/40 border border-[#369b6d]/10 rounded p-2">
                <div className="h-2 w-3/4 bg-[#369b6d]/20 rounded mb-3"></div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-6 flex items-center mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#369b6d]/30 mr-2"></div>
                    <div className="h-2 bg-[#369b6d]/20 rounded flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-span-3">
              <div className="h-1/3 bg-black/40 border border-[#369b6d]/10 rounded p-3 mb-2">
                <div className="h-2 w-1/4 bg-[#369b6d]/20 rounded mb-3"></div>
                <div className="grid grid-cols-3 gap-2 h-[80%]">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-black/60 border border-[#369b6d]/10 rounded flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full border-2 border-[#369b6d]/40 flex items-center justify-center">
                        <div className="w-4 h-1 bg-[#369b6d]/60 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="h-2/3 bg-black/40 border border-[#369b6d]/10 rounded p-3">
                <div className="h-2 w-1/3 bg-[#369b6d]/20 rounded mb-3"></div>
                <div className="grid grid-cols-2 gap-4 h-[80%]">
                  <div className="bg-black/60 border border-[#369b6d]/10 rounded p-2">
                    <div className="h-2 mb-2 w-1/2 bg-[#369b6d]/20 rounded"></div>
                    <div className="h-[80%] flex items-end pb-2">
                      {[...Array(7)].map((_, i) => (
                        <div 
                          key={i} 
                          className="flex-1 mx-0.5"
                          style={{ height: `${20 + Math.random() * 80}%` }}
                        >
                          <div className="h-full bg-gradient-to-t from-[#369b6d]/80 to-[#369b6d]/30 rounded-t"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-black/60 border border-[#369b6d]/10 rounded p-2">
                    <div className="h-2 mb-2 w-1/2 bg-[#369b6d]/20 rounded"></div>
                    <div className="h-[80%] relative flex items-center justify-center">
                      <div className="w-4/5 h-4/5 rounded-full border-4 border-[#369b6d]/20 flex items-center justify-center">
                        <div className="w-3/5 h-3/5 rounded-full border-4 border-[#369b6d]/40 flex items-center justify-center">
                          <div className="w-2/5 h-2/5 rounded-full bg-[#369b6d]/60 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    deployment: (
      <div className="relative aspect-video w-full max-w-md mx-auto bg-gray-900 border border-[#369b6d]/30 rounded-lg overflow-hidden shadow-lg shadow-[#369b6d]/10">
        {/* Deployment mockup */}
        <div className="absolute inset-0 flex flex-col">
          {/* Top bar */}
          <div className="h-8 bg-black/60 border-b border-[#369b6d]/30 flex items-center px-4">
            <div className="w-3 h-3 rounded-full bg-[#369b6d]/40 mr-2"></div>
            <div className="h-2 w-32 bg-[#369b6d]/20 rounded"></div>
          </div>
          
          {/* Content area */}
          <div className="flex-1 flex flex-col p-4">
            {/* Deployment workflow display */}
            <div className="flex items-center justify-between mb-6">
              {[...Array(4)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                      ${i === 1 ? 'bg-[#369b6d] text-black' : 'border-2 border-[#369b6d]/40 text-[#369b6d]'}`}
                    >
                      {i + 1}
                    </div>
                    <div className="h-2 w-16 bg-[#369b6d]/20 rounded mt-2"></div>
                  </div>
                  {i < 3 && (
                    <div className="w-16 h-1 bg-gradient-to-r from-[#369b6d]/80 to-[#369b6d]/20"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Form area */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="col-span-2 bg-black/40 border border-[#369b6d]/20 rounded p-3 mb-4">
                <div className="h-2 w-1/4 bg-[#369b6d]/20 rounded mb-4"></div>
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-8 px-6 rounded flex items-center justify-center border ${
                        i === 0 ? 'border-[#369b6d] text-[#369b6d]' : 'border-gray-700 text-gray-500'
                      }`}
                    >
                      <div className="h-2 w-12 bg-current opacity-60 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="bg-black/40 border border-[#369b6d]/10 rounded p-3 mb-3">
                  <div className="h-2 w-2/3 bg-[#369b6d]/20 rounded mb-3"></div>
                  <div className="h-8 bg-black/60 border border-[#369b6d]/20 rounded"></div>
                </div>
                
                <div className="bg-black/40 border border-[#369b6d]/10 rounded p-3">
                  <div className="h-2 w-2/3 bg-[#369b6d]/20 rounded mb-3"></div>
                  <div className="h-8 bg-black/60 border border-[#369b6d]/20 rounded"></div>
                </div>
              </div>
              
              <div>
                <div className="bg-black/40 border border-[#369b6d]/10 rounded p-3 mb-3">
                  <div className="h-2 w-2/3 bg-[#369b6d]/20 rounded mb-3"></div>
                  <div className="h-8 bg-black/60 border border-[#369b6d]/20 rounded"></div>
                </div>
                
                <div className="bg-black/40 border border-[#369b6d]/10 rounded p-3">
                  <div className="h-2 w-2/3 bg-[#369b6d]/20 rounded mb-3"></div>
                  <div className="h-8 bg-black/60 border border-[#369b6d]/20 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* Deploy button */}
            <div className="mt-4 flex justify-end">
              <div className="h-10 w-32 bg-[#369b6d] rounded flex items-center justify-center">
                <div className="h-2 w-16 bg-black/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    scaling: (
      <div className="relative aspect-video w-full max-w-md mx-auto bg-gray-900 border border-[#369b6d]/30 rounded-lg overflow-hidden shadow-lg shadow-[#369b6d]/10">
        {/* Scaling mockup */}
        <div className="absolute inset-0 flex flex-col">
          {/* Top bar */}
          <div className="h-8 bg-black/60 border-b border-[#369b6d]/30 flex items-center px-4">
            <div className="w-3 h-3 rounded-full bg-[#369b6d]/40 mr-2"></div>
            <div className="h-2 w-20 bg-[#369b6d]/20 rounded"></div>
          </div>
          
          {/* Content area */}
          <div className="flex-1 p-4">
            <div className="grid grid-cols-3 gap-4 h-full">
              <div className="col-span-2 bg-black/40 border border-[#369b6d]/10 rounded p-3">
                <div className="h-2 w-1/4 bg-[#369b6d]/20 rounded mb-4"></div>
                
                {/* Graph visualization */}
                <div className="h-[80%] relative">
                  {/* Y-axis */}
                  <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between items-center py-2">
                    <div className="h-1 w-6 bg-[#369b6d]/20 rounded"></div>
                    <div className="h-1 w-4 bg-[#369b6d]/20 rounded"></div>
                    <div className="h-1 w-8 bg-[#369b6d]/20 rounded"></div>
                  </div>
                  
                  {/* Graph area */}
                  <div className="absolute left-12 right-0 top-0 bottom-0">
                    {/* X-axis ticks */}
                    <div className="absolute left-0 right-0 bottom-0 h-6 flex justify-between items-center px-2">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-1 w-3 bg-[#369b6d]/20 rounded"></div>
                      ))}
                    </div>
                    
                    {/* Graph line */}
                    <div className="absolute left-0 right-0 top-4 bottom-8">
                      <svg className="w-full h-full">
                        <path 
                          d={`M0,${80 - Math.random() * 30} ${[...Array(10)].map((_, i) => {
                            const x = (i + 1) * 10;
                            const y = 80 - Math.random() * 60;
                            return `L${x},${y}`;
                          }).join(' ')}`}
                          stroke="#369b6d" 
                          strokeWidth="2" 
                          fill="none" 
                        />
                        <path 
                          d={`M0,${80 - Math.random() * 30} ${[...Array(10)].map((_, i) => {
                            const x = (i + 1) * 10;
                            const y = 80 - Math.random() * 60;
                            return `L${x},${y}`;
                          }).join(' ')}`}
                          stroke="#369b6d" 
                          strokeWidth="2" 
                          fill="none" 
                          strokeDasharray="4 2"
                          className="opacity-50"
                        />
                      </svg>
                      
                      {/* Threshold marker */}
                      <div className="absolute left-0 right-0 top-[30%] border-t border-dashed border-[#369b6d]/40"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="bg-black/40 border border-[#369b6d]/10 rounded p-3 flex-1">
                  <div className="h-2 w-3/4 bg-[#369b6d]/20 rounded mb-3"></div>
                  
                  {/* Pod scaling visualization */}
                  <div className="flex flex-wrap gap-2">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-6 h-6 rounded flex items-center justify-center ${
                          i < 5 ? 'bg-[#369b6d]/30 border border-[#369b6d]' : 
                          'border border-[#369b6d]/30 border-dashed'
                        }`}
                      >
                        {i < 5 && <div className="w-2 h-2 rounded-full bg-[#369b6d]"></div>}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-black/40 border border-[#369b6d]/10 rounded p-3 flex-1">
                  <div className="h-2 w-1/2 bg-[#369b6d]/20 rounded mb-3"></div>
                  
                  {/* Rules visualization */}
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-[#369b6d]/40 mr-2"></div>
                      <div className="h-2 bg-[#369b6d]/20 rounded flex-1"></div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-[#369b6d]/20 border border-[#369b6d]/40 rounded p-3">
                  <div className="h-2 w-2/3 bg-[#369b6d]/40 rounded mb-3"></div>
                  <div className="flex justify-between">
                    <div className="h-6 w-16 bg-black/20 rounded"></div>
                    <div className="h-6 w-6 bg-black/20 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
  
  // Benefit icons
  const icons = {
    speed: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    cost: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    security: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    simplicity: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  };

  return (
    <Section id="features" className="bg-gradient-to-b from-black via-black/95 to-black relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#369b6d]/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#369b6d] to-[#369b6d]/80">
                {featuresData.title}
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">{featuresData.subtitle}</p>
            <p className="text-gray-400 leading-relaxed">{featuresData.description}</p>
          </FadeIn>
        </div>
        
        <div className="space-y-24 mb-24">
          {featuresData.mainFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <SlideIn direction={index % 2 === 0 ? "left" : "right"}>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 mb-6">{feature.description}</p>
                </div>
              </SlideIn>
              
              <FadeIn delay={0.3}>
                {images[feature.image]}
              </FadeIn>
            </div>
          ))}
        </div>
        
        <SlideIn direction="up">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {featuresData.benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <div className="text-[#369b6d] mb-6 flex justify-center">
                  {icons[benefit.icon]}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </SlideIn>
        
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <div className="p-10 bg-gradient-to-br from-gray-900 to-black border border-[#369b6d]/20 rounded-2xl shadow-lg shadow-[#369b6d]/5">
              <h3 className="text-2xl font-semibold text-white mb-4">{featuresData.cta.title}</h3>
              <p className="text-gray-400 mb-8">{featuresData.cta.description}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="#contact" primary>
                  {featuresData.cta.primaryButton}
                </Button>
                <Button href="#about">
                  {featuresData.cta.secondaryButton}
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
};

export default Features;