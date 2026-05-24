'use client';

import { type ToolAuditResult } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface AuditCardProps {
  result: ToolAuditResult;
  index: number;
}

const ACTION_STYLES: Record<string, { bg: string; border: string; badge: string; label: string; icon: string }> = {
  keep: {
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/20',
    badge: 'bg-emerald-500/10 text-emerald-400',
    label: 'Optimized',
    icon: '✓',
  },
  downgrade: {
    bg: 'bg-sky-500/5',
    border: 'border-sky-500/20',
    badge: 'bg-sky-500/10 text-sky-400',
    label: 'Downgrade',
    icon: '↓',
  },
  switch: {
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/20',
    badge: 'bg-amber-500/10 text-amber-400',
    label: 'Switch',
    icon: '⇄',
  },
  optimize: {
    bg: 'bg-violet-500/5',
    border: 'border-violet-500/20',
    badge: 'bg-violet-500/10 text-violet-400',
    label: 'Optimize',
    icon: '⚡',
  },
};

export function AuditCard({ result, index }: AuditCardProps) {
  const style = ACTION_STYLES[result.recommendedAction] || ACTION_STYLES.keep;
  const hasSavings = result.monthlySavings > 0;

  return (
    <div
      className={`${style.bg} border ${style.border} rounded-xl p-5 sm:p-6 transition-all duration-500 hover:scale-[1.01] opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.badge}`}>
              <span>{style.icon}</span>
              {style.label}
            </span>
            <h3 className="text-base font-semibold text-white">{result.toolName}</h3>
          </div>

          {/* Current → Recommended */}
          <div className="flex items-center gap-3 text-sm mb-3">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Current:</span>
              <span className="text-zinc-300 font-medium">{result.currentPlanName}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">{formatCurrency(result.currentSpend)}/mo</span>
              {result.seats > 1 && (
                <span className="text-zinc-600 text-xs">({result.seats} seats)</span>
              )}
            </div>
          </div>

          {hasSavings && (
            <div className="flex items-center gap-3 text-sm mb-4">
              <span className="text-zinc-600">→</span>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">Recommended:</span>
                <span className="text-white font-medium">
                  {result.recommendedToolName || result.toolName} {result.recommendedPlanName || ''}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-emerald-400 font-medium">{formatCurrency(result.newSpend)}/mo</span>
              </div>
            </div>
          )}

          {/* Reasoning */}
          <p className="text-sm text-zinc-400 leading-relaxed">{result.reasoning}</p>
        </div>

        {/* Savings badge */}
        {hasSavings && (
          <div className="flex-shrink-0 text-right">
            <div className="px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs text-emerald-500/70 mb-0.5">Save</p>
              <p className="text-lg font-bold text-emerald-400">
                {formatCurrency(result.monthlySavings)}
              </p>
              <p className="text-[10px] text-emerald-500/50">/month</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
