'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { type AITool, type ToolEntry, type UseCase } from '@/lib/types';
import { TOOLS, USE_CASE_LABELS } from '@/lib/pricing-data';
import { ToolSelector } from './tool-selector';
import { nanoid } from 'nanoid';

const STORAGE_KEY = 'stackaudit_form_state';

interface FormState {
  tools: ToolEntry[];
  teamSize: number;
  useCase: UseCase;
}

const DEFAULT_STATE: FormState = {
  tools: [],
  teamSize: 1,
  useCase: 'coding',
};

export function SpendForm() {
  const router = useRouter();
  const [state, setState] = useState<FormState>(DEFAULT_STATE);
  const [showToolSelector, setShowToolSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hydrated, setHydrated] = useState(false);

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState({ ...DEFAULT_STATE, ...parsed });
      }
    } catch {}
    setHydrated(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {}
    }
  }, [state, hydrated]);

  const addTool = useCallback((tool: AITool) => {
    const toolInfo = TOOLS[tool];
    const defaultPlan = toolInfo.plans.find(p => p.monthlyPerSeat > 0) || toolInfo.plans[0];
    setState(prev => ({
      ...prev,
      tools: [
        ...prev.tools,
        {
          id: nanoid(8),
          tool,
          plan: defaultPlan.id,
          monthlySpend: defaultPlan.monthlyPerSeat,
          seats: 1,
        },
      ],
    }));
  }, []);

  const removeTool = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      tools: prev.tools.filter(t => t.id !== id),
    }));
  }, []);

  const updateTool = useCallback((id: string, updates: Partial<ToolEntry>) => {
    setState(prev => ({
      ...prev,
      tools: prev.tools.map(t => (t.id === id ? { ...t, ...updates } : t)),
    }));
  }, []);

  const handlePlanChange = useCallback((id: string, planId: string, tool: AITool) => {
    const planInfo = TOOLS[tool].plans.find(p => p.id === planId);
    const entry = state.tools.find(t => t.id === id);
    if (planInfo && entry) {
      updateTool(id, {
        plan: planId,
        monthlySpend: planInfo.isApiPlan ? entry.monthlySpend : planInfo.monthlyPerSeat * entry.seats,
      });
    }
  }, [state.tools, updateTool]);

  const handleSeatsChange = useCallback((id: string, seats: number) => {
    const entry = state.tools.find(t => t.id === id);
    if (entry) {
      const planInfo = TOOLS[entry.tool].plans.find(p => p.id === entry.plan);
      updateTool(id, {
        seats,
        monthlySpend: planInfo?.isApiPlan ? entry.monthlySpend : (planInfo?.monthlyPerSeat || 0) * seats,
      });
    }
  }, [state.tools, updateTool]);

  const handleSubmit = async () => {
    if (state.tools.length === 0) {
      setError('Add at least one AI tool to audit.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tools: state.tools,
          teamSize: state.teamSize,
          useCase: state.useCase,
          website: '', // honeypot
        }),
      });

      const data = await res.json();
      if (data.success && data.data?.id) {
        // Store result in sessionStorage for immediate display
        sessionStorage.setItem(`audit_${data.data.id}`, JSON.stringify(data.data));
        router.push(`/audit/${data.data.id}`);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalMonthly = state.tools.reduce((sum, t) => sum + t.monthlySpend, 0);
  const selectedTools = state.tools.map(t => t.tool);

  if (!hydrated) {
    return (
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 animate-pulse">
        <div className="h-8 bg-white/5 rounded-lg w-48 mb-6" />
        <div className="h-32 bg-white/5 rounded-lg" />
      </div>
    );
  }

  return (
    <div id="audit-form" className="space-y-6">
      {/* Tool Entries */}
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Your AI Tools</h2>
            <p className="text-sm text-zinc-500 mt-1">Add each tool your team pays for</p>
          </div>
          {totalMonthly > 0 && (
            <div className="text-right">
              <p className="text-xs text-zinc-500">Current total</p>
              <p className="text-lg font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                ${totalMonthly.toLocaleString()}/mo
              </p>
            </div>
          )}
        </div>

        {state.tools.length === 0 ? (
          <button
            onClick={() => setShowToolSelector(true)}
            className="w-full py-12 rounded-xl border-2 border-dashed border-white/10 hover:border-violet-500/30 bg-white/[0.02] hover:bg-violet-500/5 transition-all duration-300 group"
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-violet-400">+</span>
              </div>
              <p className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                Add your first AI tool
              </p>
              <p className="text-xs text-zinc-600 mt-1">Cursor, Copilot, Claude, ChatGPT, and more</p>
            </div>
          </button>
        ) : (
          <div className="space-y-3">
            {state.tools.map((entry) => {
              const toolInfo = TOOLS[entry.tool];
              const currentPlan = toolInfo.plans.find(p => p.id === entry.plan);
              const isApi = currentPlan?.isApiPlan;

              return (
                <div
                  key={entry.id}
                  className="bg-white/[0.03] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    {/* Tool name */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center text-violet-400 font-bold text-sm">
                        {toolInfo.name.charAt(0)}
                      </div>
                    </div>

                    {/* Fields */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Plan */}
                      <div>
                        <label className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1 block">
                          Plan
                        </label>
                        <select
                          value={entry.plan}
                          onChange={(e) => handlePlanChange(entry.id, e.target.value, entry.tool)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-colors appearance-none"
                        >
                          {toolInfo.plans.map((plan) => (
                            <option key={plan.id} value={plan.id} className="bg-zinc-900">
                              {plan.name} {plan.monthlyPerSeat > 0 && !plan.isApiPlan ? `($${plan.monthlyPerSeat}/seat)` : plan.isApiPlan ? '(usage-based)' : '(free)'}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Seats */}
                      <div>
                        <label className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1 block">
                          Seats
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={entry.seats}
                          onChange={(e) => handleSeatsChange(entry.id, Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-colors"
                        />
                      </div>

                      {/* Monthly Spend */}
                      <div>
                        <label className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1 block">
                          Monthly Spend ($)
                        </label>
                        <input
                          type="number"
                          min={0}
                          step={isApi ? 10 : 1}
                          value={entry.monthlySpend}
                          onChange={(e) => updateTool(entry.id, { monthlySpend: Math.max(0, parseFloat(e.target.value) || 0) })}
                          className={`w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-colors ${!isApi ? 'opacity-60' : ''}`}
                          readOnly={!isApi}
                        />
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeTool(entry.id)}
                      className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-red-500/10 flex items-center justify-center text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Plan info */}
                  {currentPlan && (
                    <div className="mt-2 ml-14 flex flex-wrap gap-1.5">
                      {currentPlan.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-500">
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => setShowToolSelector(true)}
              className="w-full py-3 rounded-xl border border-dashed border-white/10 hover:border-violet-500/30 bg-white/[0.01] hover:bg-violet-500/5 text-sm text-zinc-500 hover:text-violet-400 transition-all duration-200"
            >
              + Add another tool
            </button>
          </div>
        )}
      </div>

      {/* Team Info */}
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-white mb-6">Team Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] text-zinc-500 uppercase tracking-wider mb-2 block">
              Team Size
            </label>
            <input
              type="number"
              min={1}
              value={state.teamSize}
              onChange={(e) => setState(prev => ({ ...prev, teamSize: Math.max(1, parseInt(e.target.value) || 1) }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-colors"
              placeholder="Number of team members"
            />
          </div>
          <div>
            <label className="text-[11px] text-zinc-500 uppercase tracking-wider mb-2 block">
              Primary Use Case
            </label>
            <select
              value={state.useCase}
              onChange={(e) => setState(prev => ({ ...prev, useCase: e.target.value as UseCase }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-colors appearance-none"
            >
              {Object.entries(USE_CASE_LABELS).map(([value, label]) => (
                <option key={value} value={value} className="bg-zinc-900">
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Honeypot (hidden) */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {/* Submit */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || state.tools.length === 0}
        className="w-full py-4 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-xl shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-[1.01] active:scale-[0.99] relative overflow-hidden group"
      >
        <span className={loading ? 'opacity-0' : ''}>
          🔍 Run Free Audit
        </span>
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </span>
        )}
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </button>

      {/* Tool Selector Modal */}
      {showToolSelector && (
        <ToolSelector
          onSelect={addTool}
          selectedTools={selectedTools}
          onClose={() => setShowToolSelector(false)}
        />
      )}
    </div>
  );
}
