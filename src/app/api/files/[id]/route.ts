import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import File from '@/app/models/File';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  
  const file = await File.findById(params.id);
  if (!file) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  return new NextResponse(file.data, {
    headers: {
      'Content-Type': file.type || 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
} 