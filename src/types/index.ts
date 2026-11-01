export type ProductType = 'tshirt' | 'hoodie' | 'sweatshirt' | 'mug' | 'sticker';

export interface Theme {
  pk: number;
  id: string;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  logoText: string;
  imageUrl: string;
  featured: boolean;
  active: boolean;
}

export interface Product {
  id: string;
  themeId: string;
  themeSlug: string;
  name: string;
  description: string;
  price: number;
  type: ProductType;
  imageUrl: string;
  sizes?: string[];
  colors?: string[];
  isNew: boolean;
  isFeatured: boolean;
  salesCount: number;
  totalSold: number;
  rating: number;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  product: Product;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  email: string;
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  createdAt: string;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type SortOption = 'newest' | 'popular' | 'price-asc' | 'price-desc';
