import type { Order, CartItem } from '@/types';

const BASE_URL = '/api';

export interface CreateOrderPayload {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  email: string;
  shippingAddress: Order['shippingAddress'];
}

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
}

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${BASE_URL}/orders`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function subscribeNewsletter(email: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('Failed to subscribe');
}
