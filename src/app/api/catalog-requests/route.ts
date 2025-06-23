import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import CatalogRequest from '@/app/models/CatalogRequest';

export async function GET() {
  try {
    await connectDB();
    const requests = await CatalogRequest.find({}).sort({ createdAt: -1 });
    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching catalog requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch catalog requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // Validate required fields
    if (!data.fullName || !data.companyName || !data.email || !data.phone || !data.productName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Set default status to pending if not provided
    data.status = data.status || 'pending';

    const newRequest = new CatalogRequest(data);
    await newRequest.save();

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error('Error creating catalog request:', error);
    return NextResponse.json(
      { error: 'Failed to create catalog request: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
} 