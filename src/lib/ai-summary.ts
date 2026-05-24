// ============================================================
// StackAudit — AI Summary Generator (Anthropic Claude)
// Falls back to template on any failure.
// ============================================================

import { type AuditInput, type AuditResult } from './types';
import { USE_CASE_LABELS } from './pricing-data';
import { formatCurrency } from './utils';
import { generateTemplateSummary } from './summary-template';

const SYSTEM_PROMPT = `You are a concise financial advisor specializing in AI tool spending optimization for tech teams. Given an audit of a team's AI tool subscriptions, write a personalized ~100-word summary paragraph that:
1. Acknowledges what they're doing well (if anything)
2. Highlights the biggest savings opportunity with specific numbers
3. Gives one actionable next step
4. Uses a professional but approachable tone — like a smart colleague, not a robot

Do NOT use bullet points, headers, or markdown. Write a single flowing paragraph.
Do NOT mention Credex or any consulting service.
Do NOT make up numbers — only reference the data provided.`;

function buildUserPrompt(
  input: AuditInput,
  results: Omit<AuditResult, 'aiSummary'>
): string {
  const toolBreakdown = results.toolResults
    .map(
      (r) =>
        `- ${r.toolName} (${r.currentPlanName}): $${r.currentSpend}/mo → ${r.recommendedAction}: ${r.reasoning}`
    )
    .join('\n');

  return `Audit Summary for a ${input.teamSize}-person team (primary use case: ${USE_CASE_LABELS[input.useCase]}):

Current monthly spend: ${formatCurrency(results.totalCurrentSpend)}
Recommended monthly spend: ${formatCurrency(results.totalRecommendedSpend)}
Total potential savings: ${formatCurrency(results.totalMonthlySavings)}/month (${formatCurrency(results.totalAnnualSavings)}/year)

Tool-by-tool breakdown:
${toolBreakdown}

Write a ~100-word personalized summary paragraph.`;
}

export async function generateAISummary(
  input: AuditInput,
  results: Omit<AuditResult, 'aiSummary'>
): Promise<string> {
  // If no API key, fall back immediately
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log('[AI Summary] No ANTHROPIC_API_KEY set, using template fallback');
    return generateTemplateSummary(input, results);
  }

  try {
    // Dynamic import to avoid issues if package isn't available
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: buildUserPrompt(input, results),
        },
      ],
    });

    // Extract text from response
    const textBlock = response.content.find((block) => block.type === 'text');
    if (textBlock && textBlock.type === 'text') {
      return textBlock.text.trim();
    }

    console.warn('[AI Summary] No text block in response, using template fallback');
    return generateTemplateSummary(input, results);
  } catch (error) {
    console.error('[AI Summary] API call failed, using template fallback:', error);
    return generateTemplateSummary(input, results);
  }
}
