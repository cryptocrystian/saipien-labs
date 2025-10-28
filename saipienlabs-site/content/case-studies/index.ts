export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  challenge: string;
  approach: string;
  solution: string[];
  resultsTable: [string, string, string][];
  metrics: string[];
  tags: string[];
  cta: {
    label: string;
    href: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'pravado',
    title: 'Pravado — Revenue Ops Automation in the CRM',
    subtitle: 'AI Assist orchestrates CRM actions to speed follow-up and reduce cost.',
    summary: 'We embedded an AI revenue-ops layer directly in the CRM to triage, enrich, and trigger next-best actions automatically.',
    challenge: 'Sales teams were burning hours on repetitive updates; manual response times averaged 18 hours and visibility was poor.',
    approach: 'Event-driven pipelines with AI agents; adaptive scoring; SOC-aware logging and rollback; shipped via 90-Day MVP.',
    solution: [
      'AI Assist → Sales Team orchestration',
      'Adaptive scoring to prioritize hot leads',
      'Security + auditability baked in from day one'
    ],
    resultsTable: [
      ['Lead response time', '18 h', '2.3 h'],
      ['Sales ops cost / lead', '—', '-34%'],
      ['Time to production', '—', '42 days']
    ],
    metrics: ['Shipped in 6 weeks under AI Dev Pod'],
    tags: ['AI Automation', 'CRM', 'Revenue Ops'],
    cta: {
      label: 'Book Feasibility Readout',
      href: '#contact'
    },
    seo: {
      title: 'Pravado Case Study — Revenue Ops Automation | Saipien Labs',
      description: 'How we embedded AI revenue-ops automation in Pravado\'s CRM, reducing lead response time from 18h to 2.3h in 42 days.'
    }
  },
  {
    slug: 'aivery',
    title: 'Aivery — AI Workflow Engine for Support Automation',
    subtitle: 'Classifier + router that learns from history and keeps humans in-loop.',
    summary: 'We built an AI router that listens to support inboxes, classifies requests, and routes to the right resolver—human or automated.',
    challenge: 'Repetitive tickets slowed resolution and burdened agents.',
    approach: 'Next.js + Supabase + Python workers; feedback-driven routing; SOC-aware audit trail.',
    solution: [
      'Support Inbox → AI Router → Human Approver',
      'Feedback-based learning to improve precision',
      'Auditability and compliance by default'
    ],
    resultsTable: [
      ['Avg handle time', '—', '-27%'],
      ['Human-in-loop routing', 'Manual', 'Automated + Override'],
      ['Compliance', 'Partial', 'SOC-aware & auditable']
    ],
    metrics: ['Invisible teammate in every support thread'],
    tags: ['Support', 'Workflow', 'SaaS'],
    cta: {
      label: 'Book Feasibility Readout',
      href: '#contact'
    },
    seo: {
      title: 'Aivery Case Study — AI Support Automation | Saipien Labs',
      description: 'How we built an AI workflow engine for Aivery that reduced average handle time by 27% with SOC-aware compliance.'
    }
  },
  {
    slug: 'wellstead',
    title: 'Wellstead — Intelligent Intake & Ops Triage',
    subtitle: 'AI triage layer connecting intake, document parsing, and downstream ops.',
    summary: 'We modernized complex intake workflows across multiple systems, targeting higher throughput without new headcount.',
    challenge: 'Operational intake spanned roles and systems; exec visibility was limited.',
    approach: 'Event bus + secure API gateway; AI triage; weekly exec summaries.',
    solution: [
      'Intake → AI Triage → Ops System automation',
      'Integration with existing stack',
      'Automated executive reporting'
    ],
    resultsTable: [
      ['Throughput increase', '—', '+22% (no new headcount)'],
      ['Integration', '—', 'Existing stack retained'],
      ['Exec reporting', '—', 'Automated weekly summaries']
    ],
    metrics: ['Modernized ops with intelligent triage'],
    tags: ['Operations', 'AI Triage', 'Integrations'],
    cta: {
      label: 'Book Feasibility Readout',
      href: '#contact'
    },
    seo: {
      title: 'Wellstead Case Study — Intelligent Ops Triage | Saipien Labs',
      description: 'How we modernized Wellstead\'s intake workflows with AI triage, increasing throughput by 22% without new headcount.'
    }
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(study => study.slug === slug);
}
