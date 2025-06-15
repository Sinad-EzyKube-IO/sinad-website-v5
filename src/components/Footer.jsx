import React from 'react';
import { useContent } from '../context/ContentContext';
import FadeIn from './animations/FadeIn';

const Footer = () => {
  const { content } = useContent();
  const currentYear = new Date().getFullYear();

  const footerData = content?.footer || {
    companyName: "SINAD LLC",
    tagline: "Simplifying Cloud & Kubernetes Excellence",
    quickLinks: [
      { name: "Home", href: "#hero" },
      { name: "About", href: "#about" },
      { name: "Services", href: "#services" },
      { name: "EzyKube", href: "#features" },
      { name: "Contact", href: "#contact" }
    ],
    resources: [
      { name: "Documentation", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Knowledge Base", href: "#" },
      { name: "Case Studies", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" }
    ],
    socialMedia: [
      { name: "LinkedIn", url: "https://linkedin.com/company/sinadllc", icon: "linkedin" },
      { name: "Twitter", url: "https://twitter.com/sinadllc", icon: "twitter" },
      { name: "GitHub", url: "https://github.com/sinadllc", icon: "github" }
    ],
    copyright: `© ${currentYear} SINAD LLC. All rights reserved.`,
    address: "123 Tech Park, Silicon Valley, CA 94043",
    email: "info@sinadllc.com"
  };

  // Social media icons
  const socialIcons = {
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.3c-1 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7 1.7.8 1.7 1.7-.7 1.7-1.7 1.7zm13.5 12.3h-3v-5.6c0-3.4-4-3.1-4 0v5.6h-3v-11h3v1.7c1.4-2.6 7-2.8 7 2.5v6.8z" />
      </svg>
    ),
    twitter: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 4.6c-.9.4-1.8.7-2.8.8 1-.6 1.8-1.6 2.2-2.7-1 .6-2 1-3.1 1.2-.9-1-2.2-1.6-3.6-1.6-2.7 0-4.9 2.2-4.9 4.9 0 .4 0 .8.1 1.1-4.1-.2-7.7-2.2-10.1-5.1-.4.7-.7 1.6-.7 2.5 0 1.7.9 3.2 2.2 4.1-.8 0-1.6-.2-2.2-.6v.1c0 2.4 1.7 4.4 3.9 4.8-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 2 2.4 3.4 4.6 3.4-1.7 1.3-3.8 2.1-6.1 2.1-.4 0-.8 0-1.2-.1 2.2 1.4 4.8 2.2 7.5 2.2 9.1 0 14-7.5 14-14v-.6c1-.7 1.8-1.6 2.5-2.5z" />
      </svg>
    ),
    github: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    )
  };

  return (
    <footer className="bg-gray-900 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-emerald-900/5 blur-[100px]" />
      </div>
      
      <FadeIn>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Company info */}
            <div>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-white">
                  <span className="text-emerald-400">{footerData.companyName.split('.')[0]}</span>
                  {footerData.companyName.includes('.') ? '.' + footerData.companyName.split('.')[1] : ''}
                </h3>
              </div>
              <p className="mt-4 text-gray-400">{footerData.tagline}</p>
              <div className="mt-6">
                <p className="text-sm text-gray-500">{footerData.address}</p>
                <a href={`mailto:${footerData.email}`} className="text-sm text-emerald-400 hover:text-emerald-300 mt-1">
                  {footerData.email}
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Quick Links</h4>
              <ul className="mt-4 space-y-2">
                {footerData.quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Resources</h4>
              <ul className="mt-4 space-y-2">
                {footerData.resources.map((resource, index) => (
                  <li key={index}>
                    <a href={resource.href} className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Legal</h4>
              <ul className="mt-4 space-y-2">
                {footerData.legal.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Social media */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Follow Us</h4>
                <div className="flex space-x-4 mt-4">
                  {footerData.socialMedia.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors duration-300"
                    >
                      {socialIcons[social.icon.toLowerCase()]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-400 text-center">{footerData.copyright}</p>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
};

export default Footer;