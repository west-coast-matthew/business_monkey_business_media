'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchThemes } from '@/services/catalog.service';
import { ThemeCard } from '@/components/ThemeCard';

export default function ThemesPage() {
  const { data: themes = [], isLoading } = useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <p className="page-hero-eyebrow">Browse</p>
          <h1 className="heading-display">All Themes</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', maxWidth: '480px' }}>
            Every collection is built around a unique lifestyle, passion, or community.
            Find yours.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {isLoading ? (
            <div className="grid-themes">
              {[1, 2].map((i) => (
                <div key={i} className="skeleton" style={{ aspectRatio: '4/3', borderRadius: 'var(--radius-md)' }} />
              ))}
            </div>
          ) : (
            <div className="grid-themes">
              {themes.map((theme) => (
                <ThemeCard key={theme.id} theme={theme} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
