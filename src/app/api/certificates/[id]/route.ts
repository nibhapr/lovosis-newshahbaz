import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Certificate from '@/app/models/Certificate';
import File from '@/app/models/File';

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectDB();
//     const data = await request.json();
    
//     const certificate = await Certificate.findByIdAndUpdate(
//       params.id,
//       { $set: data },
//       { new: true }
//     );

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

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectDB();
    
//     // Find the certificate item first to get its images
//     const certificate = await Certificate.findById(params.id);
    
//     if (!certificate) {
//       return NextResponse.json(
//         { error: 'Certificate not found' },
//         { status: 404 }
//       );
//     }

//     // Delete the certificate
//     await Certificate.findByIdAndDelete(params.id);
    
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Certificate deletion error:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete certificate' },
//       { status: 500 }
//     );
//   }
// }