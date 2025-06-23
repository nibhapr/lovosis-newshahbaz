import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/app/models/Category';
import mongoose from 'mongoose';
import NavbarCategory from '@/app/models/NavbarCategory';
import { middleware } from '@/middleware/auth';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({}).select('_id name slug navbarCategoryId').sort({ name: 1 });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Apply the auth middleware
    const authResponse = await middleware(request);
    if (authResponse) {
      return authResponse;
    }

    await connectDB();
    const data = await request.json();
    
    console.log('Received data:', data);

    // Convert navbarCategoryId to ObjectId if it's a string
    if (typeof data.navbarCategoryId === 'string') {
      data.navbarCategoryId = new mongoose.Types.ObjectId(data.navbarCategoryId);
    }

    // Validate navbarCategoryId exists and is a valid ObjectId
    if (!data.navbarCategoryId || !mongoose.Types.ObjectId.isValid(data.navbarCategoryId)) {
      console.error('Invalid navbarCategoryId:', data.navbarCategoryId);
      return NextResponse.json(
        { error: 'Valid navbarCategoryId is required' },
        { status: 400 }
      );
    }

    // Check if the referenced NavbarCategory exists
    const navbarCategory = await NavbarCategory.findById(data.navbarCategoryId);
    if (!navbarCategory) {
      console.error('NavbarCategory not found:', data.navbarCategoryId);
      return NextResponse.json(
        { error: 'Referenced NavbarCategory not found' },
        { status: 404 }
      );
    }

    console.log('Creating category in database...');
    const category = await Category.create(data);
    console.log('Category created:', category);

    // Verify the category was actually saved
    const savedCategory = await Category.findById(category._id);
    if (!savedCategory) {
      console.error('Category not found after creation');
      return NextResponse.json(
        { error: 'Category creation failed' },
        { status: 500 }
      );
    }

    return NextResponse.json(savedCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create category', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}