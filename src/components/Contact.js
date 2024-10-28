import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Mail, MapPin, Phone, Check, Copy, ExternalLink, FileDown, Loader2 } from 'lucide-react';
import contactBg from '../assets/shattrath.jpg';

export const Contact = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [contactRef, isVisible] = useScrollAnimation(0.1);
  
  const getBasePath = () => {
    if (window.location.hostname === 'localhost') {
      return '';
    }
    return '/portfolio'; // Replace with your repository name
  };

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage(`${type} copied to clipboard!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = async (type) => {
    try {
      setIsDownloading(true);
      let response;
      let filename;
      const basePath = getBasePath();
      
      if (type === 'simple') {
        response = await fetch(`${basePath}/Resume.docx`);
        filename = 'Cody-Hinz-Resume-Simple.docx';
      } else {
        response = await fetch(`${basePath}/Resume-Complete.pdf`);
        filename = 'Cody-Hinz-Resume-Complete.pdf';
      }

      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      
      setToastMessage('Download started!');
      setShowToast(true);
    } catch (error) {
      setToastMessage('Download failed. Please try again.');
      setShowToast(true);
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
      setActiveDropdown(null);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const toggleDropdown = (id) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  return (
    <section ref={contactRef} id="contact" className="relative rounded-lg border-2 border-wow-border group scroll-mt-24 mb-6">
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${contactBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/85 group-hover:from-black/85 group-hover:to-black/80 transition-colors duration-300" />
      </div>

      <div className="p-8 relative">
        {showToast && (
          <div className={`absolute top-4 right-4 bg-wow-gold/20 border border-wow-gold text-wow-gold 
            px-4 py-2 rounded-lg flex items-center gap-2 z-50 animate-slide-up ${showToast ? 'slide-up-end' : 'slide-up-start'}`}>
            <Check className="w-4 h-4 animate-float" />
            <span>{toastMessage}</span>
          </div>
        )}
        
        <h2 className={`text-3xl font-bold text-wow-gold mb-6 animate-slide-right ${isVisible ? 'slide-right-end' : 'slide-right-start'}`}>
          Contact Details
        </h2>
        
        <div className="grid gap-6 md:grid-cols-4">
          {/* Email */}
          <div className={`relative animate-slide-up stagger-1 ${isVisible ? 'slide-up-end' : 'slide-up-start'}`}>
            {activeDropdown === 'email' && (
              <div className={`absolute bottom-full left-0 w-full mb-2 bg-black/90 border border-wow-gold 
                rounded-lg overflow-hidden animate-slide-up ${activeDropdown === 'email' ? 'slide-up-end' : 'slide-up-start'}`}>
                <a
                  href="mailto:codyhinz@gmail.com"
                  className="flex items-center gap-2 p-3 hover:bg-wow-gold/20 transition-colors w-full text-left text-white"
                  onClick={() => setActiveDropdown(null)}
                >
                  <ExternalLink className="w-4 h-4 text-wow-gold animate-float" />
                  <span>Open in Email Client</span>
                </a>
                <button
                  onClick={() => {
                    handleCopy('codyhinz@gmail.com', 'Email');
                    setActiveDropdown(null);
                  }}
                  className="flex items-center gap-2 p-3 hover:bg-wow-gold/20 transition-colors w-full text-left text-white"
                >
                  <Copy className="w-4 h-4 text-wow-gold animate-float" />
                  <span>Copy to Clipboard</span>
                </button>
              </div>
            )}
            <button
              onClick={() => toggleDropdown('email')}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-b from-wow-gold/20 
                to-transparent border border-wow-border hover:border-wow-gold transition-all duration-300 group/button"
            >
              <Mail className="w-5 h-5 text-wow-gold group-hover/button:scale-110 transition-transform duration-300 animate-float" />
              <span className="text-white">codyhinz@gmail.com</span>
            </button>
          </div>

          {/* Phone */}
          <div className={`relative animate-slide-up stagger-2 ${isVisible ? 'slide-up-end' : 'slide-up-start'}`}>
            {activeDropdown === 'phone' && (
              <div className={`absolute bottom-full left-0 w-full mb-2 bg-black/90 border border-wow-gold 
                rounded-lg overflow-hidden animate-slide-up ${activeDropdown === 'phone' ? 'slide-up-end' : 'slide-up-start'}`}>
                <a
                  href="tel:859-396-5590"
                  className="flex items-center gap-2 p-3 hover:bg-wow-gold/20 transition-colors w-full text-left text-white"
                  onClick={() => setActiveDropdown(null)}
                >
                  <ExternalLink className="w-4 h-4 text-wow-gold animate-float" />
                  <span>Call Now</span>
                </a>
                <button
                  onClick={() => {
                    handleCopy('859-396-5590', 'Phone number');
                    setActiveDropdown(null);
                  }}
                  className="flex items-center gap-2 p-3 hover:bg-wow-gold/20 transition-colors w-full text-left text-white"
                >
                  <Copy className="w-4 h-4 text-wow-gold animate-float" />
                  <span>Copy to Clipboard</span>
                </button>
              </div>
            )}
            <button
              onClick={() => toggleDropdown('phone')}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-b from-wow-gold/20 
                to-transparent border border-wow-border hover:border-wow-gold transition-all duration-300 group/button"
            >
              <Phone className="w-5 h-5 text-wow-gold group-hover/button:scale-110 transition-transform duration-300 animate-float" />
              <span className="text-white">859-396-5590</span>
            </button>
          </div>

          {/* Resume Downloads */}
          <div className={`relative animate-slide-up stagger-3 ${isVisible ? 'slide-up-end' : 'slide-up-start'}`}>
            {activeDropdown === 'resume' && (
              <div className={`absolute bottom-full left-0 w-full mb-2 bg-black/90 border border-wow-gold 
                rounded-lg overflow-hidden animate-slide-up ${activeDropdown === 'resume' ? 'slide-up-end' : 'slide-up-start'}`}>
                <button
                  onClick={() => handleDownload('simple')}
                  disabled={isDownloading}
                  className="flex items-center gap-2 p-3 hover:bg-wow-gold/20 transition-colors w-full text-left text-white disabled:opacity-50"
                >
                  {isDownloading ? (
                    <Loader2 className="w-4 h-4 text-wow-gold animate-spin" />
                  ) : (
                    <FileDown className="w-4 h-4 text-wow-gold animate-float" />
                  )}
                  <span>Simple Resume (DOCX)</span>
                </button>
                <button
                  onClick={() => handleDownload('complete')}
                  disabled={isDownloading}
                  className="flex items-center gap-2 p-3 hover:bg-wow-gold/20 transition-colors w-full text-left text-white disabled:opacity-50"
                >
                  {isDownloading ? (
                    <Loader2 className="w-4 h-4 text-wow-gold animate-spin" />
                  ) : (
                    <FileDown className="w-4 h-4 text-wow-gold animate-float" />
                  )}
                  <span>Complete Resume (PDF)</span>
                </button>
              </div>
            )}
            <button
              onClick={() => toggleDropdown('resume')}
              disabled={isDownloading}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-b from-wow-gold/20 
                to-transparent border border-wow-border hover:border-wow-gold transition-all duration-300 group/button
                disabled:opacity-50"
            >
              {isDownloading ? (
                <Loader2 className="w-5 h-5 text-wow-gold animate-spin" />
              ) : (
                <FileDown className="w-5 h-5 text-wow-gold group-hover/button:scale-110 transition-transform duration-300 animate-float" />
              )}
              <span className="text-white">Download Resume</span>
            </button>
          </div>

          {/* Address */}
          <div className={`animate-slide-up stagger-4 ${isVisible ? 'slide-up-end' : 'slide-up-start'}`}>
            <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-b from-wow-gold/20 
              to-transparent border border-wow-border">
              <MapPin className="w-5 h-5 text-wow-gold animate-float" />
              <span className="text-white">Nicholasville, KY 40356</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;