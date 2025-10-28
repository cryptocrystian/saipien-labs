/**
 * TypeScript types for Founder Partnership program
 */

export interface PartnershipModel {
  id: string;
  title: string;
  description: string;
  example: string;
  icon?: string;
}

export interface SelectionCriterion {
  id: string;
  label: string;
  description?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  cta?: {
    label: string;
    action: 'apply' | 'scroll' | 'link';
    target?: string;
  };
}

export interface WhyUsPoint {
  title: string;
  description: string;
  icon: string;
}

export interface FounderCTAProps {
  variant?: 'wide' | 'inline';
  source: string;
  className?: string;
}

export interface AnalyticsEvent {
  event: string;
  source: string;
  timestamp: number;
}

export type ApplySource = 'founder_page' | 'cta_strip' | 'hero' | 'models' | 'how_it_works' | 'faq';
