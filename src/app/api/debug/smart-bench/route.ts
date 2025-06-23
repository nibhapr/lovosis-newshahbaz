import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/app/models/Product';

export async function GET() {
  try {
    await connectDB();
    
    const smartBenchProduct = await Product.findOne({ name: "Smart Bench" })
      .populate('navbarCategoryId')
      .populate('categoryId')
      .populate('subcategoryId');
    
    if (!smartBenchProduct) {
      return NextResponse.json({ error: 'Smart Bench product not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Smart Bench Debug Info',
      product: {
        id: smartBenchProduct._id,
        name: smartBenchProduct.name,
        slug: smartBenchProduct.slug,
        catalogImage: smartBenchProduct.catalogImage,
        updatedAt: smartBenchProduct.updatedAt,
        createdAt: smartBenchProduct.createdAt,
        fullDocument: smartBenchProduct.toObject()
      },
      timestamps: {
        now: new Date().toISOString(),
        productUpdatedAt: smartBenchProduct.updatedAt,
        timeSinceUpdate: new Date().getTime() - new Date(smartBenchProduct.updatedAt).getTime()
      }
    });
  } catch (error) {
    console.error('Smart Bench debug error:', error);
    return NextResponse.json(
      { error: 'Failed to get Smart Bench info', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const { catalogImage } = await request.json();
    
    console.log('=== MANUAL SMART BENCH UPDATE ===');
    console.log('New catalogImage:', catalogImage);
    
    const updatedProduct = await Product.findOneAndUpdate(
      { name: "Smart Bench" },
      { 
        catalogImage: catalogImage,
        updatedAt: new Date()
      },
      { new: true }
    );
    
    console.log('Updated product:', updatedProduct.toObject());
    
    return NextResponse.json({
      message: 'Smart Bench updated successfully',
      product: updatedProduct.toObject()
    });
  } catch (error) {
    console.error('Manual update error:', error);
    return NextResponse.json(
      { error: 'Failed to update Smart Bench', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}