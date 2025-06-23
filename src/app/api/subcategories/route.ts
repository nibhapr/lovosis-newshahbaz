import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Subcategory from '@/app/models/Subcategory';
import Category from '@/app/models/Category';
import mongoose from 'mongoose';
import { middleware } from '@/middleware/auth';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const navbarCategoryId = searchParams.get('navbarCategoryId');

    let query = {};
    
    if (categoryId) {
      query = { categoryId };
    } else if (navbarCategoryId) {
      const categories = await Category.find({ navbarCategoryId });
      const categoryIds = categories.map(cat => cat._id);
      query = { categoryId: { $in: categoryIds } };
    }

    const subcategories = await Subcategory.find(query).sort({ name: 1 });
    return NextResponse.json(subcategories);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subcategories' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // Validate name length
    if (!data.name || data.name.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    // Validate categoryId
    if (!data.categoryId || !mongoose.Types.ObjectId.isValid(data.categoryId)) {
      return NextResponse.json(
        { error: 'Valid categoryId is required' },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await Category.findById(data.categoryId);
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    const subcategory = await Subcategory.create(data);
    return NextResponse.json(subcategory);
  } catch (error) {
    console.error('Error creating subcategory:', error);
    return NextResponse.json(
      { error: 'Failed to create subcategory' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const authResponse = await middleware(request);
    if (authResponse) {
      return authResponse; 
    }

    await connectDB();
    const data = await request.json();

    // Validate the subcategory ID
    const { id } = data;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Valid subcategory ID is required' },
        { status: 400 }
      );
    }

    // Validate categoryId if provided
    if (data.categoryId && !mongoose.Types.ObjectId.isValid(data.categoryId)) {
      return NextResponse.json(
        { error: 'Invalid categoryId' },
        { status: 400 }
      );
    }

    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
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