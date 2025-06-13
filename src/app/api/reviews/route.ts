import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Review from '@/app/models/Review';

export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const itemId = searchParams.get('itemId');
  const itemType = searchParams.get('itemType');
  
  const query: any = {};
  if (itemId) query.itemId = itemId;
  if (itemType) query.itemType = itemType;
  
  const reviews = await Review.find(query);
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  
  try {
    const review = await Review.create(body);
    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
} 