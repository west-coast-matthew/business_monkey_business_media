'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/providers/CartProvider';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  if (!isOpen) return null;

  const shipping = subtotal >= 75 ? 0 : 7.95;
  const total = subtotal + shipping;

  return (
    <>
      <div className="cart-overlay" onClick={closeCart} aria-hidden="true" />
      <aside className="cart-drawer" aria-label="Shopping cart">
        <div className="cart-header">
          <p className="cart-title">
            Cart {itemCount > 0 && <span className="cart-count">({itemCount})</span>}
          </p>
          <button className="cart-close" onClick={closeCart} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={48} strokeWidth={1} color="var(--text-light)" />
            <p className="heading-sm" style={{ marginTop: '1rem' }}>Your cart is empty</p>
            <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
              Browse our themes to find something you love.
            </p>
            <Link
              href="/themes"
              className="btn btn-primary btn-sm"
              style={{ marginTop: '1.5rem' }}
              onClick={closeCart}
            >
              Shop Themes
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => {
                const key = `${item.productId}::${item.size ?? ''}::${item.color ?? ''}`;
                return (
                  <div key={key} className="cart-item">
                    <div className="cart-item-image">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                      />
                    </div>
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.product.name}</p>
                      {(item.size || item.color) && (
                        <p className="cart-item-variant">
                          {[item.size, item.color].filter(Boolean).join(' / ')}
                        </p>
                      )}
                      <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
                      <div className="cart-item-qty">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size, item.color)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size, item.color)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                      aria-label="Remove item"
                    >
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="cart-footer">
              {shipping === 0 ? (
                <p className="cart-shipping-note">Free shipping applied!</p>
              ) : (
                <p className="cart-shipping-note">
                  Add ${(75 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}

              <div className="cart-totals">
                <div className="cart-total-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="cart-total-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="cart-total-row cart-total-final">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1rem' }}
                onClick={closeCart}
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                className="btn btn-ghost"
                style={{ width: '100%', marginTop: '0.75rem', justifyContent: 'center' }}
                onClick={closeCart}
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </aside>

      <style>{`
        .cart-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 199;
          backdrop-filter: blur(2px);
        }

        .cart-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(420px, 100vw);
          background: var(--bg);
          z-index: 200;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
        }

        .cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        .cart-title {
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .cart-count {
          color: var(--text-muted);
          font-weight: 400;
        }

        .cart-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          transition: background var(--transition);
        }

        .cart-close:hover {
          background: var(--border);
        }

        .cart-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
        }

        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cart-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          position: relative;
        }

        .cart-item-image {
          position: relative;
          width: 72px;
          height: 88px;
          flex-shrink: 0;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--border);
        }

        .cart-item-info {
          flex: 1;
          min-width: 0;
        }

        .cart-item-name {
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.3;
        }

        .cart-item-variant {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        .cart-item-price {
          font-size: 0.875rem;
          font-weight: 600;
          margin-top: 0.375rem;
        }

        .cart-item-qty {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .cart-item-qty button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border: 1px solid var(--border-dark);
          border-radius: var(--radius-sm);
          transition: background var(--transition);
        }

        .cart-item-qty button:hover {
          background: var(--border);
        }

        .cart-item-qty span {
          font-size: 0.875rem;
          font-weight: 500;
          min-width: 1.25rem;
          text-align: center;
        }

        .cart-item-remove {
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          color: var(--text-muted);
          transition: color var(--transition);
        }

        .cart-item-remove:hover {
          color: var(--text);
        }

        .cart-footer {
          padding: 1.25rem 1.5rem;
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }

        .cart-shipping-note {
          font-size: 0.75rem;
          font-weight: 500;
          text-align: center;
          color: var(--text-muted);
          background: var(--border);
          padding: 0.5rem;
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
        }

        .cart-totals {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .cart-total-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .cart-total-final {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
          padding-top: 0.5rem;
          border-top: 1px solid var(--border);
          margin-top: 0.25rem;
        }
      `}</style>
    </>
  );
}
