/**
 * SEO metadata and JSON-LD schema for Founder Partnership page
 */

import type { Metadata } from 'next';

export const founderPartnershipMetadata: Metadata = {
  title: 'Founder Partnership | Saipien Labs',
  description: 'We co-build AI products for equity. Select founders, 90-day MVPs, enterprise discipline.',
  keywords: ['founder partnership', 'build for equity', 'AI co-founder', '90-day MVP', 'technical co-founder', 'startup development'],
  openGraph: {
    title: 'Founder Partnership | Saipien Labs',
    description: 'We co-build AI products for equity. Select founders, 90-day MVPs, enterprise discipline.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founder Partnership | Saipien Labs',
    description: 'We co-build AI products for equity. Select founders, 90-day MVPs, enterprise discipline.',
  },
};

/**
 * Generate JSON-LD structured data for the Founder Partnership page
 */
export function generateJSONLD() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much equity do you take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Typically 5-15% depending on the model (build-for-equity, hybrid, or services SAFE). Final terms depend on stage, scope, and market.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you invest cash?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, we provide engineering services for equity. We\'re builders, not investors—though we can connect you with funding partners.'
        }
      },
      {
        '@type': 'Question',
        name: 'Who owns the IP?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You (the founder) own 100% of the IP. We vest equity based on milestone delivery, but ownership stays with your company.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can we spin out later?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. If you raise a round and want to fully own the codebase, we support buyout or transition to advisory equity.'
        }
      }
    ]
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Saipien Labs',
    url: 'https://saipienlabs.com',
    description: 'AI-accelerated dev pods that ship production in weeks',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Founder Partnership Models',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Build-for-Equity Partnership',
            description: 'Fixed build credit for a minority equity stake'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hybrid Cash + Equity Partnership',
            description: 'Lower cash outlay plus smaller equity'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Services SAFE',
            description: 'Services convert at next round at discount'
          }
        }
      ]
    }
  };

  return {
    faqSchema,
    organizationSchema
  };
}
