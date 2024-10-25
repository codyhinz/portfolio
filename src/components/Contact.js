import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export const Contact = () => (
  <section className="bg-black/30 rounded-lg p-8 border-2 border-wow-border">
    <h2 className="text-3xl font-bold text-wow-gold mb-6">Contact Details</h2>
    <div className="grid gap-6 md:grid-cols-3">
      <ContactLink
        href="mailto:codyhinz@gmail.com"
        icon={<Mail className="w-5 h-5 text-wow-gold group-hover:scale-110 transition-transform duration-300" />}
        text="codyhinz@gmail.com"
      />
      <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-b from-wow-gold/20 to-transparent border border-wow-border">
        <MapPin className="w-5 h-5 text-wow-gold" />
        <span className="text-wow-tan">Lexington, KY 40517</span>
      </div>
      <ContactLink
        href="tel:859-396-5590"
        icon={<Phone className="w-5 h-5 text-wow-gold group-hover:scale-110 transition-transform duration-300" />}
        text="859-396-5590"
      />
    </div>
  </section>
);

const ContactLink = ({ href, icon, text }) => (
  <a
    href={href}
    className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-b from-wow-gold/20 to-transparent border border-wow-border hover:border-wow-gold transition-all duration-300 group"
  >
    {icon}
    <span className="text-wow-tan">{text}</span>
  </a>
);