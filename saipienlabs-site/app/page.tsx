'use client';

import { useState } from 'react';
import HeaderNav from '@/components/HeaderNav';
import HeroShipConsole from '@/components/hero/HeroShipConsole';
import StudioSection from '@/components/StudioSection';
import ValueProps from '@/components/ValueProps';
import PricingGrid from '@/components/PricingGrid';
import ApproachSection from '@/components/ApproachSection';
import CaseStudiesHome from '@/components/sections/CaseStudiesHome';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';
import FounderCTA from '@/components/cta/FounderCTA';

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <>
      <HeaderNav onOpenContact={openContactModal} />
      <main>
        <HeroShipConsole onOpenContact={openContactModal} />
        <StudioSection />
        <section id="services">
          <ValueProps />
        </section>
        <section id="pricing">
          <PricingGrid />
        </section>
        <ApproachSection />
        <div className="container mx-auto px-6 py-16">
          <FounderCTA source="homepage_mid" variant="wide" />
        </div>
        <CaseStudiesHome onOpenContact={openContactModal} />
        <FinalCTA onOpenContact={openContactModal} />
      </main>
      <Footer />
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </>
  );
}
