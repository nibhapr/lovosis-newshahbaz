import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Contact from '@/app/models/Contact';

// export async function POST(request: Request) {
//   try {
//     await connectDB();
    
//     const body = await request.json();
//     const contact = new Contact(body);
//     await contact.save();
    
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Contact submission error:', error);
//     return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Contact fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
} 