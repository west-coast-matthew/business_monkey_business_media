const BRANDS = [
  {
    name: 'Bella+Canvas',
    tagline: 'The Gold Standard for Soft Tees',
    description:
      'Bella+Canvas is widely considered the benchmark for premium blank t-shirts. Their 3001 unisex crew is crafted from Airlume combed and ring-spun cotton for an exceptionally soft hand feel. True to size with a modern fit.',
    usedFor: ['T-Shirts', 'Long Sleeves', 'V-Necks'],
    origin: 'USA / Los Angeles, CA',
    sustainability: 'Made in the USA with WRAP-certified facilities.',
  },
  {
    name: 'Gildan Softstyle',
    tagline: 'Everyday Comfort, Every Budget',
    description:
      'The Gildan SF000 and SF500 lines deliver a surprisingly soft hand feel at an accessible price point. Excellent for crewneck sweatshirts and pullovers. Consistent sizing across runs.',
    usedFor: ['Sweatshirts', 'Crewnecks'],
    origin: 'USA / Honduras',
    sustainability: 'Gildan follows a Genuine Responsibility sustainability program.',
  },
  {
    name: 'Champion',
    tagline: 'Built for Athletes Since 1919',
    description:
      'Champion\'s S700 Reverse Weave hoodie is an icon for a reason. Heavyweight 12oz cotton fleece resists shrinkage by cutting the fabric on the cross-grain. The result is a hoodie that keeps its shape wash after wash.',
    usedFor: ['Hoodies', 'Heavyweight Fleece'],
    origin: 'Globally Sourced',
    sustainability: 'Champion uses responsible sourcing and is committed to reducing its environmental footprint.',
  },
  {
    name: 'Next Level Apparel',
    tagline: 'Fashion-Forward Blank Apparel',
    description:
      'Next Level produces lightweight, fashion-fit blanks with a luxuriously soft tri-blend fabric. Ideal for a more fitted, contemporary silhouette. Colors are rich and vibrant, and prints pop beautifully.',
    usedFor: ['Tri-Blend Tees', 'Fitted Styles'],
    origin: 'USA / Los Angeles, CA',
    sustainability: 'Uses recycled polyester in tri-blend styles, reducing virgin plastic use.',
  },
];

export default function ClothingBrandsPage() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <p className="page-hero-eyebrow">The Foundation</p>
          <h1 className="heading-display">Our Blanks</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', maxWidth: '560px' }}>
            Great apparel starts with great blanks. We partner with the most trusted names in the
            industry so your graphic has the perfect canvas.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="brands-grid">
            {BRANDS.map((brand) => (
              <div key={brand.name} className="brand-card">
                <div className="brand-card-header">
                  <div className="brand-logo-placeholder">{brand.name.charAt(0)}</div>
                  <div>
                    <p className="heading-md">{brand.name}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontStyle: 'italic' }}>
                      {brand.tagline}
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.75, margin: '1.25rem 0' }}>
                  {brand.description}
                </p>

                <div className="brand-meta">
                  <div className="brand-meta-row">
                    <span className="brand-meta-label">Used For</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                      {brand.usedFor.map((use) => (
                        <span key={use} className="brand-tag">{use}</span>
                      ))}
                    </div>
                  </div>
                  <div className="brand-meta-row">
                    <span className="brand-meta-label">Origin</span>
                    <span style={{ fontSize: '0.875rem' }}>{brand.origin}</span>
                  </div>
                  <div className="brand-meta-row">
                    <span className="brand-meta-label">Sustainability</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{brand.sustainability}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .brands-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .brands-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .brand-card {
          padding: 2rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--bg-white);
        }

        .brand-card-header {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .brand-logo-placeholder {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: var(--text);
          color: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 800;
          flex-shrink: 0;
        }

        .brand-meta {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
        }

        .brand-meta-row {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        @media (min-width: 480px) {
          .brand-meta-row {
            flex-direction: row;
            align-items: flex-start;
            gap: 1rem;
          }
        }

        .brand-meta-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          flex-shrink: 0;
          min-width: 100px;
          padding-top: 1px;
        }

        .brand-tag {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          background: var(--border);
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
