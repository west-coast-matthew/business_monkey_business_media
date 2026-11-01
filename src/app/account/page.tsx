'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '@/services/order.service';

type Tab = 'orders' | 'signin' | 'signup';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({ email: '', password: '', name: '' });

  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1 className="heading-display">My Account</h1>
        </div>
      </div>

      <div className="container section">
        <div className="account-layout">
          {/* Tabs */}
          <div className="account-tabs">
            <button
              className={`account-tab ${activeTab === 'orders' ? 'account-tab-active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Order History
            </button>
            <button
              className={`account-tab ${activeTab === 'signin' ? 'account-tab-active' : ''}`}
              onClick={() => setActiveTab('signin')}
            >
              Sign In
            </button>
            <button
              className={`account-tab ${activeTab === 'signup' ? 'account-tab-active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Create Account
            </button>
          </div>

          {/* Content */}
          <div className="account-content">
            {activeTab === 'orders' && (
              <div>
                <p className="heading-md" style={{ marginBottom: '1.5rem' }}>Your Orders</p>
                {orders.length === 0 ? (
                  <div className="empty-state" style={{ padding: '3rem 0' }}>
                    <p className="heading-sm">No orders yet</p>
                    <p className="text-muted" style={{ marginTop: '0.5rem' }}>Your completed orders will appear here.</p>
                    <Link href="/themes" className="btn btn-primary btn-sm" style={{ marginTop: '1.5rem' }}>
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {orders.map((order) => (
                      <div key={order.id} className="order-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{order.id}</span>
                          <span className={`order-status order-status-${order.status}`}>{order.status}</span>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                          {order.items?.length ?? 0} item(s) · ${order.total?.toFixed(2)}
                        </p>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                          Placed: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'signin' && (
              <form
                onSubmit={(e) => e.preventDefault()}
                style={{ maxWidth: 400 }}
              >
                <p className="heading-md" style={{ marginBottom: '1.5rem' }}>Sign In</p>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="label" htmlFor="si-email">Email</label>
                  <input
                    id="si-email"
                    type="email"
                    className="input"
                    value={signInForm.email}
                    onChange={(e) => setSignInForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="label" htmlFor="si-password">Password</label>
                  <input
                    id="si-password"
                    type="password"
                    className="input"
                    value={signInForm.password}
                    onChange={(e) => setSignInForm((p) => ({ ...p, password: e.target.value }))}
                    placeholder="••••••••"
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Sign In
                </button>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem' }}>
                  Demo site — authentication coming soon.
                </p>
              </form>
            )}

            {activeTab === 'signup' && (
              <form
                onSubmit={(e) => e.preventDefault()}
                style={{ maxWidth: 400 }}
              >
                <p className="heading-md" style={{ marginBottom: '1.5rem' }}>Create Account</p>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="label" htmlFor="su-name">Full Name</label>
                  <input
                    id="su-name"
                    type="text"
                    className="input"
                    value={signUpForm.name}
                    onChange={(e) => setSignUpForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Jane Smith"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="label" htmlFor="su-email">Email</label>
                  <input
                    id="su-email"
                    type="email"
                    className="input"
                    value={signUpForm.email}
                    onChange={(e) => setSignUpForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="label" htmlFor="su-password">Password</label>
                  <input
                    id="su-password"
                    type="password"
                    className="input"
                    value={signUpForm.password}
                    onChange={(e) => setSignUpForm((p) => ({ ...p, password: e.target.value }))}
                    placeholder="••••••••"
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .account-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .account-layout {
            grid-template-columns: 220px 1fr;
            gap: 3rem;
          }
        }

        .account-tabs {
          display: flex;
          flex-direction: row;
          gap: 0.25rem;
          overflow-x: auto;
        }

        @media (min-width: 768px) {
          .account-tabs {
            flex-direction: column;
          }
        }

        .account-tab {
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          text-align: left;
          border-radius: var(--radius-md);
          color: var(--text-muted);
          transition: all var(--transition);
          white-space: nowrap;
        }

        .account-tab:hover {
          background: var(--border);
          color: var(--text);
        }

        .account-tab-active {
          background: var(--text);
          color: var(--bg);
        }

        .account-content {
          min-height: 300px;
        }

        .order-card {
          padding: 1.25rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          background: var(--bg-white);
        }

        .order-status {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .order-status-pending { background: #fef3c7; color: #92400e; }
        .order-status-processing { background: #dbeafe; color: #1e40af; }
        .order-status-shipped { background: #d1fae5; color: #065f46; }
        .order-status-delivered { background: #f0fdf4; color: #166534; }
      `}</style>
    </div>
  );
}
