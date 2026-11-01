import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  // In production this would add the email to a mailing list service.
  return NextResponse.json({ message: 'Subscribed successfully', email });
}
