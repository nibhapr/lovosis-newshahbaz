import { NextResponse } from 'next/server';
import { connectDB as dbConnect } from '@/lib/db';
import Review from '@/app/models/Review';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    await Review.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
} 