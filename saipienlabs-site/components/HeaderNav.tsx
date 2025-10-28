'use client';

import { useState, useEffect } from 'react';

interface HeaderNavProps {
  onOpenContact: () => void;
}

export default function HeaderNav({ onOpenContact }: HeaderNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-graphite/60 backdrop-blur-md border-b border-mist/8'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Wordmark */}
        <div className="flex items-center gap-1 text-xl font-semibold">
          <span className="text-mist">SAIPIEN</span>
          <span className="text-aurora font-mono">[LABS]</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="#services" className="text-mist/80 hover:text-mist transition-colors text-sm">
            Services
          </a>
          <a href="#studio" className="text-mist/80 hover:text-mist transition-colors text-sm">
            Studio
          </a>
          <a href="#approach" className="text-mist/80 hover:text-mist transition-colors text-sm">
            Approach
          </a>
          <a href="#work" className="text-mist/80 hover:text-mist transition-colors text-sm">
            Work
          </a>
          <a href="#pricing" className="text-mist/80 hover:text-mist transition-colors text-sm">
            Pricing
          </a>
          <a href="#resources" className="text-mist/80 hover:text-mist transition-colors text-sm">
            Resources
          </a>
          <a href="#contact" className="text-mist/80 hover:text-mist transition-colors text-sm">
            Contact
          </a>
        </div>

        {/* CTA Button */}
        <button
          onClick={onOpenContact}
          className="bg-aurora text-white px-6 py-2.5 rounded-2xl font-medium text-sm hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accentBlue focus:ring-offset-2 focus:ring-offset-obsidian"
        >
          Book Feasibility Readout
        </button>
      </nav>
    </header>
  );
}
