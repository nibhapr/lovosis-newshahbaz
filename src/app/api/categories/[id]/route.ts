import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Category from '@/app/models/Category';
import File from '@/app/models/File';
import { middleware } from '@/middleware/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const category = await Category.findById(params.id);
    
    if (!category) {
      return NextResponse.json(
        { error: 'Navbar Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(category);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Apply the auth middleware
    const authResponse = await middleware(request);
    if (authResponse) {
      return authResponse;
    }

    await connectDB();
    const { id } = params;
    const data = await request.json();
    
    if (!data.name || !data.slug || !data.navbarCategoryId) {
      return NextResponse.json(
        { error: 'Name, slug, and navbarCategoryId are required' },
        { status: 400 }
      );
    }

    const existingCategory = await Category.findOne({
      slug: data.slug,
      _id: { $ne: id }
    });
    
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Another category with this slug already exists' },
        { status: 409 }
      );
    }
    const category = await Category.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(category);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
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
    
//     const category = await Category.findById(params.id);
    
//     if (!category) {
//       return NextResponse.json(
//         { error: 'Navbar Category not found' },
//         { status: 404 }
//       );
//     }
    
//     await Category.findByIdAndDelete(params.id);
    
//     if (category.image && category.image.startsWith('/api/files/')) {
//       const fileId = category.image.split('/').pop();
//       if (fileId) {
//         await File.findByIdAndDelete(fileId);
//       }
//     }
    
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Database error:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete category' },
//       { status: 500 }
//     );
//   }
// } 