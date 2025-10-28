import { getCaseStudyBySlug, caseStudies } from '@/content/case-studies';
import { generateCaseStudyMetadata } from '@/lib/seo/caseStudiesSEO';
import { notFound } from 'next/navigation';

interface LayoutProps {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: 'Case Study Not Found | Saipien Labs',
    };
  }

  return generateCaseStudyMetadata(study);
}

export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
