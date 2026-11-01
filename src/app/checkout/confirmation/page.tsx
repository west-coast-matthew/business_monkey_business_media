'use client';

import Link from 'next/link';
import { use } from 'react';
import { CheckCircle } from 'lucide-react';

interface Props {
  searchParams: Promise<{ orderId?: string }>;
}

export default function ConfirmationPage({ searchParams }: Props) {
  const { orderId } = use(searchParams);

  return (
    <div className="container section">
      <div className="confirmation-inner">
        <CheckCircle size={64} strokeWidth={1.25} color="var(--text)" />
        <h1 className="heading-xl" style={{ marginTop: '1.5rem' }}>Order Confirmed!</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '1rem', lineHeight: 1.7 }}>
          Thank you for your order. We&apos;ll send a confirmation email shortly.
        </p>
        {orderId && (
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Order ID: <strong style={{ color: 'var(--text)' }}>{orderId}</strong>
          </p>
        )}
        <div style={{ display: 'flex', gap: '0.875rem', marginTop: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/account" className="btn btn-outline btn-lg">
            View Order Status
          </Link>
          <Link href="/themes" className="btn btn-primary btn-lg">
            Keep Shopping
          </Link>
        </div>
      </div>

      <style>{`
        .confirmation-inner {
          max-width: 480px;
          margin: 4rem auto;
          text-align: center;
          padding: 3rem 2rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--bg-white);
        }
      `}</style>
    </div>
  );
}
