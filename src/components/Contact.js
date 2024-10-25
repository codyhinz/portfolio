import React, { useState } from 'react';
import { Mail, MapPin, Phone, Check, Copy, ExternalLink } from 'lucide-react';
// Import your background image
import contactBg from '../assets/shattrath.jpg';

export const Contact = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  
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

  const toggleDropdown = (id) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  return (
    <section className="relative rounded-lg border-2 border-wow-border group">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${contactBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/85 group-hover:from-black/85 group-hover:to-black/80 transition-colors duration-300" />
      </div>

      <div className="p-8 relative">
        {showToast && (
          <div className="absolute top-4 right-4 bg-wow-gold/20 border border-wow-gold text-wow-gold px-4 py-2 rounded-lg flex items-center gap-2 animate-fade-in z-50">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}
        
        <h2 className="text-3xl font-bold text-wow-gold mb-6">Contact Details</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="relative">
            {activeDropdown === 'email' && (
              <div className="absolute bottom-full left-0 w-full mb-2 bg-black/90 border border-wow-gold rounded-lg overflow-hidden">
                <a
                  href="mailto:codyhinz@gmail.com"
                  className="flex items-center gap-2 p-3 hover:bg-wow-gold/20 transition-colors w-full text-left text-wow-tan"
                  onClick={() => setActiveDropdown(null)}
                >
                  <ExternalLink className="w-4 h-4 text-wow-gold" />
                  <span>Open in Email Client</span>
                </a>
                <button
                  onClick={() => {
                    handleCopy('codyhinz@gmail.com', 'Email');
                    setActiveDropdown(null);
                  }}
                  className="flex items-center gap-2 p-3 hover:bg-wow-gold/20 transition-colors w-full text-left text-wow-tan"
                >
                  <Copy className="w-4 h-4 text-wow-gold" />
                  <span>Copy to Clipboard</span>
                </button>
              </div>
            )}
            <button
              onClick={() => toggleDropdown('email')}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-b from-wow-gold/20 to-transparent border border-wow-border hover:border-wow-gold transition-all duration-300 group/button"
            >
              <Mail className="w-5 h-5 text-wow-gold group-hover/button:scale-110 transition-transform duration-300" />
              <span className="text-wow-tan">codyhinz@gmail.com</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-b from-wow-gold/20 to-transparent border border-wow-border">
            <MapPin className="w-5 h-5 text-wow-gold" />
            <span className="text-wow-tan">Lexington, KY 40517</span>
          </div>

          <div className="relative">
            {activeDropdown === 'phone' && (
              <div className="absolute bottom-full left-0 w-full mb-2 bg-black/90 border border-wow-gold rounded-lg overflow-hidden">
                <a
                  href="tel:859-396-5590"
                  className="flex items-center gap-2 p-3 hover:bg-wow-gold/20 transition-colors w-full text-left text-wow-tan"
                  onClick={() => setActiveDropdown(null)}
                >
                  <ExternalLink className="w-4 h-4 text-wow-gold" />
                  <span>Call Now</span>
                </a>
                <button
                  onClick={() => {
                    handleCopy('859-396-5590', 'Phone number');
                    setActiveDropdown(null);
                  }}
                  className="flex items-center gap-2 p-3 hover:bg-wow-gold/20 transition-colors w-full text-left text-wow-tan"
                >
                  <Copy className="w-4 h-4 text-wow-gold" />
                  <span>Copy to Clipboard</span>
                </button>
              </div>
            )}
            <button
              onClick={() => toggleDropdown('phone')}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-b from-wow-gold/20 to-transparent border border-wow-border hover:border-wow-gold transition-all duration-300 group/button"
            >
              <Phone className="w-5 h-5 text-wow-gold group-hover/button:scale-110 transition-transform duration-300" />
              <span className="text-wow-tan">859-396-5590</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;