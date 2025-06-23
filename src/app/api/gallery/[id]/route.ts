import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Gallery from '@/app/models/Gallery';
import File from '@/app/models/File';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const data = await request.json();
    
    const gallery = await Gallery.findByIdAndUpdate(
      params.id,
      { $set: data },
      { new: true }
    );

    if (!gallery) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(gallery);
  } catch (error) {
    console.error('Gallery update error:', error);
    return NextResponse.json(
      { error: 'Failed to update gallery item' },
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
    
//     // Find the gallery item first to get its images
//     const gallery = await Gallery.findById(params.id);
    
//     if (!gallery) {
//       return NextResponse.json(
//         { error: 'Gallery item not found' },
//         { status: 404 }
//       );
//     }
    
//     // Delete the gallery item
//     await Gallery.findByIdAndDelete(params.id);
    
//     // Delete associated images from MongoDB
//     if (gallery.images && gallery.images.length > 0) {
//       const filesToDelete = gallery.images
//         .filter((img: string) => img.startsWith('/api/files/'))
//         .map((img: string) => img.split('/').pop());
      
//       if (filesToDelete.length > 0) {
//         await File.deleteMany({ _id: { $in: filesToDelete } });
//       }
//     }
    
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Gallery deletion error:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete gallery item' },
//       { status: 500 }
//     );
//   }
// } 