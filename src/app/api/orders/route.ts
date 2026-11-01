import { NextRequest, NextResponse } from 'next/server';

// In a real app these would persist to a database.
// Here we store in-memory for the session.
const orders: unknown[] = [];

export async function GET() {
  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const order = {
    id: `ORD-${Date.now()}`,
    ...body,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  return NextResponse.json(order, { status: 201 });
}
