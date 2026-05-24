import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const savings = searchParams.get('savings') || '0';
  const tools = searchParams.get('tools') || '0';
  const annual = searchParams.get('annual') || '0';

  const savingsNum = parseInt(savings);
  const formattedSavings = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(savingsNum);

  const formattedAnnual = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(parseInt(annual));

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 30%, #0f172a 70%, #0a0a1a 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            left: '-50px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              fontSize: '36px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #a78bfa, #c084fc, #e879f9)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            StackAudit
          </span>
          <span style={{ color: '#71717a', fontSize: '20px', marginLeft: '12px' }}>by Credex</span>
        </div>

        {/* Main savings */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <span style={{ color: '#a1a1aa', fontSize: '24px', marginBottom: '8px' }}>
            Potential Monthly Savings
          </span>
          <span
            style={{
              fontSize: '80px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #34d399, #22d3ee, #818cf8)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1,
            }}
          >
            {formattedSavings}
          </span>
          <span style={{ color: '#71717a', fontSize: '22px', marginTop: '8px' }}>
            {formattedAnnual}/year across {tools} AI tool{parseInt(tools) !== 1 ? 's' : ''}
          </span>
        </div>

        {/* CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '24px',
            padding: '12px 32px',
            borderRadius: '999px',
            border: '1px solid rgba(139,92,246,0.3)',
            background: 'rgba(139,92,246,0.1)',
          }}
        >
          <span style={{ color: '#c4b5fd', fontSize: '20px' }}>
            Run your free audit → stackaudit.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
