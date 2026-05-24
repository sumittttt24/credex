// ============================================================
// StackAudit — Audit Rules & Cross-Tool Recommendation Matrix
// ============================================================

import { type AITool, type UseCase, type AuditAction } from './types';

// ---- Cross-tool alternatives ----

export interface Alternative {
  tool: AITool;
  toolName: string;
  plan: string;
  planName: string;
  monthlyPerSeat: number;
  reasoning: string;
  applicableUseCases: UseCase[];
}

// Maps: sourceTool -> alternatives sorted by value
export const CROSS_TOOL_ALTERNATIVES: Partial<Record<AITool, Alternative[]>> = {
  cursor: [
    {
      tool: 'github-copilot',
      toolName: 'GitHub Copilot',
      plan: 'pro',
      planName: 'Pro',
      monthlyPerSeat: 10,
      reasoning: 'GitHub Copilot Pro at $10/seat provides strong code completions and $10 in AI credits. For teams primarily needing inline completions, it\'s half the cost of Cursor Pro.',
      applicableUseCases: ['coding'],
    },
    {
      tool: 'windsurf',
      toolName: 'Windsurf',
      plan: 'pro',
      planName: 'Pro',
      monthlyPerSeat: 20,
      reasoning: 'Windsurf Pro at $20/seat offers comparable AI coding features with frontier model access. Similar pricing but may better fit teams already in the Codeium ecosystem.',
      applicableUseCases: ['coding'],
    },
  ],
  'github-copilot': [
    {
      tool: 'cursor',
      toolName: 'Cursor',
      plan: 'pro',
      planName: 'Pro',
      monthlyPerSeat: 20,
      reasoning: 'Cursor Pro at $20/seat offers superior agent-mode capabilities and multi-file editing. Worth the premium if your workflow relies heavily on AI-driven refactoring.',
      applicableUseCases: ['coding'],
    },
  ],
  chatgpt: [
    {
      tool: 'claude',
      toolName: 'Claude',
      plan: 'pro',
      planName: 'Pro',
      monthlyPerSeat: 20,
      reasoning: 'Claude Pro at $20/mo offers comparable capability for writing and research, with strong long-context support and Claude Code for development tasks.',
      applicableUseCases: ['writing', 'research', 'coding', 'mixed'],
    },
    {
      tool: 'gemini',
      toolName: 'Gemini',
      plan: 'ai-pro',
      planName: 'AI Pro',
      monthlyPerSeat: 20,
      reasoning: 'Gemini AI Pro at $20/mo includes Deep Research, 2TB storage, and NotebookLM Plus. Strong alternative for research and data analysis workflows.',
      applicableUseCases: ['research', 'data', 'writing'],
    },
    {
      tool: 'gemini',
      toolName: 'Gemini',
      plan: 'ai-plus',
      planName: 'AI Plus',
      monthlyPerSeat: 8,
      reasoning: 'Gemini AI Plus at $8/mo covers basic AI assistant needs. If you\'re not using ChatGPT\'s advanced features, this saves $12/mo per seat.',
      applicableUseCases: ['writing', 'research', 'mixed'],
    },
  ],
  claude: [
    {
      tool: 'chatgpt',
      toolName: 'ChatGPT',
      plan: 'plus',
      planName: 'Plus',
      monthlyPerSeat: 20,
      reasoning: 'ChatGPT Plus at $20/mo offers Agent Mode and Deep Research. Equivalent pricing but different strengths — better for teams needing web browsing and integrations.',
      applicableUseCases: ['research', 'mixed'],
    },
    {
      tool: 'gemini',
      toolName: 'Gemini',
      plan: 'ai-plus',
      planName: 'AI Plus',
      monthlyPerSeat: 8,
      reasoning: 'Gemini AI Plus at $8/mo covers basic AI needs at 60% less than Claude Pro. Suitable if you don\'t need Claude\'s advanced coding or long-context features.',
      applicableUseCases: ['writing', 'research', 'mixed'],
    },
  ],
  gemini: [
    {
      tool: 'claude',
      toolName: 'Claude',
      plan: 'pro',
      planName: 'Pro',
      monthlyPerSeat: 20,
      reasoning: 'Claude Pro at $20/mo offers superior coding assistance and long-context understanding. Worth considering if your primary use case is development.',
      applicableUseCases: ['coding'],
    },
  ],
  windsurf: [
    {
      tool: 'github-copilot',
      toolName: 'GitHub Copilot',
      plan: 'pro',
      planName: 'Pro',
      monthlyPerSeat: 10,
      reasoning: 'GitHub Copilot Pro at $10/seat is half the cost with solid code completion and AI credits. Good fit for teams needing basic AI coding assistance.',
      applicableUseCases: ['coding'],
    },
    {
      tool: 'cursor',
      toolName: 'Cursor',
      plan: 'pro',
      planName: 'Pro',
      monthlyPerSeat: 20,
      reasoning: 'Cursor Pro at $20/seat offers equivalent features with a larger user community and ecosystem. Same price point with potentially better agent capabilities.',
      applicableUseCases: ['coding'],
    },
  ],
};

// ---- Plan right-sizing rules ----

export interface RightSizingRule {
  condition: (seats: number, teamSize: number, planId: string) => boolean;
  suggestedPlan: string;
  suggestedPlanName: string;
  reasoning: (seats: number, currentPlan: string, suggestedPlan: string, priceDiff: number) => string;
}

export const PLAN_RIGHT_SIZING: Partial<Record<AITool, RightSizingRule[]>> = {
  cursor: [
    {
      condition: (seats, _teamSize, planId) => planId === 'teams' && seats < 3,
      suggestedPlan: 'pro',
      suggestedPlanName: 'Pro',
      reasoning: (seats, _curr, _sugg, diff) =>
        `Teams plan ($40/seat) for ${seats} seat${seats > 1 ? 's' : ''} provides admin features most small teams don't need. Pro ($20/seat) saves ${formatDiff(diff)}/mo with the same AI capabilities.`,
    },
    {
      condition: (_seats, _teamSize, planId) => planId === 'ultra',
      suggestedPlan: 'pro-plus',
      suggestedPlanName: 'Pro+',
      reasoning: (_seats, _curr, _sugg, diff) =>
        `Ultra ($200/seat) provides 20× credits — most users don't exhaust even 3× credits. Pro+ ($60/seat) saves ${formatDiff(diff)}/seat/mo while still providing 3× Pro capacity.`,
    },
    {
      condition: (seats, _teamSize, planId) => planId === 'pro-plus' && seats > 1,
      suggestedPlan: 'pro',
      suggestedPlanName: 'Pro',
      reasoning: (seats, _curr, _sugg, diff) =>
        `Pro+ ($60/seat) for ${seats} seats is $${seats * 60}/mo. Unless your team consistently exhausts Pro credits, Pro ($20/seat) at $${seats * 20}/mo saves ${formatDiff(diff)}/mo.`,
    },
  ],
  'github-copilot': [
    {
      condition: (seats, _teamSize, planId) => planId === 'enterprise' && seats < 10,
      suggestedPlan: 'business',
      suggestedPlanName: 'Business',
      reasoning: (seats, _curr, _sugg, diff) =>
        `Enterprise ($39/seat + ~$21 GH Enterprise Cloud) for ${seats} seats is overkill. Business ($19/seat) provides pooled credits and org management, saving ${formatDiff(diff)}/mo.`,
    },
    {
      condition: (_seats, _teamSize, planId) => planId === 'pro-plus',
      suggestedPlan: 'pro',
      suggestedPlanName: 'Pro',
      reasoning: (_seats, _curr, _sugg, diff) =>
        `Pro+ ($39/seat) provides $39 in AI credits. If you're not exhausting the $10 credits in Pro ($10/seat), downgrading saves ${formatDiff(diff)}/seat/mo.`,
    },
  ],
  claude: [
    {
      condition: (seats, _teamSize, planId) => planId === 'team-premium' && seats < 8,
      suggestedPlan: 'team-standard',
      suggestedPlanName: 'Team Standard',
      reasoning: (seats, _curr, _sugg, diff) =>
        `Team Premium ($125/seat) for ${seats} seats includes full Claude Code — but Team Standard ($25/seat) covers most collaboration needs, saving ${formatDiff(diff)}/mo.`,
    },
    {
      condition: (_seats, _teamSize, planId) => planId === 'max-20x',
      suggestedPlan: 'max-5x',
      suggestedPlanName: 'Max 5x',
      reasoning: (_seats, _curr, _sugg, diff) =>
        `Max 20x ($200/mo) provides 20× capacity — most power users don't exceed 5× regularly. Max 5x ($100/mo) saves ${formatDiff(diff)}/mo while still providing ample headroom.`,
    },
    {
      condition: (seats, _teamSize, planId) => (planId === 'team-standard' || planId === 'team-premium') && seats < 5,
      suggestedPlan: 'pro',
      suggestedPlanName: 'Pro',
      reasoning: (seats, curr, _sugg, diff) =>
        `${curr} requires minimum 5 seats but you have ${seats}. Individual Pro plans ($20/seat) eliminate the minimum seat requirement, saving ${formatDiff(diff)}/mo.`,
    },
  ],
  chatgpt: [
    {
      condition: (seats, _teamSize, planId) => planId === 'business' && seats < 2,
      suggestedPlan: 'plus',
      suggestedPlanName: 'Plus',
      reasoning: (_seats, _curr, _sugg, diff) =>
        `Business ($25/seat) is designed for teams of 2+. For a single user, Plus ($20/mo) provides the same model access and saves ${formatDiff(diff)}/mo.`,
    },
    {
      condition: (_seats, _teamSize, planId) => planId === 'pro-20x',
      suggestedPlan: 'pro-5x',
      suggestedPlanName: 'Pro 5x',
      reasoning: (_seats, _curr, _sugg, diff) =>
        `Pro 20x ($200/mo) provides 20× limits and 1M context. Unless you regularly hit 5x limits, Pro 5x ($100/mo) saves ${formatDiff(diff)}/mo with 5× Plus capacity.`,
    },
  ],
  gemini: [
    {
      condition: (_seats, _teamSize, planId) => planId === 'ai-ultra-200',
      suggestedPlan: 'ai-ultra-100',
      suggestedPlanName: 'AI Ultra',
      reasoning: (_seats, _curr, _sugg, diff) =>
        `AI Ultra Max ($200/mo) provides 20× limits and Deep Think. AI Ultra ($100/mo) provides 5× limits which covers most use cases, saving ${formatDiff(diff)}/mo.`,
    },
  ],
  windsurf: [
    {
      condition: (seats, _teamSize, planId) => planId === 'teams' && seats < 3,
      suggestedPlan: 'pro',
      suggestedPlanName: 'Pro',
      reasoning: (seats, _curr, _sugg, diff) =>
        `Teams ($40/seat) for ${seats} seat${seats > 1 ? 's' : ''} adds admin overhead most small teams don't use. Pro ($20/seat) saves ${formatDiff(diff)}/mo with the same AI features.`,
    },
    {
      condition: (_seats, _teamSize, planId) => planId === 'max',
      suggestedPlan: 'pro',
      suggestedPlanName: 'Pro',
      reasoning: (_seats, _curr, _sugg, diff) =>
        `Max ($200/seat) provides significantly higher quotas. Unless you're consistently hitting Pro limits, Pro ($20/seat) saves ${formatDiff(diff)}/seat/mo.`,
    },
  ],
};

// ---- API optimization rules ----

export interface ApiOptimizationResult {
  action: AuditAction;
  reasoning: string;
  suggestedMonthlySpend: number;
}

export function evaluateApiSpend(
  tool: AITool,
  monthlySpend: number,
  _useCase: UseCase
): ApiOptimizationResult | null {
  if (tool !== 'anthropic-api' && tool !== 'openai-api') return null;
  if (monthlySpend === 0) return null;

  // High API spend — suggest Credex credits
  if (monthlySpend > 500) {
    const optimizedSpend = Math.round(monthlySpend * 0.75); // ~25% savings via credits
    return {
      action: 'optimize',
      reasoning: `$${monthlySpend}/mo in API spend qualifies for volume credits through Credex, typically saving 20-30%. Estimated spend with credits: $${optimizedSpend}/mo. Also consider batch API (50% off) for non-latency-sensitive workloads.`,
      suggestedMonthlySpend: optimizedSpend,
    };
  }

  // Medium API spend — suggest batch API and caching
  if (monthlySpend > 100) {
    const optimizedSpend = Math.round(monthlySpend * 0.85); // ~15% savings via optimization
    return {
      action: 'optimize',
      reasoning: `At $${monthlySpend}/mo, you can reduce costs by using batch API (50% off for async workloads) and prompt caching (up to 90% off cached inputs). Estimated savings: ~15% ($${monthlySpend - optimizedSpend}/mo).`,
      suggestedMonthlySpend: optimizedSpend,
    };
  }

  return null;
}

// ---- Helpers ----

function formatDiff(amount: number): string {
  return `$${Math.abs(Math.round(amount))}`;
}

export function getAlternatives(tool: AITool, useCase: UseCase): Alternative[] {
  const alts = CROSS_TOOL_ALTERNATIVES[tool] || [];
  return alts
    .filter((alt) => alt.applicableUseCases.includes(useCase))
    .sort((a, b) => a.monthlyPerSeat - b.monthlyPerSeat);
}
