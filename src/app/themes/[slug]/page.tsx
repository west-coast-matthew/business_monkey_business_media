'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  fetchThemeBySlug,
  fetchProducts,
  fetchNewProducts,
  fetchPopularProducts,
} from '@/services/catalog.service';
import { ProductCard } from '@/components/ProductCard';
import { Pagination } from '@/components/Pagination';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import type { SortOption, ProductType } from '@/types';

const PRODUCT_TYPES: { value: string; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'tshirt', label: 'T-Shirts' },
  { value: 'hoodie', label: 'Hoodies' },
  { value: 'sweatshirt', label: 'Sweatshirts' },
  { value: 'mug', label: 'Mugs' },
  { value: 'sticker', label: 'Stickers' },
];

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ThemePage({ params }: Props) {
  const { slug } = use(params);
  const { items: recentlyViewed } = useRecentlyViewed();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [sort, setSort] = useState<SortOption>('newest');
  const [type, setType] = useState<string>('');

  const { data: theme, isLoading: themeLoading } = useQuery({
    queryKey: ['theme', slug],
    queryFn: () => fetchThemeBySlug(slug),
  });

  const { data: newProducts = [] } = useQuery({
    queryKey: ['products', 'new', slug],
    queryFn: () => fetchNewProducts(slug),
  });

  const { data: popularProducts = [] } = useQuery({
    queryKey: ['products', 'popular', slug],
    queryFn: () => fetchPopularProducts(slug),
  });

  const { data: productData, isLoading: productsLoading } = useQuery({
    queryKey: ['products', slug, type, sort, page, pageSize],
    queryFn: () =>
      fetchProducts({
        themeSlug: slug,
        type: type as ProductType || undefined,
        sort,
        page,
        pageSize,
      }),
  });

  function handlePageSizeChange(size: number) {
    setPageSize(size);
    setPage(1);
  }

  function handleTypeChange(t: string) {
    setType(t);
    setPage(1);
  }

  if (themeLoading) {
    return (
      <div className="container section">
        <div className="skeleton" style={{ height: 200, borderRadius: 'var(--radius-md)' }} />
      </div>
    );
  }

  if (!theme) {
    return (
      <div className="container section empty-state">
        <p className="heading-lg">Theme not found</p>
      </div>
    );
  }

  return (
    <div>
      {/* Theme Header */}
      <div className="theme-page-hero">
        <div className="container">
          <div className="theme-page-logo">{theme.logoText}</div>
          <h1 className="heading-display" style={{ marginTop: '1rem' }}>{theme.name}</h1>
          <p className="theme-page-tagline">{theme.tagline}</p>
          <p className="theme-page-summary">{theme.summary}</p>
        </div>
      </div>

      {/* What's New */}
      {newProducts.length > 0 && (
        <section className="section" style={{ paddingBottom: '2.5rem' }}>
          <div className="container">
            <div className="section-header">
              <div className="section-header-text">
                <p className="eyebrow">Just Dropped</p>
                <h2 className="heading-lg">What&apos;s New</h2>
              </div>
            </div>
            <div className="scroll-row">
              {newProducts.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular */}
      {popularProducts.length > 0 && (
        <section className="section" style={{ paddingTop: '0', paddingBottom: '2.5rem' }}>
          <div className="container">
            <div className="section-header">
              <div className="section-header-text">
                <p className="eyebrow">Fan Favorites</p>
                <h2 className="heading-lg">Most Popular</h2>
              </div>
            </div>
            <div className="scroll-row">
              {popularProducts.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      <hr className="divider" />

      {/* All Products */}
      <section className="section">
        <div className="container">
          <div className="theme-filters">
            <div className="theme-type-tabs">
              {PRODUCT_TYPES.map((t) => (
                <button
                  key={t.value}
                  className={`type-tab ${type === t.value ? 'type-tab-active' : ''}`}
                  onClick={() => handleTypeChange(t.value)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label className="label" style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>Sort:</label>
              <select
                className="select"
                style={{ width: 'auto' }}
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {productsLoading ? (
            <div className="grid-products">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton" style={{ aspectRatio: '5/7', borderRadius: 'var(--radius-md)' }} />
              ))}
            </div>
          ) : productData && productData.items.length > 0 ? (
            <>
              <div className="grid-products">
                {productData.items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <Pagination
                page={productData.page}
                totalPages={productData.totalPages}
                pageSize={productData.pageSize}
                total={productData.total}
                onPageChange={setPage}
                onPageSizeChange={handlePageSizeChange}
              />
            </>
          ) : (
            <div className="empty-state">
              <p className="heading-sm">No products found</p>
              <p className="text-muted" style={{ marginTop: '0.5rem' }}>
                Try selecting a different category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <>
          <hr className="divider" />
          <section className="section">
            <div className="container">
              <div className="section-header">
                <div className="section-header-text">
                  <p className="eyebrow">Your History</p>
                  <h2 className="heading-lg">Recently Viewed</h2>
                </div>
              </div>
              <div className="scroll-row">
                {recentlyViewed.map((p) => (
                  <ProductCard key={p.id} product={p} compact />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <style>{`
        .theme-page-hero {
          padding: 4rem 0 3rem;
          border-bottom: 1px solid var(--border);
        }

        .theme-page-logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background: var(--text);
          color: var(--bg);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          border-radius: var(--radius-md);
        }

        .theme-page-tagline {
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 500;
          font-style: italic;
          color: var(--text-muted);
          margin-top: 0.75rem;
        }

        .theme-page-summary {
          font-size: 0.9375rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-top: 0.75rem;
          max-width: 560px;
        }

        .theme-filters {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
          justify-content: space-between;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        .theme-type-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .type-tab {
          padding: 0.4rem 0.875rem;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          border: 1px solid var(--border);
          border-radius: 100px;
          color: var(--text-muted);
          background: var(--bg-white);
          transition: all var(--transition);
        }

        .type-tab:hover {
          border-color: var(--text);
          color: var(--text);
        }

        .type-tab-active {
          background: var(--text);
          border-color: var(--text);
          color: var(--bg);
        }
      `}</style>
    </div>
  );
}
