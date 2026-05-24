// ============================================================
// StackAudit — Template-Based Summary (Fallback for AI failures)
// ============================================================

import { type AuditInput, type AuditResult } from './types';
import { USE_CASE_LABELS } from './pricing-data';
import { formatCurrency } from './utils';

export function generateTemplateSummary(
  input: AuditInput,
  results: Omit<AuditResult, 'aiSummary'>
): string {
  const { teamSize, useCase } = input;
  const { toolResults, totalMonthlySavings, totalAnnualSavings, totalCurrentSpend } = results;
  const useCaseLabel = USE_CASE_LABELS[useCase].toLowerCase();
  const toolCount = toolResults.length;
  const savingsPercent = totalCurrentSpend > 0
    ? Math.round((totalMonthlySavings / totalCurrentSpend) * 100)
    : 0;

  // Find the tool with highest savings
  const sortedBySavings = [...toolResults].sort((a, b) => b.monthlySavings - a.monthlySavings);
  const topSaver = sortedBySavings[0];
  const keepCount = toolResults.filter((r) => r.recommendedAction === 'keep').length;

  // No savings case
  if (totalMonthlySavings <= 0) {
    return `Your ${teamSize}-person team is running a tight AI stack. Across ${toolCount} tool${toolCount > 1 ? 's' : ''} used for ${useCaseLabel}, your current spend of ${formatCurrency(totalCurrentSpend)}/month is well-optimized with no obvious waste. Each tool is right-sized for your usage pattern. Keep monitoring as vendors frequently adjust pricing and introduce new tiers — what's optimal today may not be in six months.`;
  }

  // Small savings (<$100/mo)
  if (totalMonthlySavings < 100) {
    return `Your ${teamSize}-person team's AI spend of ${formatCurrency(totalCurrentSpend)}/month across ${toolCount} tool${toolCount > 1 ? 's' : ''} is mostly well-optimized. We found ${formatCurrency(totalMonthlySavings)}/month in potential savings (${savingsPercent}%), primarily by ${topSaver.recommendedAction === 'downgrade' ? 'right-sizing' : 'switching'} ${topSaver.toolName}. ${keepCount > 0 ? `${keepCount} of your ${toolCount} tools are already on optimal plans.` : ''} These are minor adjustments, but they add up to ${formatCurrency(totalAnnualSavings)} annually.`;
  }

  // Medium savings ($100-$500/mo)
  if (totalMonthlySavings < 500) {
    return `For a ${teamSize}-person team focused on ${useCaseLabel}, we identified ${formatCurrency(totalMonthlySavings)}/month (${formatCurrency(totalAnnualSavings)}/year) in savings across your ${toolCount}-tool AI stack. The biggest opportunity is ${topSaver.toolName}: ${topSaver.reasoning.split('.')[0]}. ${keepCount > 0 ? `${keepCount} tool${keepCount > 1 ? 's are' : ' is'} already well-matched.` : ''} These changes would reduce your total spend from ${formatCurrency(totalCurrentSpend)} to ${formatCurrency(totalCurrentSpend - totalMonthlySavings)}/month — a ${savingsPercent}% reduction with no loss in capability.`;
  }

  // Large savings (>$500/mo)
  return `Your ${teamSize}-person team has significant optimization potential: ${formatCurrency(totalMonthlySavings)}/month (${formatCurrency(totalAnnualSavings)}/year) in savings across ${toolCount} AI tools. The biggest opportunity is ${topSaver.toolName}, where ${topSaver.recommendedAction === 'switch' ? 'switching to ' + topSaver.recommendedToolName : 'downgrading to ' + topSaver.recommendedPlanName} alone saves ${formatCurrency(topSaver.monthlySavings)}/month. At this spend level, a dedicated AI spend review with Credex could unlock additional savings through volume credits and consolidated billing. Current spend: ${formatCurrency(totalCurrentSpend)}/month → optimized: ${formatCurrency(totalCurrentSpend - totalMonthlySavings)}/month.`;
}
