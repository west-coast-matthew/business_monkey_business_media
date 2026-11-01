'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/providers/CartProvider';
import { createOrder } from '@/services/order.service';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const shipping = subtotal >= 75 ? 0 : 7.95;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    email: '',
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    setError('');

    try {
      const order = await createOrder({
        items,
        subtotal,
        shipping,
        total,
        email: form.email,
        shippingAddress: {
          name: form.name,
          line1: form.line1,
          line2: form.line2 || undefined,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country,
        },
      });

      clearCart();
      router.push(`/checkout/confirmation?orderId=${order.id}`);
    } catch {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container section empty-state">
        <p className="heading-lg">Your cart is empty</p>
        <Link href="/themes" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1 className="heading-display">Checkout</h1>
        </div>
      </div>

      <div className="container section">
        <form onSubmit={handleSubmit} className="checkout-grid">
          {/* Left: Form */}
          <div className="checkout-form">
            <section className="checkout-section">
              <h2 className="heading-md" style={{ marginBottom: '1.25rem' }}>Contact</h2>
              <div className="form-group">
                <label className="label" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="input" required value={form.email} onChange={handleChange} placeholder="you@example.com" />
              </div>
            </section>

            <section className="checkout-section">
              <h2 className="heading-md" style={{ marginBottom: '1.25rem' }}>Shipping Address</h2>
              <div className="form-group">
                <label className="label" htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" className="input" required value={form.name} onChange={handleChange} placeholder="Jane Smith" />
              </div>
              <div className="form-group">
                <label className="label" htmlFor="line1">Address</label>
                <input id="line1" name="line1" type="text" className="input" required value={form.line1} onChange={handleChange} placeholder="123 Main St" />
              </div>
              <div className="form-group">
                <label className="label" htmlFor="line2">Apartment, suite, etc. (optional)</label>
                <input id="line2" name="line2" type="text" className="input" value={form.line2} onChange={handleChange} placeholder="Apt 4B" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="label" htmlFor="city">City</label>
                  <input id="city" name="city" type="text" className="input" required value={form.city} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="state">State</label>
                  <input id="state" name="state" type="text" className="input" required value={form.state} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="zip">ZIP</label>
                  <input id="zip" name="zip" type="text" className="input" required value={form.zip} onChange={handleChange} />
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <h2 className="heading-md" style={{ marginBottom: '1.25rem' }}>Payment</h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1rem', background: 'var(--border)', padding: '0.625rem 0.875rem', borderRadius: 'var(--radius-md)' }}>
                This is a demo site — no real charges will be made.
              </p>
              <div className="form-group">
                <label className="label" htmlFor="cardNumber">Card Number</label>
                <input id="cardNumber" name="cardNumber" type="text" className="input" value={form.cardNumber} onChange={handleChange} placeholder="4242 4242 4242 4242" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="label" htmlFor="cardExpiry">Expiry</label>
                  <input id="cardExpiry" name="cardExpiry" type="text" className="input" value={form.cardExpiry} onChange={handleChange} placeholder="MM / YY" />
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="cardCvc">CVC</label>
                  <input id="cardCvc" name="cardCvc" type="text" className="input" value={form.cardCvc} onChange={handleChange} placeholder="123" />
                </div>
              </div>
            </section>

            {error && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>}

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
            </button>
          </div>

          {/* Right: Order Summary */}
          <div className="checkout-summary">
            <p className="heading-md" style={{ marginBottom: '1.25rem' }}>Order Summary</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} style={{ display: 'flex', gap: '0.875rem', fontSize: '0.875rem' }}>
                  <span style={{ flex: 1 }}>{item.product.name} {item.size ? `(${item.size})` : ''}</span>
                  <span style={{ color: 'var(--text-muted)' }}>×{item.quantity}</span>
                  <span style={{ fontWeight: 500 }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr className="divider" style={{ marginBottom: '1rem' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9375rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <hr className="divider" style={{ margin: '0.5rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem' }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 1024px) {
          .checkout-grid {
            grid-template-columns: 1fr 380px;
            align-items: flex-start;
          }
        }

        .checkout-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .checkout-section {
          padding: 1.75rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--bg-white);
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group:last-child {
          margin-bottom: 0;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .checkout-summary {
          background: var(--bg-white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          position: sticky;
          top: 80px;
        }
      `}</style>
    </div>
  );
}
