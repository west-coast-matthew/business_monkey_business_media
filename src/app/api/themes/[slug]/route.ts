import { NextResponse } from 'next/server';
import themes from '@/data/themes.json';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const theme = themes.find((t) => t.slug === slug && t.active);

  if (!theme) {
    return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
  }

  return NextResponse.json(theme);
}
