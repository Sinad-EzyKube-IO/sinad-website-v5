import React from 'react';
import { useContent } from '../context/ContentContext';
import Section from './UI/Section';
import FadeIn from './animations/FadeIn';
import SlideIn from './animations/SlideIn';

const About = () => {
  const { content } = useContent();
  
  const aboutData = content?.about || {
    title: "About Sinad.io",
    subtitle: "Your Trusted Partner in IT Innovation",
    description: "Sinad.io is a leading IT consulting firm specializing in DevOps, Kubernetes, and Cloud Computing. Our team of experts brings years of experience to tackle complex infrastructure challenges and deliver efficient, scalable solutions.",
    values: [
      {
        icon: "🚀",
        title: "Innovation",
        description: "We're constantly exploring emerging technologies to provide cutting-edge solutions."
      },
      {
        icon: "🔧",
        title: "Expertise",
        description: "Our team consists of certified professionals with deep technical knowledge."
      },
      {
        icon: "🤝",
        title: "Partnership",
        description: "We work closely with clients to understand their unique needs and challenges."
      },
      {
        icon: "💡",
        title: "Simplicity",
        description: "We transform complex problems into elegant, user-friendly solutions."
      }
    ],
    stats: [
      { value: "98%", label: "Client Satisfaction" },
      { value: "150+", label: "Projects Delivered" },
      { value: "15+", label: "Years Experience" },
      { value: "50+", label: "Enterprise Clients" }
    ]
  };

  return (
    <Section id="about" className="bg-gradient-to-b from-black via-black/95 to-black relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full blur-[150px] bg-[#369b6d]/20" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#369b6d] to-[#369b6d]/80">
                {aboutData.title}
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">{aboutData.subtitle}</p>
            <p className="text-gray-400 leading-relaxed mb-6">{aboutData.description}</p>
            {aboutData.philosophy && (
              <div className="mt-8 p-6 bg-black/50 border-l-4 border-[#369b6d] rounded-lg">
                <p className="text-gray-300 leading-relaxed italic">{aboutData.philosophy}</p>
              </div>
            )}
          </FadeIn>
        </div>
        
        <SlideIn direction="up">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {aboutData.values.map((value, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-black to-gray-900 p-6 rounded-xl border border-[#369b6d]/20 shadow-lg hover:shadow-[#369b6d]/10 transition-shadow duration-300"
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-[#369b6d] mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </SlideIn>
        
        <FadeIn delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {aboutData.stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4 rounded-lg backdrop-blur-sm"
              >
                <div className="text-3xl sm:text-4xl font-bold text-[#369b6d] mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
};

export default About;