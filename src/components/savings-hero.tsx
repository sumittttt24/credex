'use client';

import { useEffect, useState, useRef } from 'react';
import { formatCurrency } from '@/lib/utils';

interface SavingsHeroProps {
  monthlySavings: number;
  annualSavings: number;
  isOptimal: boolean;
  totalCurrent: number;
}

function useCountUp(target: number, duration: number = 2000) {
  const [current, setCurrent] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (target <= 0) {
      setCurrent(0);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(target * eased));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [target, duration]);

  return current;
}

export function SavingsHero({ monthlySavings, annualSavings, isOptimal, totalCurrent }: SavingsHeroProps) {
  const monthlyCount = useCountUp(monthlySavings);
  const annualCount = useCountUp(annualSavings);
  const savingsPercent = totalCurrent > 0 ? Math.round((monthlySavings / totalCurrent) * 100) : 0;

  if (isOptimal) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-teal-500/10 border border-emerald-500/20 p-8 sm:p-12 text-center">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent animate-pulse" />

        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-2">
            Your stack is optimized!
          </h2>
          <p className="text-zinc-400 text-lg">
            You&apos;re spending {formatCurrency(totalCurrent)}/mo wisely. No changes needed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-fuchsia-500/10 border border-violet-500/20 p-8 sm:p-12">
      {/* Animated background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative text-center">
        <p className="text-sm text-violet-400/70 uppercase tracking-widest font-medium mb-4">
          Total Potential Savings
        </p>

        {/* Monthly savings — big number */}
        <div className="mb-2">
          <span className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
            {formatCurrency(monthlyCount)}
          </span>
          <span className="text-2xl sm:text-3xl text-zinc-500 font-medium ml-2">/mo</span>
        </div>

        {/* Annual savings */}
        <p className="text-xl sm:text-2xl text-zinc-400 mb-6">
          <span className="text-white font-semibold">{formatCurrency(annualCount)}</span>
          <span className="text-zinc-500"> /year</span>
          {savingsPercent > 0 && (
            <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {savingsPercent}% reduction
            </span>
          )}
        </p>

        {/* Current vs Optimized */}
        <div className="flex items-center justify-center gap-8 text-sm">
          <div>
            <p className="text-zinc-600 mb-1">Current</p>
            <p className="text-lg font-semibold text-zinc-400">{formatCurrency(totalCurrent)}/mo</p>
          </div>
          <div className="text-zinc-700">→</div>
          <div>
            <p className="text-zinc-600 mb-1">Optimized</p>
            <p className="text-lg font-semibold text-emerald-400">{formatCurrency(totalCurrent - monthlySavings)}/mo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
