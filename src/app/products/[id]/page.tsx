'use client';

import { use, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ShoppingBag, Heart, ImageIcon, Box, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchProductById, fetchProducts } from '@/services/catalog.service';
import { useCart } from '@/providers/CartProvider';
import { useFavorites } from '@/providers/FavoritesProvider';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { ProductCard } from '@/components/ProductCard';
import { RatingsBar } from '@/components/RatingsBar';

// Loaded client-side only — WebGL cannot run on the server
const ProductMockup = dynamic(
  () => import('@/components/ProductMockup').then((m) => m.ProductMockup),
  { ssr: false }
);

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params);
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addProduct } = useRecentlyViewed();

  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [addedToCart, setAddedToCart] = useState(false);
  const [viewMode, setViewMode] = useState<'photo' | 'mockup'>('photo');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  });

  const { data: relatedData } = useQuery({
    queryKey: ['products', 'related', product?.themeSlug],
    queryFn: () => fetchProducts({ themeSlug: product!.themeSlug, pageSize: 4 }),
    enabled: !!product,
  });

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[2] ?? product.sizes?.[0]);
      setSelectedColor(product.colors?.[0]);
      addProduct(product);
    }
  }, [product]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleAddToCart() {
    if (!product) return;
    addItem(product, 1, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  if (isLoading) {
    return (
      <div className="container section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          <div className="skeleton" style={{ aspectRatio: '5/6', borderRadius: 'var(--radius-md)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="skeleton" style={{ height: 24, width: '60%', borderRadius: 4 }} />
            <div className="skeleton" style={{ height: 40, borderRadius: 4 }} />
            <div className="skeleton" style={{ height: 24, width: '30%', borderRadius: 4 }} />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container section empty-state">
        <p className="heading-lg">Product not found</p>
        <Link href="/themes" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Browse Themes
        </Link>
      </div>
    );
  }

  const relatedProducts = relatedData?.items.filter((p) => p.id !== product.id).slice(0, 4) ?? [];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container" style={{ padding: '1.25rem 1.25rem 0' }}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <Link href={`/themes/${product.themeSlug}`}>{product.themeSlug.replace(/-/g, ' ')}</Link>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </nav>
      </div>

      <div className="container section">
        <div className="product-detail-grid">
          {/* Image / Mockup panel */}
          <div className="product-media-wrap">
            {/* Toggle */}
            <div className="view-toggle" role="group" aria-label="View mode">
              <button
                className={`view-toggle-btn ${viewMode === 'photo' ? 'view-toggle-btn-active' : ''}`}
                onClick={() => setViewMode('photo')}
              >
                <ImageIcon size={13} />
                Photo
              </button>
              <button
                className={`view-toggle-btn ${viewMode === 'mockup' ? 'view-toggle-btn-active' : ''}`}
                onClick={() => setViewMode('mockup')}
              >
                <Box size={13} />
                Mockup
              </button>
            </div>

            <div className="product-detail-image">
              {viewMode === 'photo' ? (
                <>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    unoptimized
                  />
                  {product.isNew && <span className="product-card-badge">New</span>}
                </>
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'var(--bg)' }}>
                  <ProductMockup
                    imageUrl={product.imageUrl}
                    color={selectedColor}
                    productType={product.type}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="product-detail-info">
            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>{product.type}</p>
            <h1 className="heading-xl">{product.name}</h1>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <RatingsBar rating={product.rating} />

            <p className="product-detail-desc">{product.description}</p>

            {/* Color */}
            {product.colors && product.colors.length > 0 && (
              <div className="product-option-group">
                <p className="label">Color: <span style={{ fontWeight: 400, textTransform: 'none' }}>{selectedColor}</span></p>
                <div className="option-chips">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`option-chip ${selectedColor === color ? 'option-chip-active' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="product-option-group">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <p className="label" style={{ marginBottom: 0 }}>Size: <span style={{ fontWeight: 400, textTransform: 'none' }}>{selectedSize}</span></p>
                  <button onClick={() => setSizeGuideOpen(true)} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--text-muted)', background: 'none', border: 'none', borderBottom: '1px solid var(--text-muted)', cursor: 'pointer', padding: 0 }}>
                    Size Guide
                  </button>
                </div>
                <div className="option-chips">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`option-chip ${selectedSize === size ? 'option-chip-active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="product-detail-ctas">
              <button
                className="btn btn-primary btn-lg"
                style={{ flex: 1 }}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={16} />
                {addedToCart ? 'Added!' : 'Add to Cart'}
              </button>
              <button
                className="btn btn-outline btn-lg"
                aria-label={product && isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                onClick={() => product && toggleFavorite(product)}
                style={{ color: product && isFavorite(product.id) ? '#e53e3e' : undefined }}
              >
                <Heart size={16} fill={product && isFavorite(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Meta */}
            <div className="product-detail-meta">
              <p><span>Total Sold:</span> {product.totalSold.toLocaleString()}</p>
              <p><span>Theme:</span> <Link href={`/themes/${product.themeSlug}`} style={{ textDecoration: 'underline', color: 'var(--text)' }}>{product.themeSlug.replace(/-/g, ' ')}</Link></p>
              <p><span>Ships in:</span> 3–7 business days</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '5rem' }}>
            <div className="section-header">
              <div className="section-header-text">
                <p className="eyebrow">More from this theme</p>
                <h2 className="heading-lg">You Might Also Like</h2>
              </div>
              <Link href={`/themes/${product.themeSlug}`} className="btn btn-ghost">
                View All →
              </Link>
            </div>
            <div className="grid-products">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {sizeGuideOpen && (
          <motion.div
            className="sg-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSizeGuideOpen(false)}
          >
            <motion.div
              className="sg-panel"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.97 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sg-header">
                <h2 className="heading-lg">Size Guide</h2>
                <button className="sg-close" onClick={() => setSizeGuideOpen(false)} aria-label="Close">
                  <X size={18} />
                </button>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                All measurements are in inches and represent garment dimensions, not body measurements.
              </p>

              <div className="sg-tip">
                <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>How to Measure</p>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li><strong>Chest:</strong> Measure across the front from armhole to armhole.</li>
                  <li><strong>Length:</strong> From highest shoulder point to the bottom hem.</li>
                  <li><strong>Sleeve:</strong> From shoulder seam to end of cuff.</li>
                </ul>
              </div>

              <h3 style={{ fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>T-Shirts &amp; Sweatshirts</h3>
              <div className="sg-table-wrap" style={{ marginBottom: '1.75rem' }}>
                <table className="sg-table">
                  <thead><tr><th>Size</th><th>Chest</th><th>Length</th><th>Sleeve</th></tr></thead>
                  <tbody>
                    {[
                      { size: 'XS', chest: '31–33"', length: '26"', sleeve: '7.5"' },
                      { size: 'S',  chest: '34–36"', length: '27"', sleeve: '8"'   },
                      { size: 'M',  chest: '38–40"', length: '28"', sleeve: '8.5"' },
                      { size: 'L',  chest: '42–44"', length: '29"', sleeve: '9"'   },
                      { size: 'XL', chest: '46–48"', length: '30"', sleeve: '9.5"' },
                      { size: '2XL',chest: '50–52"', length: '31"', sleeve: '10"'  },
                      { size: '3XL',chest: '54–56"', length: '32"', sleeve: '10.5"'},
                    ].map((r) => (
                      <tr key={r.size}><td><strong>{r.size}</strong></td><td>{r.chest}</td><td>{r.length}</td><td>{r.sleeve}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Hoodies</h3>
              <div className="sg-table-wrap">
                <table className="sg-table">
                  <thead><tr><th>Size</th><th>Chest</th><th>Length</th><th>Sleeve</th></tr></thead>
                  <tbody>
                    {[
                      { size: 'S',   chest: '36"', length: '25.5"', sleeve: '33.5"' },
                      { size: 'M',   chest: '40"', length: '26.5"', sleeve: '34.5"' },
                      { size: 'L',   chest: '44"', length: '27.5"', sleeve: '35.5"' },
                      { size: 'XL',  chest: '48"', length: '28.5"', sleeve: '36.5"' },
                      { size: '2XL', chest: '52"', length: '29.5"', sleeve: '37.5"' },
                      { size: '3XL', chest: '56"', length: '30.5"', sleeve: '38.5"' },
                    ].map((r) => (
                      <tr key={r.size}><td><strong>{r.size}</strong></td><td>{r.chest}</td><td>{r.length}</td><td>{r.sleeve}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.8125rem;
          color: var(--text-muted);
          flex-wrap: wrap;
        }

        .breadcrumb a:hover {
          color: var(--text);
        }

        .breadcrumb span {
          color: var(--text);
        }

        .product-media-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .view-toggle {
          display: inline-flex;
          gap: 0;
          border: 1.5px solid var(--border-dark);
          border-radius: var(--radius-md);
          overflow: hidden;
          align-self: flex-start;
        }

        .view-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.45rem 0.875rem;
          font-size: 0.775rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-muted);
          background: var(--bg-white);
          border-right: 1px solid var(--border-dark);
          transition: background var(--transition), color var(--transition);
        }

        .view-toggle-btn:last-child {
          border-right: none;
        }

        .view-toggle-btn:hover {
          color: var(--text);
        }

        .view-toggle-btn-active {
          background: var(--text);
          color: var(--bg);
        }

        .view-toggle-btn-active:hover {
          color: var(--bg);
        }

        .product-detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3.5rem;
          }
        }

        .product-detail-image {
          position: relative;
          aspect-ratio: 5 / 6;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--border);
        }

        .product-detail-info {
          display: flex;
          flex-direction: column;
        }

        .product-detail-price {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0.5rem 0 1.25rem;
        }

        .product-detail-desc {
          font-size: 0.9375rem;
          color: var(--text-muted);
          line-height: 1.7;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 1.5rem;
        }

        .product-option-group {
          margin-bottom: 1.5rem;
        }

        .option-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .option-chip {
          padding: 0.4rem 0.875rem;
          font-size: 0.8125rem;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-md);
          color: var(--text);
          background: var(--bg-white);
          transition: all var(--transition);
        }

        .option-chip:hover {
          border-color: var(--text);
        }

        .option-chip-active {
          background: var(--text);
          border-color: var(--text);
          color: var(--bg);
          font-weight: 600;
        }

        .product-detail-ctas {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .product-detail-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .product-detail-meta span {
          font-weight: 600;
          color: var(--text);
        }

        /* Size Guide Modal */
        .sg-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .sg-panel {
          background: var(--bg);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2rem;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
        }

        .sg-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .sg-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          transition: background var(--transition);
        }

        .sg-close:hover {
          background: var(--border);
          color: var(--text);
        }

        .sg-tip {
          background: var(--border);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          margin-bottom: 1.75rem;
        }

        .sg-table-wrap {
          overflow-x: auto;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }

        .sg-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }

        .sg-table th {
          background: var(--text);
          color: var(--bg);
          padding: 0.75rem 1rem;
          text-align: left;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .sg-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--border);
          color: var(--text-secondary);
        }

        .sg-table tr:last-child td {
          border-bottom: none;
        }

        .sg-table tr:nth-child(even) td {
          background: rgba(0,0,0,0.02);
        }
      `}</style>
    </div>
  );
}
