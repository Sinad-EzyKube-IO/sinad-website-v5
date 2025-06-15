import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import Section from './UI/Section';
import Button from './UI/Button';
import FadeIn from './animations/FadeIn';
import SlideIn from './animations/SlideIn';

const Contact = () => {
  const { content } = useContent();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });

  const contactData = content?.contact || {
    title: "Contact Us",
    subtitle: "Get in Touch",
    description: "Have questions about our services or want to learn more about EzyKube? Reach out to our team and we'll get back to you as soon as possible.",
    officeAddress: "123 Tech Park, Silicon Valley, CA 94043",
    email: "info@sinadllc.com",
    phone: "+1 (555) 123-4567",
    formLabels: {
      name: "Your Name",
      email: "Email Address",
      company: "Company Name",
      message: "Your Message",
      submit: "Send Message"
    },
    mapLocation: "San Francisco, CA",
    socialMedia: [
      { name: "LinkedIn", url: "https://linkedin.com/company/sinadllc", icon: "linkedin" },
      { name: "Twitter", url: "https://twitter.com/sinadllc", icon: "twitter" },
      { name: "GitHub", url: "https://github.com/sinadllc", icon: "github" }
    ]
  };

  // Handler to update form state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  // Handler to submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    // For this demo, we'll just simulate a successful submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you! Your message has been sent. We'll get back to you soon."
    });
    
    // Reset form after submission
    setFormState({ name: '', email: '', company: '', message: '' });
    
    // Reset form status after 5 seconds
    setTimeout(() => {
      setFormStatus({ submitted: false, success: false, message: '' });
    }, 5000);
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
    <Section id="contact" className="bg-black relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-emerald-900/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-300">
                {contactData.title}
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">{contactData.subtitle}</p>
            <p className="text-gray-400 leading-relaxed">{contactData.description}</p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <SlideIn direction="left">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-emerald-500/20 rounded-2xl p-6 md:p-8 shadow-lg shadow-emerald-500/5 h-full">
              <h3 className="text-xl font-semibold text-white mb-6">Send us a message</h3>
              
              {formStatus.submitted && (
                <div className={`mb-6 p-4 rounded-lg ${formStatus.success ? 'bg-emerald-900/20 text-emerald-300' : 'bg-red-900/20 text-red-300'}`}>
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                    {contactData.formLabels.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-black/60 border border-emerald-500/20 rounded-lg focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                    {contactData.formLabels.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-black/60 border border-emerald-500/20 rounded-lg focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-1">
                    {contactData.formLabels.company}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-black/60 border border-emerald-500/20 rounded-lg focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                    {contactData.formLabels.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full px-4 py-2 bg-black/60 border border-emerald-500/20 rounded-lg focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-white resize-none"
                  ></textarea>
                </div>
                <div>
                  <Button type="submit" primary fullWidth>
                    {contactData.formLabels.submit}
                  </Button>
                </div>
              </form>
            </div>
          </SlideIn>

          <SlideIn direction="right">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-emerald-500/20 rounded-2xl p-6 md:p-8 shadow-lg shadow-emerald-500/5 h-full">
              <h3 className="text-xl font-semibold text-white mb-6">Get in touch</h3>
              
              <div className="space-y-8">
                {/* Company Address */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-300">Our Office</p>
                    <p className="text-gray-400 mt-1">{contactData.officeAddress}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-300">Email</p>
                    <a href={`mailto:${contactData.email}`} className="text-emerald-400 hover:text-emerald-300 mt-1 block">
                      {contactData.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-300">Phone</p>
                    <a href={`tel:${contactData.phone}`} className="text-emerald-400 hover:text-emerald-300 mt-1 block">
                      {contactData.phone}
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-3">Connect With Us</p>
                  <div className="flex space-x-4">
                    {contactData.socialMedia.map((social, index) => (
                      <a 
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors duration-300"
                      >
                        {socialIcons[social.icon.toLowerCase()]}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map visual representation (static for this demo) */}
              <div className="mt-8 rounded-lg overflow-hidden border border-emerald-500/20 h-48 bg-gray-900 relative">
                <div className="absolute inset-0 bg-map-pattern opacity-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-xs text-gray-300 px-2 py-1 rounded">
                  {contactData.mapLocation}
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </Section>
  );
};

export default Contact;