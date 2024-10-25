import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export const SocialLinks = () => (
  <div className="fixed top-4 right-4 flex gap-4 z-[100] pointer-events-auto">
    <a
      href="https://github.com/codyhinz"
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 bg-wow-bg/80 border border-wow-border rounded-lg hover:bg-wow-gold/20 transition-all duration-300 hover:scale-110 relative"
    >
      <Github className="w-6 h-6 text-wow-gold relative z-[100]" />
    </a>
    <a
      href="https://linkedin.com/in/cody-hinz"
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 bg-wow-bg/80 border border-wow-border rounded-lg hover:bg-wow-gold/20 transition-all duration-300 hover:scale-110 relative"
    >
      <Linkedin className="w-6 h-6 text-wow-gold relative z-[100]" />
    </a>
  </div>
);