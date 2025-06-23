import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Subcategory from '@/app/models/Subcategory';
import File from '@/app/models/File';
import mongoose from 'mongoose';
import { middleware } from '@/middleware/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const subcategory = await Subcategory.findById(params.id);
    
    if (!subcategory) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(subcategory);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subcategory' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authResponse = await middleware(request);
    if (authResponse) {
      return authResponse; 
    }

    await connectDB();
    const data = await request.json();

    // Validate categoryId if provided
    if (data.categoryId && !mongoose.Types.ObjectId.isValid(data.categoryId)) {
      return NextResponse.json(
        { error: 'Invalid categoryId' },
        { status: 400 }
      );
    }

    const subcategory = await Subcategory.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    );

    if (!subcategory) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(subcategory);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update subcategory' },
      { status: 500 }
    );
  }
}

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectDB();
//     await Subcategory.findByIdAndDelete(params.id);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Database error:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete subcategory' },
//       { status: 500 }
//     );
//   }
// } 