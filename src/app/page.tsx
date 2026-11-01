'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchThemes, fetchPopularProducts, fetchNewProducts } from '@/services/catalog.service';
import { ThemeCard } from '@/components/ThemeCard';
import { ProductCard } from '@/components/ProductCard';
import { NewsletterSignup } from '@/components/NewsletterSignup';

export default function HomePage() {
  const { data: themes = [] } = useQuery({ queryKey: ['themes'], queryFn: fetchThemes });
  const { data: popularProducts = [] } = useQuery({
    queryKey: ['products', 'popular'],
    queryFn: () => fetchPopularProducts(),
  });
  const { data: newProducts = [] } = useQuery({
    queryKey: ['products', 'new'],
    queryFn: () => fetchNewProducts(),
  });

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <img src="/main-logo.svg" alt="Monkey Business Media" style={{ display: 'block', margin: '0 auto 1.5rem', width: '360px', height: 'auto' }} />
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>30+ Unique Demographics. Endless Expression.</p>
          <h1 className="heading-display hero-heading">
            The Creative<br />Revolution is Here.
          </h1>
          <p className="hero-sub">
            Unleash your style with curated & custom apparel built around the communities and passions you love.
          </p>
          <div className="hero-actions">
            <Link href="/themes" className="btn btn-primary btn-lg">Explore Themes</Link>
            <Link href="/whats-new" className="btn btn-outline btn-lg">What&apos;s New</Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-header-text">
              <p className="eyebrow">Featured Collections</p>
              <h2 className="heading-xl">Shop by Theme</h2>
            </div>
            <Link href="/themes" className="btn btn-ghost">View All →</Link>
          </div>
          <div className="grid-themes">
            {themes.slice(0, 6).map((theme) => (
              <ThemeCard key={theme.id} theme={theme} />
            ))}
          </div>
          {themes.length > 6 && (
            <div className="themes-cta">
              <p className="themes-cta-label">
                Displaying 6 of {themes.length} categories
              </p>
              <Link href="/themes" className="btn btn-primary">
                View All Categories →
              </Link>
            </div>
          )}
        </div>
      </section>

      <hr className="divider" />

      {/* What's New */}
      {newProducts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-header-text">
                <p className="eyebrow">Just Dropped</p>
                <h2 className="heading-xl">What&apos;s New</h2>
              </div>
              <Link href="/whats-new" className="btn btn-ghost">See All →</Link>
            </div>
            <div className="scroll-row">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      <hr className="divider" />

      {/* Most Popular */}
      {popularProducts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-header-text">
                <p className="eyebrow">Top Sellers</p>
                <h2 className="heading-xl">Most Popular Items</h2>
              </div>
            </div>
            <div className="grid-products">
              {popularProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterSignup />

      <style>{`
        .hero {
          padding: 5rem 0 4rem;
          border-bottom: 1px solid var(--border);
          text-align: center;
        }

        @media (min-width: 768px) {
          .hero {
            padding: 7rem 0 5rem;
          }
        }

        .hero-inner {
          max-width: 720px;
          margin: 0 auto;
        }

        .hero-heading {
          margin-bottom: 1.25rem;
        }

        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.125rem);
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 2.25rem;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.875rem;
          justify-content: center;
        }

        .themes-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-top: 2.5rem;
          padding-top: 2.5rem;
          border-top: 1px solid var(--border);
          text-align: center;
        }

        .themes-cta-label {
          font-size: 0.875rem;
          color: var(--text-muted);
        }
      `}</style>
    </>
  );
}
