// ============================================================
// StackAudit — Core Type Definitions
// ============================================================

export type AITool =
  | 'cursor'
  | 'github-copilot'
  | 'claude'
  | 'chatgpt'
  | 'anthropic-api'
  | 'openai-api'
  | 'gemini'
  | 'windsurf';

export type UseCase = 'coding' | 'writing' | 'data' | 'research' | 'mixed';

export type AuditAction = 'keep' | 'downgrade' | 'switch' | 'optimize';

// ---- Tool metadata ----

export interface PlanInfo {
  id: string;
  name: string;
  monthlyPerSeat: number;
  isApiPlan?: boolean;
  minSeats?: number;
  maxSeats?: number;
  features: string[];
  bestFor: UseCase[];
}

export interface ToolInfo {
  id: AITool;
  name: string;
  category: 'ide' | 'chatbot' | 'api';
  vendor: string;
  pricingUrl: string;
  plans: PlanInfo[];
  icon: string; // path to icon in /public/tool-icons/
}

// ---- User input ----

export interface ToolEntry {
  id: string; // unique row ID (for React keys)
  tool: AITool;
  plan: string; // plan ID from PlanInfo
  monthlySpend: number;
  seats: number;
}

export interface AuditInput {
  tools: ToolEntry[];
  teamSize: number;
  useCase: UseCase;
}

// ---- Audit output ----

export interface ToolAuditResult {
  tool: AITool;
  toolName: string;
  currentPlan: string;
  currentPlanName: string;
  currentSpend: number;
  seats: number;
  recommendedAction: AuditAction;
  recommendedPlan?: string;
  recommendedPlanName?: string;
  recommendedTool?: string;
  recommendedToolName?: string;
  newSpend: number;
  monthlySavings: number;
  reasoning: string;
}

export interface AuditResult {
  id: string;
  input: AuditInput;
  toolResults: ToolAuditResult[];
  totalCurrentSpend: number;
  totalRecommendedSpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  aiSummary?: string;
  createdAt: string;
}

// ---- Lead capture ----

export interface LeadInput {
  auditId: string;
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  honeypot?: string; // hidden field — must be empty
}

// ---- API responses ----

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
