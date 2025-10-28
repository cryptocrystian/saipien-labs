import type { Metadata } from 'next';
import type { CaseStudy } from '@/content/case-studies';

export const caseStudiesIndexMetadata: Metadata = {
  title: 'Case Studies — Real Launches, Measurable Results | Saipien Labs',
  description: 'Selected work with outcomes. See how we ship AI-powered production systems in 90 days with enterprise discipline.',
  keywords: 'case studies, AI automation, production launches, dev pods, 90-day MVP',
  authors: [{ name: 'Saipien Labs' }],
  openGraph: {
    title: 'Case Studies | Saipien Labs',
    description: 'Real launches, measurable results. AI-accelerated dev pods that ship production.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies | Saipien Labs',
    description: 'Real launches, measurable results. AI-accelerated dev pods that ship production.',
  },
};

export function generateCaseStudyMetadata(study: CaseStudy): Metadata {
  return {
    title: study.seo.title,
    description: study.seo.description,
    keywords: [...study.tags, 'case study', 'AI development', 'Saipien Labs'].join(', '),
    authors: [{ name: 'Saipien Labs' }],
    openGraph: {
      title: study.title,
      description: study.subtitle,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: study.title,
      description: study.subtitle,
    },
  };
}

export function generateCaseStudyJSONLD(study: CaseStudy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.subtitle,
    author: {
      '@type': 'Organization',
      name: 'Saipien Labs',
      url: 'https://saipienlabs.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Saipien Labs',
      url: 'https://saipienlabs.com'
    },
    datePublished: new Date().toISOString(),
    articleSection: 'Case Studies'
  };
}
