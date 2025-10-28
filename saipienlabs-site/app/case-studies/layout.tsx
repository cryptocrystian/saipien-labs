import { caseStudiesIndexMetadata } from '@/lib/seo/caseStudiesSEO';

export const metadata = caseStudiesIndexMetadata;

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
