import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Certificate from '@/app/models/Certificate';
import File from '@/app/models/File';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const query = category ? { category } : {};
    const certificates = await Certificate.find(query).sort({ date: -1 });
    
    return NextResponse.json(certificates);
  } catch (error) {
    console.error('Certificates fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certificates' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // Handle image uploads
    const imageUrls = await Promise.all(data.images.map(async (image: string) => {
      if (image.startsWith('/api/files/')) {
        return image; // Already uploaded
      }
      const file = await File.findById(image); // Assuming image is the file ID
      return file ? `/api/files/${file._id}` : null;
    }));

    const certificate = await Certificate.create({
      ...data,
      images: imageUrls.filter(url => url !== null), // Filter out any null values
    });
    return NextResponse.json(certificate);
  } catch (error) {
    console.error('Certificate creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create certificate' },
      { status: 500 }
    );
  }
}

// export async function PUT(request: Request) {
//   try {
//     await connectDB();
//     const data = await request.json();
//     const { _id, ...updateData } = data;

//     // Handle image uploads
//     const imageUrls = await Promise.all(updateData.images.map(async (image: string) => {
//       if (image.startsWith('/api/files/')) {
//         return image; // Already uploaded
//       }
//       const file = await File.findById(image); // Assuming image is the file ID
//       return file ? `/api/files/${file._id}` : null;
//     }));

//     const certificate = await Certificate.findByIdAndUpdate(_id, {
//       ...updateData,
//       images: imageUrls.filter(url => url !== null), // Filter out any null values
//     }, { new: true });

//     if (!certificate) {
//       return NextResponse.json(
//         { error: 'Certificate not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(certificate);
//   } catch (error) {
//     console.error('Certificate update error:', error);
//     return NextResponse.json(
//       { error: 'Failed to update certificate' },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: Request) {
//   try {
//     await connectDB();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');
    
//     if (!id) {
//       return NextResponse.json(
//         { error: 'ID is required' },
//         { status: 400 }
//       );
//     }

//     const certificate = await Certificate.findByIdAndDelete(id);
//     if (!certificate) {
//       return NextResponse.json(
//         { error: 'Certificate not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Certificate deletion error:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete certificate' },
//       { status: 500 }
//     );
//   }
// }