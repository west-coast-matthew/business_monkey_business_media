'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import type { Product } from '@/types';
import { useFavorites } from '@/providers/FavoritesProvider';
import { RatingsBar } from '@/components/RatingsBar';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  }

  return (
    <Link href={`/products/${product.id}`} className="product-card">
      <div className="product-card-image">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          style={{ objectFit: 'cover' }}
          unoptimized
        />
        {product.isNew && <span className="product-card-badge">New</span>}
        <button
          className={`product-card-heart ${favorited ? 'product-card-heart--active' : ''}`}
          onClick={handleFavorite}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={15} fill={favorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="product-card-body">
        <p className="product-card-type">{product.type}</p>
        <p className="product-card-name">{product.name}</p>
        <p className="product-card-price">from ${product.price.toFixed(2)}</p>
        {product.rating != null && <RatingsBar rating={product.rating} />}
        {product.totalSold != null && (
          <p className="product-card-sold">{product.totalSold.toLocaleString()} sold</p>
        )}
      </div>
    </Link>
  );
}
