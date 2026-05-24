'use client';

import { useState, useEffect } from 'react';
import { type AuditResult } from '@/lib/types';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SavingsHero } from '@/components/savings-hero';
import { AuditCard } from '@/components/audit-card';
import { LeadCapture } from '@/components/lead-capture';
import { ShareButtons } from '@/components/share-buttons';
import { CredexCta } from '@/components/credex-cta';

interface AuditResultsClientProps {
  auditId: string;
  serverAudit: AuditResult | null;
}

export function AuditResultsClient({ auditId, serverAudit }: AuditResultsClientProps) {
  const [audit, setAudit] = useState<AuditResult | null>(serverAudit);
  const [loading, setLoading] = useState(!serverAudit);

  // Try to load from sessionStorage if not available from server
  useEffect(() => {
    if (!audit) {
      try {
        const cached = sessionStorage.getItem(`audit_${auditId}`);
        if (cached) {
          setAudit(JSON.parse(cached));
          setLoading(false);
          return;
        }
      } catch {}
      // If no cached data and no server data, show error state
      setLoading(false);
    }
  }, [audit, auditId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin mx-auto mb-4" />
            <p className="text-zinc-500">Loading your audit results...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!audit) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🔍</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Audit Not Found</h1>
            <p className="text-zinc-500 mb-6">
              This audit may have expired or the link is invalid. Run a new audit to get your results.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/20"
            >
              ← Run New Audit
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isOptimal = audit.totalMonthlySavings <= 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Back link + Share */}
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors flex items-center gap-1"
            >
              ← New Audit
            </a>
            <ShareButtons auditId={auditId} savings={audit.totalAnnualSavings} />
          </div>

          {/* Savings Hero */}
          <SavingsHero
            monthlySavings={audit.totalMonthlySavings}
            annualSavings={audit.totalAnnualSavings}
            isOptimal={isOptimal}
            totalCurrent={audit.totalCurrentSpend}
          />

          {/* AI Summary */}
          {audit.aiSummary && (
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm">✨</span>
                <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                  AI-Powered Analysis
                </h2>
              </div>
              <p className="text-zinc-300 leading-relaxed">{audit.aiSummary}</p>
            </div>
          )}

          {/* Credex CTA (for high savings) */}
          <CredexCta savings={audit.totalMonthlySavings} />

          {/* Per-tool breakdown */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">Tool-by-Tool Breakdown</h2>
            <p className="text-sm text-zinc-600 mb-6">
              {audit.toolResults.length} tool{audit.toolResults.length !== 1 ? 's' : ''} analyzed
            </p>
            <div className="space-y-4">
              {audit.toolResults.map((result, index) => (
                <AuditCard key={`${result.tool}-${index}`} result={result} index={index} />
              ))}
            </div>
          </div>

          {/* Lead Capture */}
          <LeadCapture auditId={auditId} savings={audit.totalMonthlySavings} />

          {/* Run another audit */}
          <div className="text-center pt-4">
            <a
              href="/"
              className="text-sm text-zinc-600 hover:text-violet-400 transition-colors"
            >
              ← Run another audit
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
