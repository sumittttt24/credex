import { type Metadata } from 'next';
import { createServerClient } from '@/lib/supabase';
import { type AuditResult } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { AuditResultsClient } from './client';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getAuditFromDb(id: string): Promise<AuditResult | null> {
  try {
    const supabase = createServerClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('audits')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    return {
      ...(data.results as unknown as AuditResult),
      id: data.id,
      aiSummary: data.ai_summary || undefined,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const audit = await getAuditFromDb(id);

  const savings = audit?.totalMonthlySavings || 0;
  const annual = audit?.totalAnnualSavings || 0;
  const toolCount = audit?.toolResults?.length || 0;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://stackaudit.com';

  const title = savings > 0
    ? `Saving ${formatCurrency(annual)}/yr on AI tools — StackAudit`
    : 'AI Spend Audit Results — StackAudit';

  const description = savings > 0
    ? `Free audit found ${formatCurrency(savings)}/mo in savings across ${toolCount} AI tool${toolCount !== 1 ? 's' : ''}.`
    : `AI spend audit across ${toolCount} tool${toolCount !== 1 ? 's' : ''} — already optimized!`;

  const ogImage = `${baseUrl}/api/og?savings=${savings}&annual=${annual}&tools=${toolCount}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: 'website',
      siteName: 'StackAudit',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function AuditPage({ params }: PageProps) {
  const { id } = await params;
  const serverAudit = await getAuditFromDb(id);

  return <AuditResultsClient auditId={id} serverAudit={serverAudit} />;
}
