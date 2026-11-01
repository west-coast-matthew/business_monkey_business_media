import { NextResponse } from 'next/server';
import themes from '@/data/themes.json';

export async function GET() {
  const active = themes.filter((t) => t.active);
  active.sort((a, b) => a.name.localeCompare(b.name));
  return NextResponse.json(active);
}
