import Link from 'next/link';
import Image from 'next/image';
import type { Theme } from '@/types';

interface ThemeCardProps {
  theme: Theme;
}

export function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <Link href={`/themes/${theme.slug}`} className="theme-card">
      <Image
        src={theme.imageUrl}
        alt={theme.name}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="theme-card-image"
        style={{ objectFit: 'cover' }}
        unoptimized
      />
      <div className="theme-card-content">
        <p className="theme-card-name">{theme.name}</p>
        <p className="theme-card-tagline">{theme.tagline}</p>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            marginTop: '0.875rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#fff',
          }}
        >
          Shop the Collection →
        </span>
      </div>
      <div className="theme-card-description-overlay">
        <p className="theme-card-description-text">{theme.description}</p>
      </div>

      <style>{`
        .theme-card-description-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.72);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .theme-card:hover .theme-card-description-overlay {
          opacity: 1;
        }
        .theme-card-description-text {
          color: #fff;
          font-size: 1rem;
          line-height: 1.6;
          text-align: center;
          max-width: 36ch;
        }
      `}</style>
    </Link>
  );
}
