import { NextResponse } from 'next/server';
import { type AuditInput } from '@/lib/types';
import { runFullAudit } from '@/lib/audit-engine';
import { generateAISummary } from '@/lib/ai-summary';
import { createServerClient } from '@/lib/supabase';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    // Rate limit
    const ip = getClientIp(request);
    const rl = rateLimit(`audit:${ip}`, 10, 3600000); // 10 per hour
    if (!rl.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter || 60) } }
      );
    }

    const body = await request.json();

    // Honeypot check
    if (body.website) {
      // Bot detected — return fake success
      return NextResponse.json({
        success: true,
        data: {
          id: 'fake-id',
          toolResults: [],
          totalCurrentSpend: 0,
          totalRecommendedSpend: 0,
          totalMonthlySavings: 0,
          totalAnnualSavings: 0,
          createdAt: new Date().toISOString(),
        },
      });
    }

    const input: AuditInput = {
      tools: body.tools || [],
      teamSize: Number(body.teamSize) || 1,
      useCase: body.useCase || 'mixed',
    };

    // Validate
    if (!input.tools.length) {
      return NextResponse.json(
        { success: false, error: 'At least one tool is required.' },
        { status: 400 }
      );
    }

    if (input.teamSize < 1) {
      return NextResponse.json(
        { success: false, error: 'Team size must be at least 1.' },
        { status: 400 }
      );
    }

    // Run audit engine
    const auditResult = runFullAudit(input);

    // Generate AI summary
    const aiSummary = await generateAISummary(input, auditResult);

    const fullResult = { ...auditResult, aiSummary };

    // Store in Supabase (best-effort)
    try {
      const supabase = createServerClient();
      if (supabase) {
        await supabase.from('audits').insert({
          id: fullResult.id,
          input: input as unknown as Record<string, unknown>,
          results: fullResult as unknown as Record<string, unknown>,
          ai_summary: aiSummary,
          total_monthly_savings: fullResult.totalMonthlySavings,
          total_annual_savings: fullResult.totalAnnualSavings,
          tools_count: input.tools.length,
        });
      }
    } catch (dbError) {
      console.error('[Audit API] Supabase storage failed:', dbError);
    }

    return NextResponse.json({ success: true, data: fullResult });
  } catch (error) {
    console.error('[Audit API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
