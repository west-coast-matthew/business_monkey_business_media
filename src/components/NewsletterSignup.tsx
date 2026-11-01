'use client';

import { useState } from 'react';
import { subscribeNewsletter } from '@/services/order.service';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      await subscribeNewsletter(email);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-inner">
          <div className="newsletter-text">
            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Stay in the loop</p>
            <p className="heading-lg">New drops. First looks.</p>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '0.5rem', fontSize: '0.9375rem' }}>
              Be the first to know when new themes and products land.
              No spam, ever.
            </p>
          </div>

          <div className="newsletter-form-wrap">
            {status === 'success' ? (
              <div className="newsletter-success">
                <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>You&apos;re on the list!</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  We&apos;ll be in touch with new arrivals and exclusives.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="newsletter-input"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="btn"
                  style={{
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    flexShrink: 0,
                  }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p style={{ color: '#ff6b6b', fontSize: '0.8125rem', marginTop: '0.5rem' }}>
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .newsletter {
          background: var(--text);
          color: var(--bg);
          padding: 4rem 0;
        }

        .newsletter .eyebrow {
          color: rgba(255,255,255,0.45);
        }

        .newsletter-inner {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .newsletter-inner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 3rem;
          }
        }

        .newsletter-text {
          flex: 1;
        }

        .newsletter-form-wrap {
          flex: 1;
          max-width: 420px;
        }

        .newsletter-form {
          display: flex;
          gap: 0.75rem;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(255,255,255,0.2);
          border-radius: var(--radius-md);
          color: #fff;
          font-size: 0.9375rem;
          outline: none;
          transition: border-color var(--transition);
          font-family: inherit;
        }

        .newsletter-input::placeholder {
          color: rgba(255,255,255,0.35);
        }

        .newsletter-input:focus {
          border-color: rgba(255,255,255,0.6);
        }

        .newsletter-success {
          padding: 1rem;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--radius-md);
        }
      `}</style>
    </section>
  );
}
