import FP_Hero from '@/components/sections/FP_Hero';
import FP_WhyUs from '@/components/sections/FP_WhyUs';
import FP_HowItWorks from '@/components/sections/FP_HowItWorks';
import FP_Models from '@/components/sections/FP_Models';
import FP_Criteria from '@/components/sections/FP_Criteria';
import FP_FAQ from '@/components/sections/FP_FAQ';
import FounderCTA from '@/components/cta/FounderCTA';
import { founderPartnershipMetadata, generateJSONLD } from '@/lib/seo/founderPartnershipSEO';

export const metadata = founderPartnershipMetadata;

export default function FounderPartnershipPage() {
  const { faqSchema, organizationSchema } = generateJSONLD();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <main className="bg-[#0D0F12] min-h-screen">
        <FP_Hero />
        <FP_WhyUs />
        <FP_HowItWorks />
        <FP_Models />
        <FP_Criteria />
        <FP_FAQ />
        <div className="container mx-auto px-6 py-16">
          <FounderCTA source="founder_page_bottom" variant="wide" />
        </div>
      </main>
    </>
  );
}
