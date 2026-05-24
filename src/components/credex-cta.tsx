'use client';

import { formatCurrency } from '@/lib/utils';

interface CredexCtaProps {
  savings: number;
}

export function CredexCta({ savings }: CredexCtaProps) {
  if (savings < 500) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-fuchsia-500/10 border border-violet-500/30 p-6 sm:p-8">
      {/* Animated shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />

      <div className="relative">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/25">
            <span className="text-xl">💎</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Save even more with Credex
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              At {formatCurrency(savings)}/mo in potential savings, you qualify for a free Credex consultation.
              Our specialists help teams optimize AI spend through volume credits, consolidated billing,
              and vendor management — typically unlocking an additional 15–30% beyond what this audit found.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 ml-0 sm:ml-16">
          <a
            href="https://credex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] overflow-hidden group"
          >
            <span>Book Free Consultation</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </a>
          <span className="text-xs text-zinc-600">No commitment · 30 min call</span>
        </div>
      </div>
    </div>
  );
}
