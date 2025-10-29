'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderNavProps {
  onOpenContact: () => void;
}

export default function HeaderNav({ onOpenContact }: HeaderNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to create nav links that work on any page
  const getNavLink = (anchor: string) => {
    return isHomePage ? `#${anchor}` : `/#${anchor}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-graphite/60 backdrop-blur-md border-b border-mist/8'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo - clickable to return home */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src="/saipien-labs-logo.png"
            alt="Saipien Labs"
            width={240}
            height={60}
            priority
            className="h-12 md:h-14 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <a href={getNavLink('services')} className="text-mist/80 hover:text-mist transition-colors text-sm">
            Services
          </a>
          <a href={getNavLink('studio')} className="text-mist/80 hover:text-mist transition-colors text-sm">
            Studio
          </a>
          <a href={getNavLink('approach')} className="text-mist/80 hover:text-mist transition-colors text-sm">
            Approach
          </a>
          <a href={getNavLink('work')} className="text-mist/80 hover:text-mist transition-colors text-sm">
            Work
          </a>
          <Link
            href="/founder-partnership"
            className={`text-sm transition-colors ${
              pathname === '/founder-partnership' ? 'text-mist font-semibold' : 'text-mist/80 hover:text-mist'
            }`}
          >
            Partnerships
          </Link>
          <a href={getNavLink('pricing')} className="text-mist/80 hover:text-mist transition-colors text-sm">
            Pricing
          </a>
          <Link href="/resources" className="text-mist/80 hover:text-mist transition-colors text-sm">
            Resources
          </Link>
          <a href={getNavLink('contact')} className="text-mist/80 hover:text-mist transition-colors text-sm">
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
