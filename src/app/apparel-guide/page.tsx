const BRANDS = [
  {
    name: 'Bella+Canvas',
    initial: 'B',
    tagline: 'The Gold Standard for Soft Tees',
    description:
      'Bella+Canvas is widely regarded as the benchmark for premium blank t-shirts. Their Airlume combed and ring-spun cotton delivers an exceptionally soft hand feel with a modern, slightly fitted silhouette that flatters all body types.',
    fabric: '100% Airlume combed and ring-spun cotton (some styles offer tri-blend)',
    weight: '4.2 oz/yd²',
    fit: 'Modern unisex — slightly tapered through the torso',
    usedFor: ['T-Shirts', 'Long Sleeves', 'V-Necks', 'Tank Tops'],
    features: [
      'Side-seamed construction for a cleaner silhouette',
      'Pre-shrunk fabric — what you order is what you get',
      'Tear-away label for itch-free comfort',
      'Vibrant color retention wash after wash',
      'Retail-quality finish straight from the press',
    ],
    care: 'Machine wash cold, tumble dry low. Do not bleach.',
    origin: 'USA / Los Angeles, CA',
    sustainability: 'WRAP-certified facilities. Made with socially responsible manufacturing practices.',
  },
  {
    name: 'Gildan Softstyle',
    initial: 'G',
    tagline: 'Everyday Comfort at Every Price Point',
    description:
      'The Gildan SF000 and SF500 lines punch above their weight class. Softstyle delivers a surprisingly luxurious hand feel for an accessible price, making it the ideal choice for everyday crewnecks and casual sweatshirts.',
    fabric: 'Ring-spun cotton (tees) / 50% cotton, 50% polyester fleece (sweatshirts)',
    weight: '4.5 oz/yd² (tee) · 7.5 oz/yd² (sweatshirt)',
    fit: 'Classic unisex — relaxed through the chest and shoulders',
    usedFor: ['Sweatshirts', 'Crewnecks', 'Everyday Tees'],
    features: [
      'Ring-spun cotton for a softer feel than standard open-end cotton',
      'Consistent sizing across production runs',
      'Double-needle stitching at hem and cuffs for durability',
      'Available in an extensive color range',
      'Excellent ink absorption for vivid prints',
    ],
    care: 'Machine wash warm, tumble dry medium. Do not iron decoration.',
    origin: 'USA / Honduras',
    sustainability: 'Gildan Genuine Responsibility program — targets zero waste to landfill and reduced water usage.',
  },
  {
    name: 'Champion',
    initial: 'C',
    tagline: 'Built for Athletes Since 1919',
    description:
      "Champion's S700 Reverse Weave hoodie is an icon for a reason. The fabric is cut on the cross-grain specifically to fight shrinkage, resulting in a heavyweight fleece that holds its shape season after season.",
    fabric: '12 oz, 82% cotton / 18% polyester reverse weave fleece',
    weight: '12 oz/yd²',
    fit: 'Athletic relaxed — wide shoulders, boxy through the body',
    usedFor: ['Hoodies', 'Heavyweight Fleece', 'Pullover Sweatshirts'],
    features: [
      'Cross-grain cut dramatically reduces shrinkage',
      'Heavyweight 12oz fleece for premium structure and warmth',
      'Ribbed side panels for range of motion',
      'Double-lined hood with flat drawcord',
      'Kangaroo pocket with interior seam stitching',
    ],
    care: 'Machine wash cold with like colors, tumble dry low.',
    origin: 'Globally Sourced',
    sustainability: 'Champion committed to responsible sourcing and reducing environmental footprint across its supply chain.',
  },
  {
    name: 'Next Level Apparel',
    initial: 'N',
    tagline: 'Fashion-Forward Blank Apparel',
    description:
      'Next Level produces lightweight, fashion-fit blanks with a tri-blend construction that drapes beautifully and feels incredibly soft. Colors are rich and vibrant — graphics pop on their fabric like no other.',
    fabric: '50% polyester / 25% combed ring-spun cotton / 25% rayon (tri-blend)',
    weight: '3.4 oz/yd²',
    fit: 'Slim / fashion fit — contoured through the chest and waist',
    usedFor: ['Tri-Blend Tees', 'Fitted Styles', 'Women\'s Cuts'],
    features: [
      'Tri-blend construction for superior drape and softness',
      'Lightweight feel ideal for layering or warm climates',
      'Subtle heathered texture adds visual depth to solids',
      'Tear-away label for customisation',
      'Recycled polyester content reduces virgin plastic use',
    ],
    care: 'Machine wash cold, hang dry recommended to preserve tri-blend integrity.',
    origin: 'USA / Los Angeles, CA',
    sustainability: 'Uses recycled polyester in tri-blend styles. Committed to reducing virgin plastic consumption.',
  },
];

export default function ApparelGuidePage() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <p className="page-hero-eyebrow">What We Print On</p>
          <h1 className="heading-display">Apparel Guide</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', maxWidth: '600px' }}>
            Every design deserves the right canvas. We partner exclusively with industry-leading blank
            manufacturers so your apparel looks great, fits well, and lasts. Here&apos;s everything
            you need to know about the garments behind our collections.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">

          {/* Quick-reference comparison */}
          <div style={{ marginBottom: '4rem' }}>
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>At a Glance</p>
            <h2 className="heading-xl" style={{ marginBottom: '1.5rem' }}>Brand Comparison</h2>
            <div className="ag-table-wrap">
              <table className="ag-table">
                <thead>
                  <tr>
                    <th>Brand</th>
                    <th>Best For</th>
                    <th>Weight</th>
                    <th>Fit</th>
                    <th>Fabric</th>
                  </tr>
                </thead>
                <tbody>
                  {BRANDS.map((b) => (
                    <tr key={b.name}>
                      <td><strong>{b.name}</strong></td>
                      <td>{b.usedFor.join(', ')}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{b.weight}</td>
                      <td>{b.fit.split(' — ')[0]}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{b.fabric}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed brand cards */}
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>In Depth</p>
          <h2 className="heading-xl" style={{ marginBottom: '2rem' }}>Brand Profiles</h2>
          <div className="ag-brands">
            {BRANDS.map((brand) => (
              <div key={brand.name} className="ag-card">
                <div className="ag-card-header">
                  <div className="ag-logo">{brand.initial}</div>
                  <div>
                    <h3 className="heading-md">{brand.name}</h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.2rem' }}>
                      {brand.tagline}
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.75, margin: '1.5rem 0' }}>
                  {brand.description}
                </p>

                <div className="ag-specs">
                  <div className="ag-spec-row">
                    <span className="ag-spec-label">Fabric</span>
                    <span>{brand.fabric}</span>
                  </div>
                  <div className="ag-spec-row">
                    <span className="ag-spec-label">Weight</span>
                    <span>{brand.weight}</span>
                  </div>
                  <div className="ag-spec-row">
                    <span className="ag-spec-label">Fit</span>
                    <span>{brand.fit}</span>
                  </div>
                  <div className="ag-spec-row">
                    <span className="ag-spec-label">Used For</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                      {brand.usedFor.map((u) => (
                        <span key={u} className="ag-tag">{u}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ag-features">
                  <p className="ag-features-heading">Key Features</p>
                  <ul className="ag-features-list">
                    {brand.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="ag-footer">
                  <div className="ag-footer-item">
                    <span className="ag-spec-label">Care</span>
                    <span>{brand.care}</span>
                  </div>
                  <div className="ag-footer-item">
                    <span className="ag-spec-label">Origin</span>
                    <span>{brand.origin}</span>
                  </div>
                  <div className="ag-footer-item">
                    <span className="ag-spec-label">Sustainability</span>
                    <span style={{ color: 'var(--text-muted)' }}>{brand.sustainability}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .ag-table-wrap {
          overflow-x: auto;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }

        .ag-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }

        .ag-table th {
          background: var(--text);
          color: var(--bg);
          padding: 0.875rem 1.25rem;
          text-align: left;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .ag-table td {
          padding: 0.875rem 1.25rem;
          border-bottom: 1px solid var(--border);
          vertical-align: top;
        }

        .ag-table tr:last-child td {
          border-bottom: none;
        }

        .ag-table tr:nth-child(even) td {
          background: rgba(0,0,0,0.02);
        }

        .ag-brands {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 900px) {
          .ag-brands {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .ag-card {
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2rem;
          background: var(--bg-white);
          display: flex;
          flex-direction: column;
        }

        .ag-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ag-logo {
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

        .ag-specs {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1.25rem;
          background: var(--border);
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
        }

        .ag-spec-row {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          font-size: 0.875rem;
        }

        @media (min-width: 480px) {
          .ag-spec-row {
            flex-direction: row;
            align-items: flex-start;
            gap: 1rem;
          }
        }

        .ag-spec-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          flex-shrink: 0;
          min-width: 80px;
          padding-top: 2px;
        }

        .ag-tag {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          background: var(--bg-white);
          border: 1px solid var(--border-dark);
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .ag-features {
          margin-bottom: 1.5rem;
        }

        .ag-features-heading {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }

        .ag-features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .ag-features-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .ag-features-list li::before {
          content: '✓';
          font-weight: 700;
          color: var(--text);
          flex-shrink: 0;
          margin-top: 1px;
        }

        .ag-footer {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
          margin-top: auto;
        }

        .ag-footer-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          font-size: 0.875rem;
        }

        @media (min-width: 480px) {
          .ag-footer-item {
            flex-direction: row;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
