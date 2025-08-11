import { NextResponse } from 'next/server';
import { getSearchItems } from '@/lib/docs';

export async function GET() {
  const items = getSearchItems();
  return NextResponse.json({ items });
} 