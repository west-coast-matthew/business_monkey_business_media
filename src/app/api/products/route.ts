import { NextRequest, NextResponse } from 'next/server';
import allProducts from '@/data/products.json';
import type { Product, SortOption } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const themeSlug = searchParams.get('themeSlug');
  const type = searchParams.get('type');
  const isNew = searchParams.get('isNew');
  const isFeatured = searchParams.get('isFeatured');
  const sort = (searchParams.get('sort') as SortOption) ?? 'newest';
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') ?? '12', 10);

  let products: Product[] = allProducts as Product[];

  if (themeSlug) products = products.filter((p) => p.themeSlug === themeSlug);
  if (type) products = products.filter((p) => p.type === type);
  if (isNew === 'true') products = products.filter((p) => p.isNew);
  if (isFeatured === 'true') products = products.filter((p) => p.isFeatured);

  switch (sort) {
    case 'popular':
      products = products.sort((a, b) => b.salesCount - a.salesCount);
      break;
    case 'price-asc':
      products = products.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      products = products.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
    default:
      products = products.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  const total = products.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginated = products.slice((page - 1) * pageSize, page * pageSize);

  return NextResponse.json({ items: paginated, total, page, pageSize, totalPages });
}
