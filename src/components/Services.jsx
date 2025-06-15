import React from 'react';
import { useContent } from '../context/ContentContext';
import Section from './UI/Section';
import Card from './UI/Card';
import Button from './UI/Button';
import FadeIn from './animations/FadeIn';
import SlideIn from './animations/SlideIn';

const Services = () => {
  const { content } = useContent();
  
  const servicesData = content?.services || {
    title: "Our Services",
    subtitle: "Comprehensive IT Solutions",
    description: "We provide end-to-end services for your cloud infrastructure, Kubernetes deployments, and DevOps implementations.",
    services: [
      {
        icon: "cloud",
        title: "Cloud Consulting",
        description: "Strategic guidance for optimal cloud architecture, migration strategies, and multi-cloud environments.",
        features: ["Cloud architecture design", "Migration planning", "Cost optimization", "Security assessment"]
      },
      {
        icon: "kubernetes",
        title: "Kubernetes Expertise",
        description: "Specialized consulting and implementation services for container orchestration and Kubernetes environments.",
        features: ["Cluster setup & management", "Application deployment", "Performance tuning", "Security hardening"]
      },
      {
        icon: "devops",
        title: "DevOps Implementation",
        description: "End-to-end DevOps transformation with CI/CD pipelines, automation, and cultural guidance.",
        features: ["CI/CD pipeline setup", "Infrastructure as Code", "Monitoring solutions", "Team enablement"]
      },
      {
        icon: "security",
        title: "Cloud Security",
        description: "Comprehensive security solutions for your cloud infrastructure and Kubernetes deployments.",
        features: ["Security posture assessment", "Compliance automation", "Threat detection", "Zero-trust implementation"]
      }
    ],
    cta: {
      title: "Need Custom Solutions?",
      description: "We tailor our services to meet your specific requirements and challenges.",
      buttonText: "Contact Us"
    }
  };

  // Icon components
  const icons = {
    cloud: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-8.97A5 5 0 003 15z" />
      </svg>
    ),
    kubernetes: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20l-5-8 5-8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l5-8-5-8" />
      </svg>
    ),
    devops: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16M15 9l-3 3-3-3" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 16l-4-4-4 4" />
      </svg>
    ),
    security: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  };

  return (
    <Section id="services" className="bg-black relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#369b6d]/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#369b6d] to-[#369b6d]/80">
                {servicesData.title}
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">{servicesData.subtitle}</p>
            <p className="text-gray-400 leading-relaxed">{servicesData.description}</p>
          </FadeIn>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.services.map((service, index) => (
            <SlideIn key={index} direction="up" delay={index * 0.1}>
              <Card className="h-full">
                <div className="text-[#369b6d] mb-6">
                  {icons[service.icon]}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-300">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 mr-2 text-[#369b6d]" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </SlideIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-20 text-center max-w-3xl mx-auto">
            <div className="p-8 bg-gradient-to-br from-gray-900 to-black border border-[#369b6d]/20 rounded-2xl shadow-lg shadow-[#369b6d]/5">
              <h3 className="text-2xl font-semibold text-white mb-4">{servicesData.cta.title}</h3>
              <p className="text-gray-400 mb-8">{servicesData.cta.description}</p>
              <Button href="#contact" primary>{servicesData.cta.buttonText}</Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
};

export default Services;