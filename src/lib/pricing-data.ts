// ============================================================
// StackAudit — Complete AI Tool Pricing Database
// All prices verified May 2026. Sources in PRICING_DATA.md
// ============================================================

import { type AITool, type ToolInfo, type UseCase } from './types';

export const TOOLS: Record<AITool, ToolInfo> = {
  cursor: {
    id: 'cursor',
    name: 'Cursor',
    category: 'ide',
    vendor: 'Anysphere',
    pricingUrl: 'https://cursor.com/pricing',
    icon: '/tool-icons/cursor.svg',
    plans: [
      {
        id: 'hobby',
        name: 'Hobby',
        monthlyPerSeat: 0,
        features: ['Limited agent requests', 'Limited tab completions', 'Basic models'],
        bestFor: ['coding'],
      },
      {
        id: 'pro',
        name: 'Pro',
        monthlyPerSeat: 20,
        features: ['Unlimited tab completions', 'Extended agent limits', 'All frontier models', '$20/mo credit pool'],
        bestFor: ['coding'],
      },
      {
        id: 'pro-plus',
        name: 'Pro+',
        monthlyPerSeat: 60,
        features: ['3× Pro credits', 'All frontier models', 'Higher agent limits'],
        bestFor: ['coding'],
      },
      {
        id: 'ultra',
        name: 'Ultra',
        monthlyPerSeat: 200,
        features: ['20× Pro credits', 'Priority access', 'All frontier models'],
        bestFor: ['coding'],
      },
      {
        id: 'teams',
        name: 'Teams',
        monthlyPerSeat: 40,
        minSeats: 2,
        features: ['Everything in Pro', 'Centralized billing', 'Usage analytics', 'SAML/OIDC SSO', 'RBAC'],
        bestFor: ['coding'],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        monthlyPerSeat: 40, // base estimate; custom pricing
        minSeats: 10,
        features: ['Pooled usage', 'Invoice billing', 'SCIM', 'Priority support', 'Audit logs'],
        bestFor: ['coding'],
      },
    ],
  },

  'github-copilot': {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'ide',
    vendor: 'GitHub / Microsoft',
    pricingUrl: 'https://github.com/features/copilot',
    icon: '/tool-icons/github-copilot.svg',
    plans: [
      {
        id: 'free',
        name: 'Free',
        monthlyPerSeat: 0,
        features: ['Limited usage', 'Basic completions'],
        bestFor: ['coding'],
      },
      {
        id: 'pro',
        name: 'Pro',
        monthlyPerSeat: 10,
        features: ['$10 AI credits', 'Code completions', 'Next Edit suggestions'],
        bestFor: ['coding'],
      },
      {
        id: 'pro-plus',
        name: 'Pro+',
        monthlyPerSeat: 39,
        features: ['$39 AI credits', 'Agent mode', 'All models'],
        bestFor: ['coding'],
      },
      {
        id: 'business',
        name: 'Business',
        monthlyPerSeat: 19,
        minSeats: 2,
        features: ['$19 AI credits per seat', 'Pooled usage', 'Organization management', 'Policy controls'],
        bestFor: ['coding'],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        monthlyPerSeat: 39,
        minSeats: 5,
        features: ['$39 credits/seat', 'Requires GH Enterprise Cloud (~$21/seat extra)', 'Knowledge bases', 'Fine-tuned models'],
        bestFor: ['coding'],
      },
    ],
  },

  claude: {
    id: 'claude',
    name: 'Claude',
    category: 'chatbot',
    vendor: 'Anthropic',
    pricingUrl: 'https://claude.ai/pricing',
    icon: '/tool-icons/claude.svg',
    plans: [
      {
        id: 'free',
        name: 'Free',
        monthlyPerSeat: 0,
        features: ['Sonnet/Haiku access', 'Daily limits', 'Basic features'],
        bestFor: ['writing', 'research', 'coding', 'data', 'mixed'],
      },
      {
        id: 'pro',
        name: 'Pro',
        monthlyPerSeat: 20,
        features: ['All models incl. Opus', 'Claude Code', 'Projects', 'Artifacts', 'Higher limits'],
        bestFor: ['writing', 'research', 'coding', 'data', 'mixed'],
      },
      {
        id: 'max-5x',
        name: 'Max 5x',
        monthlyPerSeat: 100,
        features: ['5× Pro usage', 'Priority access', 'All features'],
        bestFor: ['coding', 'data', 'mixed'],
      },
      {
        id: 'max-20x',
        name: 'Max 20x',
        monthlyPerSeat: 200,
        features: ['20× Pro usage', 'Highest priority', 'All features'],
        bestFor: ['coding', 'data'],
      },
      {
        id: 'team-standard',
        name: 'Team Standard',
        monthlyPerSeat: 25,
        minSeats: 5,
        features: ['Collaboration', 'Central billing', 'Admin controls'],
        bestFor: ['writing', 'research', 'coding', 'data', 'mixed'],
      },
      {
        id: 'team-premium',
        name: 'Team Premium',
        monthlyPerSeat: 125,
        minSeats: 5,
        features: ['Full Claude Code access', 'Engineering team features'],
        bestFor: ['coding'],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        monthlyPerSeat: 30, // estimated base
        minSeats: 20,
        features: ['SSO', 'Audit logging', 'Annual contract', 'Custom limits'],
        bestFor: ['writing', 'research', 'coding', 'data', 'mixed'],
      },
    ],
  },

  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'chatbot',
    vendor: 'OpenAI',
    pricingUrl: 'https://openai.com/chatgpt/pricing',
    icon: '/tool-icons/chatgpt.svg',
    plans: [
      {
        id: 'free',
        name: 'Free',
        monthlyPerSeat: 0,
        features: ['Basic access', 'Limited GPT-4o'],
        bestFor: ['writing', 'research', 'mixed'],
      },
      {
        id: 'plus',
        name: 'Plus',
        monthlyPerSeat: 20,
        features: ['Full model access', 'Deep Research', 'Agent Mode', 'Advanced Voice'],
        bestFor: ['writing', 'research', 'coding', 'data', 'mixed'],
      },
      {
        id: 'pro-5x',
        name: 'Pro 5x',
        monthlyPerSeat: 100,
        features: ['5× Plus limits', 'All features'],
        bestFor: ['coding', 'data', 'research'],
      },
      {
        id: 'pro-20x',
        name: 'Pro 20x',
        monthlyPerSeat: 200,
        features: ['20× Plus limits', '1M token context'],
        bestFor: ['coding', 'data'],
      },
      {
        id: 'business',
        name: 'Business',
        monthlyPerSeat: 25,
        minSeats: 2,
        features: ['Shared workspaces', 'Admin console', 'SAML SSO', 'SOC 2 Type II'],
        bestFor: ['writing', 'research', 'coding', 'data', 'mixed'],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        monthlyPerSeat: 50, // estimated mid-range
        minSeats: 150,
        features: ['SCIM', 'RBAC', 'Data residency', '24/7 priority support'],
        bestFor: ['writing', 'research', 'coding', 'data', 'mixed'],
      },
    ],
  },

  'anthropic-api': {
    id: 'anthropic-api',
    name: 'Anthropic API',
    category: 'api',
    vendor: 'Anthropic',
    pricingUrl: 'https://www.anthropic.com/pricing',
    icon: '/tool-icons/anthropic-api.svg',
    plans: [
      {
        id: 'opus',
        name: 'Claude Opus 4.7',
        monthlyPerSeat: 0, // usage-based
        isApiPlan: true,
        features: ['$5/MTok input', '$25/MTok output', 'Most capable model', 'Batch 50% off'],
        bestFor: ['coding', 'writing', 'research', 'data', 'mixed'],
      },
      {
        id: 'sonnet',
        name: 'Claude Sonnet 4.6',
        monthlyPerSeat: 0,
        isApiPlan: true,
        features: ['$3/MTok input', '$15/MTok output', 'Best balance', 'Batch 50% off'],
        bestFor: ['coding', 'writing', 'research', 'data', 'mixed'],
      },
      {
        id: 'haiku',
        name: 'Claude Haiku 4.5',
        monthlyPerSeat: 0,
        isApiPlan: true,
        features: ['$1/MTok input', '$5/MTok output', 'Fastest & cheapest', 'Batch 50% off'],
        bestFor: ['coding', 'writing', 'data', 'mixed'],
      },
    ],
  },

  'openai-api': {
    id: 'openai-api',
    name: 'OpenAI API',
    category: 'api',
    vendor: 'OpenAI',
    pricingUrl: 'https://openai.com/api/pricing',
    icon: '/tool-icons/openai-api.svg',
    plans: [
      {
        id: 'gpt-4o',
        name: 'GPT-4o',
        monthlyPerSeat: 0,
        isApiPlan: true,
        features: ['$2.50/MTok input', '$10/MTok output', 'Multimodal', 'Cached 50% off'],
        bestFor: ['coding', 'writing', 'research', 'data', 'mixed'],
      },
      {
        id: 'gpt-4-1',
        name: 'GPT-4.1',
        monthlyPerSeat: 0,
        isApiPlan: true,
        features: ['$2/MTok input', '$8/MTok output', 'Latest generation', 'Cached 50% off'],
        bestFor: ['coding', 'writing', 'research', 'data', 'mixed'],
      },
      {
        id: 'gpt-4-1-mini',
        name: 'GPT-4.1 Mini',
        monthlyPerSeat: 0,
        isApiPlan: true,
        features: ['$0.40/MTok input', '$1.60/MTok output', 'Cost-efficient', 'Cached 50% off'],
        bestFor: ['coding', 'writing', 'data', 'mixed'],
      },
      {
        id: 'gpt-4-1-nano',
        name: 'GPT-4.1 Nano',
        monthlyPerSeat: 0,
        isApiPlan: true,
        features: ['$0.10/MTok input', '$0.40/MTok output', 'Ultra-cheap', 'Batch 50% off'],
        bestFor: ['data', 'mixed'],
      },
      {
        id: 'o3',
        name: 'o3',
        monthlyPerSeat: 0,
        isApiPlan: true,
        features: ['$2/MTok input', '$8/MTok output', 'Reasoning model'],
        bestFor: ['coding', 'research', 'data'],
      },
      {
        id: 'o4-mini',
        name: 'o4-mini',
        monthlyPerSeat: 0,
        isApiPlan: true,
        features: ['$0.55/MTok input', '$2.20/MTok output', 'Efficient reasoning'],
        bestFor: ['coding', 'data'],
      },
    ],
  },

  gemini: {
    id: 'gemini',
    name: 'Gemini',
    category: 'chatbot',
    vendor: 'Google',
    pricingUrl: 'https://gemini.google.com',
    icon: '/tool-icons/gemini.svg',
    plans: [
      {
        id: 'free',
        name: 'Free',
        monthlyPerSeat: 0,
        features: ['Basic access', 'Flash model only', 'Daily limits'],
        bestFor: ['writing', 'research', 'mixed'],
      },
      {
        id: 'ai-plus',
        name: 'AI Plus',
        monthlyPerSeat: 8, // $7.99 rounded
        features: ['200GB storage', 'Advanced Gemini', 'Daily limits'],
        bestFor: ['writing', 'research', 'mixed'],
      },
      {
        id: 'ai-pro',
        name: 'AI Pro',
        monthlyPerSeat: 20, // $19.99 rounded
        features: ['2TB storage', 'Gemini 3.1 Pro', 'Deep Research', 'NotebookLM Plus'],
        bestFor: ['writing', 'research', 'data', 'mixed'],
      },
      {
        id: 'ai-ultra-100',
        name: 'AI Ultra',
        monthlyPerSeat: 100,
        features: ['20TB storage', '5× Pro limits', 'Gemini 3.5 Flash', 'YouTube Premium'],
        bestFor: ['coding', 'writing', 'research', 'data', 'mixed'],
      },
      {
        id: 'ai-ultra-200',
        name: 'AI Ultra Max',
        monthlyPerSeat: 200,
        features: ['20× limits', 'Deep Think', 'Gemini Spark', 'Project Genie', 'Priority'],
        bestFor: ['coding', 'data'],
      },
    ],
  },

  windsurf: {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'ide',
    vendor: 'Codeium',
    pricingUrl: 'https://windsurf.com/pricing',
    icon: '/tool-icons/windsurf.svg',
    plans: [
      {
        id: 'free',
        name: 'Free',
        monthlyPerSeat: 0,
        features: ['Light agent quota', 'Unlimited tab completions', 'Basic models'],
        bestFor: ['coding'],
      },
      {
        id: 'pro',
        name: 'Pro',
        monthlyPerSeat: 20,
        features: ['Increased quotas', 'Frontier models', 'All features'],
        bestFor: ['coding'],
      },
      {
        id: 'max',
        name: 'Max',
        monthlyPerSeat: 200,
        features: ['Significantly higher quotas', 'Priority access'],
        bestFor: ['coding'],
      },
      {
        id: 'teams',
        name: 'Teams',
        monthlyPerSeat: 40,
        minSeats: 2,
        features: ['Everything in Pro', 'Centralized billing', 'Admin', 'Team management'],
        bestFor: ['coding'],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        monthlyPerSeat: 40,
        minSeats: 10,
        features: ['RBAC', 'SSO/SCIM', 'Dedicated support', 'Hybrid deployment'],
        bestFor: ['coding'],
      },
    ],
  },
};

// Helper functions
export function getToolInfo(toolId: AITool): ToolInfo {
  return TOOLS[toolId];
}

export function getToolPlans(toolId: AITool): ToolInfo['plans'] {
  return TOOLS[toolId].plans;
}

export function getPlanInfo(toolId: AITool, planId: string) {
  return TOOLS[toolId].plans.find((p) => p.id === planId);
}

export function getPlanPrice(toolId: AITool, planId: string): number {
  const plan = getPlanInfo(toolId, planId);
  return plan?.monthlyPerSeat ?? 0;
}

export function getAllTools(): ToolInfo[] {
  return Object.values(TOOLS);
}

export function getToolsByCategory(category: ToolInfo['category']): ToolInfo[] {
  return Object.values(TOOLS).filter((t) => t.category === category);
}

export const USE_CASE_LABELS: Record<UseCase, string> = {
  coding: 'Software Development',
  writing: 'Content & Writing',
  data: 'Data Analysis',
  research: 'Research',
  mixed: 'Mixed / General',
};

export const TOOL_DISPLAY_ORDER: AITool[] = [
  'cursor',
  'github-copilot',
  'windsurf',
  'claude',
  'chatgpt',
  'gemini',
  'anthropic-api',
  'openai-api',
];
