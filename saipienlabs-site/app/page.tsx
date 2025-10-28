'use client';

import { useState } from 'react';
import HeaderNav from '@/components/HeaderNav';
import HeroSection from '@/components/HeroSection';
import ValueProps from '@/components/ValueProps';
import PricingGrid from '@/components/PricingGrid';
import Timeline90Days from '@/components/Timeline90Days';
import CaseStudies from '@/components/CaseStudies';
import GovernanceStrip from '@/components/GovernanceStrip';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <>
      <HeaderNav onOpenContact={openContactModal} />
      <main>
        <HeroSection onOpenContact={openContactModal} />
        <ValueProps />
        <PricingGrid />
        <Timeline90Days />
        <CaseStudies />
        <GovernanceStrip />
        <FinalCTA onOpenContact={openContactModal} />
      </main>
      <Footer />
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </>
  );
}
