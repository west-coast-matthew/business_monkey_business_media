'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/providers/FavoritesProvider';
import { ProductCard } from '@/components/ProductCard';

export default function FavoritesPage() {
  const { favorites, count } = useFavorites();

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <p className="page-hero-eyebrow">Saved Items</p>
          <h1 className="heading-display">My Favorites</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {count === 0 ? (
            <div className="empty-state">
              <Heart size={40} strokeWidth={1.5} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
              <p className="heading-lg">No favorites yet</p>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                Tap the heart icon on any product to save it here.
              </p>
              <Link href="/themes" className="btn btn-primary">
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
                {count} saved {count === 1 ? 'item' : 'items'}
              </p>
              <div className="grid-products">
                {favorites.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
