// ============================================================
// StackAudit — Core Audit Engine
// Deterministic rules — no AI. Every recommendation is defensible.
// ============================================================

import {
  type AuditInput,
  type AuditResult,
  type ToolEntry,
  type ToolAuditResult,
  type UseCase,
  type AuditAction,
} from './types';
import { getPlanInfo, getToolInfo } from './pricing-data';
import { PLAN_RIGHT_SIZING, getAlternatives, evaluateApiSpend } from './audit-rules';
import { generateAuditId } from './utils';

/**
 * Audit a single tool entry and return the best recommendation.
 */
export function auditTool(
  entry: ToolEntry,
  teamSize: number,
  useCase: UseCase
): ToolAuditResult {
  const toolInfo = getToolInfo(entry.tool);
  const currentPlan = getPlanInfo(entry.tool, entry.plan);
  const currentPlanName = currentPlan?.name ?? entry.plan;
  const currentSpend = entry.monthlySpend;
  const seats = entry.seats;

  // Collect all possible recommendations
  interface Recommendation {
    action: AuditAction;
    newSpend: number;
    savings: number;
    reasoning: string;
    recommendedPlan?: string;
    recommendedPlanName?: string;
    recommendedTool?: string;
    recommendedToolName?: string;
  }

  const recommendations: Recommendation[] = [];

  // ---- 1. Plan right-sizing (same tool, different plan) ----
  const rightSizingRules = PLAN_RIGHT_SIZING[entry.tool] || [];
  for (const rule of rightSizingRules) {
    if (rule.condition(seats, teamSize, entry.plan)) {
      const suggestedPlanInfo = getPlanInfo(entry.tool, rule.suggestedPlan);
      if (suggestedPlanInfo) {
        const newSpend = suggestedPlanInfo.monthlyPerSeat * seats;
        const savings = currentSpend - newSpend;
        if (savings > 0) {
          const priceDiff = savings;
          recommendations.push({
            action: 'downgrade',
            newSpend,
            savings,
            reasoning: rule.reasoning(seats, currentPlanName, rule.suggestedPlanName, priceDiff),
            recommendedPlan: rule.suggestedPlan,
            recommendedPlanName: rule.suggestedPlanName,
          });
        }
      }
    }
  }

  // ---- 2. Same-vendor cheaper plan check ----
  // Check if there's a cheaper plan from the same vendor that fits the use case
  if (currentPlan && !currentPlan.isApiPlan) {
    const cheaperPlans = toolInfo.plans.filter(
      (p) =>
        !p.isApiPlan &&
        p.monthlyPerSeat < currentPlan.monthlyPerSeat &&
        p.monthlyPerSeat > 0 &&
        p.bestFor.includes(useCase) &&
        (!p.minSeats || seats >= p.minSeats) &&
        (!p.maxSeats || seats <= p.maxSeats)
    );

    for (const cheaperPlan of cheaperPlans) {
      const newSpend = cheaperPlan.monthlyPerSeat * seats;
      const savings = currentSpend - newSpend;
      // Only suggest if not already covered by right-sizing rules
      const alreadySuggested = recommendations.some(
        (r) => r.recommendedPlan === cheaperPlan.id
      );
      if (savings > 0 && !alreadySuggested) {
        recommendations.push({
          action: 'downgrade',
          newSpend,
          savings,
          reasoning: `${currentPlanName} at $${currentPlan.monthlyPerSeat}/seat costs $${currentSpend}/mo for ${seats} seat${seats > 1 ? 's' : ''}. ${cheaperPlan.name} at $${cheaperPlan.monthlyPerSeat}/seat ($${newSpend}/mo) covers your ${useCase} use case while saving $${savings}/mo.`,
          recommendedPlan: cheaperPlan.id,
          recommendedPlanName: cheaperPlan.name,
        });
      }
    }
  }

  // ---- 3. Cross-tool alternatives ----
  const alternatives = getAlternatives(entry.tool, useCase);
  for (const alt of alternatives) {
    const newSpend = alt.monthlyPerSeat * seats;
    const savings = currentSpend - newSpend;
    if (savings > 0) {
      recommendations.push({
        action: 'switch',
        newSpend,
        savings,
        reasoning: alt.reasoning,
        recommendedTool: alt.tool,
        recommendedToolName: alt.toolName,
        recommendedPlan: alt.plan,
        recommendedPlanName: alt.planName,
      });
    }
  }

  // ---- 4. API spend optimization ----
  const apiResult = evaluateApiSpend(entry.tool, currentSpend, useCase);
  if (apiResult) {
    const savings = currentSpend - apiResult.suggestedMonthlySpend;
    if (savings > 0) {
      recommendations.push({
        action: apiResult.action,
        newSpend: apiResult.suggestedMonthlySpend,
        savings,
        reasoning: apiResult.reasoning,
      });
    }
  }

  // ---- Pick best recommendation (highest savings) ----
  if (recommendations.length === 0) {
    return {
      tool: entry.tool,
      toolName: toolInfo.name,
      currentPlan: entry.plan,
      currentPlanName,
      currentSpend,
      seats,
      recommendedAction: 'keep',
      newSpend: currentSpend,
      monthlySavings: 0,
      reasoning: `You're on ${currentPlanName} at $${currentSpend}/mo — this is well-matched for your ${useCase} use case with ${seats} seat${seats > 1 ? 's' : ''}. No changes recommended.`,
    };
  }

  // Sort by savings descending, pick the best
  recommendations.sort((a, b) => b.savings - a.savings);
  const best = recommendations[0];

  return {
    tool: entry.tool,
    toolName: toolInfo.name,
    currentPlan: entry.plan,
    currentPlanName,
    currentSpend,
    seats,
    recommendedAction: best.action,
    recommendedPlan: best.recommendedPlan,
    recommendedPlanName: best.recommendedPlanName,
    recommendedTool: best.recommendedTool,
    recommendedToolName: best.recommendedToolName,
    newSpend: best.newSpend,
    monthlySavings: best.savings,
    reasoning: best.reasoning,
  };
}

/**
 * Run a full audit across all tools.
 */
export function runFullAudit(input: AuditInput): Omit<AuditResult, 'aiSummary'> {
  const toolResults = input.tools.map((entry) =>
    auditTool(entry, input.teamSize, input.useCase)
  );

  const totalCurrentSpend = toolResults.reduce((sum, r) => sum + r.currentSpend, 0);
  const totalRecommendedSpend = toolResults.reduce((sum, r) => sum + r.newSpend, 0);
  const totalMonthlySavings = totalCurrentSpend - totalRecommendedSpend;
  const totalAnnualSavings = totalMonthlySavings * 12;

  return {
    id: generateAuditId(),
    input,
    toolResults,
    totalCurrentSpend,
    totalRecommendedSpend,
    totalMonthlySavings,
    totalAnnualSavings,
    createdAt: new Date().toISOString(),
  };
}
