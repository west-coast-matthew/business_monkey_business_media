import type { Theme, Product, PaginatedProducts, SortOption } from '@/types';

const BASE_URL = '/api';

export async function fetchThemes(): Promise<Theme[]> {
  const res = await fetch(`${BASE_URL}/themes`);
  if (!res.ok) throw new Error('Failed to fetch themes');
  return res.json();
}

export async function fetchThemeBySlug(slug: string): Promise<Theme> {
  const res = await fetch(`${BASE_URL}/themes/${slug}`);
  if (!res.ok) throw new Error(`Theme not found: ${slug}`);
  return res.json();
}

export interface FetchProductsParams {
  themeSlug?: string;
  type?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  sort?: SortOption;
  page?: number;
  pageSize?: number;
}

export async function fetchProducts(params: FetchProductsParams = {}): Promise<PaginatedProducts> {
  const query = new URLSearchParams();
  if (params.themeSlug) query.set('themeSlug', params.themeSlug);
  if (params.type) query.set('type', params.type);
  if (params.isNew !== undefined) query.set('isNew', String(params.isNew));
  if (params.isFeatured !== undefined) query.set('isFeatured', String(params.isFeatured));
  if (params.sort) query.set('sort', params.sort);
  if (params.page) query.set('page', String(params.page));
  if (params.pageSize) query.set('pageSize', String(params.pageSize));

  const res = await fetch(`${BASE_URL}/products?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Product not found: ${id}`);
  return res.json();
}

export async function fetchNewProducts(themeSlug?: string): Promise<Product[]> {
  const result = await fetchProducts({ themeSlug, isNew: true, sort: 'newest', pageSize: 8 });
  return result.items;
}

export async function fetchPopularProducts(themeSlug?: string): Promise<Product[]> {
  const result = await fetchProducts({ themeSlug, sort: 'popular', pageSize: 8 });
  return result.items;
}
