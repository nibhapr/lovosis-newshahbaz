import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import CatalogRequest from '@/app/models/CatalogRequest';
import { checkAuth } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const catalogRequest = await CatalogRequest.findById(params.id);
    
    if (!catalogRequest) {
      return NextResponse.json(
        { error: 'Catalog request not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(catalogRequest);
  } catch (error) {
    console.error('Error fetching catalog request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch catalog request' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await checkAuth(request);
    await connectDB();
    const data = await request.json();
    
    // Only allow status updates via PATCH
    const allowedUpdates = { status: data.status };
    
    const updatedRequest = await CatalogRequest.findByIdAndUpdate(
      params.id,
      allowedUpdates,
      { new: true, runValidators: true }
    );
    
    if (!updatedRequest) {
      return NextResponse.json(
        { error: 'Catalog request not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error('Error updating catalog request:', error);
    return NextResponse.json(
      { error: 'Failed to update catalog request' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const deletedRequest = await CatalogRequest.findByIdAndDelete(params.id);
    
    if (!deletedRequest) {
      return NextResponse.json(
        { error: 'Catalog request not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Catalog request deleted successfully' });
  } catch (error) {
    console.error('Error deleting catalog request:', error);
    return NextResponse.json(
      { error: 'Failed to delete catalog request' },
      { status: 500 }
    );
  }
} 