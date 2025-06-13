import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Newsletter from '@/app/models/Newsletter';

export async function GET() {
  try {
    await connectDB();
    const subscribers = await Newsletter.find().sort({ subscriptionDate: -1 });
    return NextResponse.json(subscribers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

// export async function DELETE(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');
    
//     await connectDB();
//     await Newsletter.findByIdAndDelete(id);
    
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to delete subscriber' }, { status: 500 });
//   }
// } 