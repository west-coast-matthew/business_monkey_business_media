'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/catalog.service';
import { ProductCard } from '@/components/ProductCard';
import { Pagination } from '@/components/Pagination';

export default function WhatsNewPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const { data, isLoading } = useQuery({
    queryKey: ['products', 'new', page, pageSize],
    queryFn: () => fetchProducts({ isNew: true, sort: 'newest', page, pageSize }),
  });

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <p className="page-hero-eyebrow">Fresh Drops</p>
          <h1 className="heading-display">What&apos;s New</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', maxWidth: '480px' }}>
            The latest additions across all themes. Be first to the newest designs.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {isLoading ? (
            <div className="grid-products">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton" style={{ aspectRatio: '5/7', borderRadius: 'var(--radius-md)' }} />
              ))}
            </div>
          ) : data && data.items.length > 0 ? (
            <>
              <div className="grid-products">
                {data.items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <Pagination
                page={data.page}
                totalPages={data.totalPages}
                pageSize={data.pageSize}
                total={data.total}
                onPageChange={setPage}
                onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
              />
            </>
          ) : (
            <div className="empty-state">
              <p className="heading-sm">No new products yet</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
