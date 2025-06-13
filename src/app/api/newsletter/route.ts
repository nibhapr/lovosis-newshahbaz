import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Newsletter from '@/app/models/Newsletter';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const { email } = await request.json();

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    // Create new subscriber
    const subscriber = new Newsletter({ email });
    await subscriber.save();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const subscribers = await Newsletter.find().sort({ subscriptionDate: -1 });
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('Newsletter fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB();
    const { id, status } = await request.json();

    const subscriber = await Newsletter.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(subscriber);
  } catch (error) {
    console.error('Newsletter update error:', error);
    return NextResponse.json(
      { error: 'Failed to update subscriber status' },
      { status: 500 }
    );
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
//     return NextResponse.json(
//       { error: 'Failed to delete subscriber' },
//       { status: 500 }
//     );
//   }
// } 