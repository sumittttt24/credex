import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rl = rateLimit(`lead:${ip}`, 5, 3600000);
    if (!rl.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter || 60) } }
      );
    }

    const body = await request.json();

    // Honeypot
    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    const { auditId, email, companyName, role, teamSize } = body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required.' },
        { status: 400 }
      );
    }

    // Store in Supabase (best-effort)
    try {
      const supabase = createServerClient();
      if (supabase) {
        await supabase.from('leads').insert({
          audit_id: auditId || null,
          email,
          company_name: companyName || null,
          role: role || null,
          team_size: teamSize ? Number(teamSize) : null,
        });
      }
    } catch (dbError) {
      console.error('[Lead API] Supabase storage failed:', dbError);
    }

    // Send confirmation email via Resend (best-effort)
    try {
      if (process.env.RESEND_API_KEY) {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'StackAudit <onboarding@resend.dev>',
          to: email,
          subject: 'Your AI Spend Audit Results — StackAudit',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="color: #8b5cf6; font-size: 24px; margin-bottom: 8px;">StackAudit</h1>
              <p style="color: #71717a; font-size: 14px; margin-bottom: 32px;">by Credex</p>
              <h2 style="color: #fafafa; font-size: 20px;">Your AI Spend Audit is Ready</h2>
              <p style="color: #a1a1aa; line-height: 1.6;">
                Thanks for running your AI spend audit with StackAudit. Your personalized report
                ${auditId ? `is available at: <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://stackaudit.com'}/audit/${auditId}" style="color: #8b5cf6;">View Your Report</a>` : 'has been generated.'}
              </p>
              <p style="color: #a1a1aa; line-height: 1.6;">
                For teams with significant savings potential, Credex offers hands-on AI spend
                optimization — including volume credits, consolidated billing, and vendor management.
              </p>
              <p style="color: #71717a; font-size: 12px; margin-top: 40px;">
                You received this email because you requested an AI spend audit on StackAudit.
              </p>
            </div>
          `,
        });
      }
    } catch (emailError) {
      console.error('[Lead API] Email send failed:', emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Lead API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
