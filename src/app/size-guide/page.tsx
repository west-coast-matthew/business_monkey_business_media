export default function SizeGuidePage() {
  const tshirtSizes = [
    { size: 'XS', chest: '31–33"', length: '26"', sleeve: '7.5"' },
    { size: 'S', chest: '34–36"', length: '27"', sleeve: '8"' },
    { size: 'M', chest: '38–40"', length: '28"', sleeve: '8.5"' },
    { size: 'L', chest: '42–44"', length: '29"', sleeve: '9"' },
    { size: 'XL', chest: '46–48"', length: '30"', sleeve: '9.5"' },
    { size: '2XL', chest: '50–52"', length: '31"', sleeve: '10"' },
    { size: '3XL', chest: '54–56"', length: '32"', sleeve: '10.5"' },
  ];

  const hoodieSizes = [
    { size: 'S', chest: '36"', length: '25.5"', sleeve: '33.5"' },
    { size: 'M', chest: '40"', length: '26.5"', sleeve: '34.5"' },
    { size: 'L', chest: '44"', length: '27.5"', sleeve: '35.5"' },
    { size: 'XL', chest: '48"', length: '28.5"', sleeve: '36.5"' },
    { size: '2XL', chest: '52"', length: '29.5"', sleeve: '37.5"' },
    { size: '3XL', chest: '56"', length: '30.5"', sleeve: '38.5"' },
  ];

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <p className="page-hero-eyebrow">Fit Guide</p>
          <h1 className="heading-display">Size Guide</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', maxWidth: '560px' }}>
            All measurements are in inches and represent the garment dimensions, not body measurements.
            For best fit, measure a well-fitting garment you own and compare.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Measuring Guide */}
          <div className="size-tip-box" style={{ marginBottom: '3rem' }}>
            <p className="heading-sm" style={{ marginBottom: '0.75rem' }}>How to Measure</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li><strong>Chest:</strong> Measure across the front of the garment from armhole to armhole.</li>
              <li><strong>Length:</strong> Measure from the highest point of the shoulder to the bottom hem.</li>
              <li><strong>Sleeve:</strong> Measure from the shoulder seam to the end of the cuff.</li>
            </ul>
          </div>

          {/* T-Shirt Size Chart */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="heading-lg" style={{ marginBottom: '0.5rem' }}>T-Shirts & Sweatshirts</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Based on Bella+Canvas 3001 / Gildan SF000</p>
            <div className="size-table-wrap">
              <table className="size-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest</th>
                    <th>Length</th>
                    <th>Sleeve</th>
                  </tr>
                </thead>
                <tbody>
                  {tshirtSizes.map((row) => (
                    <tr key={row.size}>
                      <td><strong>{row.size}</strong></td>
                      <td>{row.chest}</td>
                      <td>{row.length}</td>
                      <td>{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hoodie Size Chart */}
          <div>
            <h2 className="heading-lg" style={{ marginBottom: '0.5rem' }}>Hoodies</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Based on Champion S700 Reverse Weave</p>
            <div className="size-table-wrap">
              <table className="size-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest</th>
                    <th>Length</th>
                    <th>Sleeve</th>
                  </tr>
                </thead>
                <tbody>
                  {hoodieSizes.map((row) => (
                    <tr key={row.size}>
                      <td><strong>{row.size}</strong></td>
                      <td>{row.chest}</td>
                      <td>{row.length}</td>
                      <td>{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .size-tip-box {
          padding: 1.5rem;
          background: var(--border);
          border-radius: var(--radius-lg);
        }

        .size-table-wrap {
          overflow-x: auto;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }

        .size-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }

        .size-table th {
          background: var(--text);
          color: var(--bg);
          padding: 0.875rem 1.25rem;
          text-align: left;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .size-table td {
          padding: 0.875rem 1.25rem;
          border-bottom: 1px solid var(--border);
          color: var(--text-secondary);
        }

        .size-table tr:last-child td {
          border-bottom: none;
        }

        .size-table tr:nth-child(even) td {
          background: rgba(0,0,0,0.02);
        }
      `}</style>
    </div>
  );
}
