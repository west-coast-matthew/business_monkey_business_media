'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/providers/CartProvider';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  const shipping = subtotal >= 75 ? 0 : 7.95;
  const total = subtotal + shipping;

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1 className="heading-display">Your Cart</h1>
        </div>
      </div>

      <div className="container section">
        {items.length === 0 ? (
          <div className="empty-state">
            <ShoppingBag size={64} strokeWidth={1} color="var(--text-light)" />
            <p className="heading-lg" style={{ marginTop: '1.5rem' }}>Your cart is empty</p>
            <p className="text-muted" style={{ marginTop: '0.5rem' }}>
              Explore our themes to discover apparel you&apos;ll love.
            </p>
            <Link href="/themes" className="btn btn-primary btn-lg" style={{ marginTop: '2rem' }}>
              Shop Themes
            </Link>
          </div>
        ) : (
          <div className="cart-page-grid">
            {/* Items */}
            <div className="cart-page-items">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <p className="heading-md">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
                <button className="btn btn-ghost" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }} onClick={clearCart}>
                  Clear cart
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {items.map((item) => {
                  const key = `${item.productId}::${item.size ?? ''}::${item.color ?? ''}`;
                  return (
                    <div key={key} className="cart-page-item">
                      <div className="cart-page-item-image">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          unoptimized
                        />
                      </div>
                      <div className="cart-page-item-info">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <p style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{item.product.name}</p>
                            {(item.size || item.color) && (
                              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                                {[item.size, item.color].filter(Boolean).join(' / ')}
                              </p>
                            )}
                          </div>
                          <button onClick={() => removeItem(item.productId, item.size, item.color)} aria-label="Remove">
                            <X size={16} color="var(--text-muted)" />
                          </button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.875rem' }}>
                          <div className="cart-item-qty">
                            <button onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size, item.color)} aria-label="Decrease">
                              <Minus size={12} />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size, item.color)} aria-label="Increase">
                              <Plus size={12} />
                            </button>
                          </div>
                          <p style={{ fontWeight: 600 }}>${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="cart-page-summary">
              <p className="heading-md" style={{ marginBottom: '1.5rem' }}>Order Summary</p>

              {shipping === 0 ? (
                <div className="cart-shipping-note" style={{ marginBottom: '1rem' }}>
                  Free shipping applied!
                </div>
              ) : (
                <div className="cart-shipping-note" style={{ marginBottom: '1rem' }}>
                  Add ${(75 - subtotal).toFixed(2)} more for free shipping
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <hr className="divider" />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem' }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                Proceed to Checkout
              </Link>
              <Link href="/themes" className="btn btn-ghost" style={{ width: '100%', marginTop: '0.75rem', justifyContent: 'center' }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .cart-page-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 1024px) {
          .cart-page-grid {
            grid-template-columns: 1fr 380px;
            align-items: flex-start;
          }
        }

        .cart-page-item {
          display: flex;
          gap: 1.25rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--border);
        }

        .cart-page-item-image {
          position: relative;
          width: 100px;
          height: 120px;
          flex-shrink: 0;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--border);
        }

        .cart-page-item-info {
          flex: 1;
          min-width: 0;
        }

        .cart-item-qty {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .cart-item-qty button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border: 1px solid var(--border-dark);
          border-radius: var(--radius-sm);
          transition: background var(--transition);
        }

        .cart-item-qty button:hover {
          background: var(--border);
        }

        .cart-item-qty span {
          font-size: 0.9375rem;
          font-weight: 500;
          min-width: 1.5rem;
          text-align: center;
        }

        .cart-page-summary {
          background: var(--bg-white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          position: sticky;
          top: 80px;
        }

        .cart-shipping-note {
          font-size: 0.8125rem;
          font-weight: 500;
          text-align: center;
          color: var(--text-muted);
          background: var(--border);
          padding: 0.625rem;
          border-radius: var(--radius-md);
        }
      `}</style>
    </div>
  );
}
