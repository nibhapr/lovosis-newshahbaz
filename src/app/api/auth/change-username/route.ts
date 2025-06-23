import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Admin from '@/app/models/Admin';
import { connectDB } from '@/lib/db';

// export async function POST(request: Request) {
//   try {
//     await connectDB();
    
//     const cookieStore = await cookies();
//     const token = cookieStore.get('token')?.value;

//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
//     const { newUsername, currentPassword } = await request.json();

//     if (!newUsername || !currentPassword) {
//       return NextResponse.json({ error: 'New username and current password are required' }, { status: 400 });
//     }

//     const admin = await Admin.findById(decoded.id);
//     if (!admin) {
//       return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
//     }

//     // Verify current password
//     const isValidPassword = await admin.comparePassword(currentPassword);
//     if (!isValidPassword) {
//       return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
//     }

//     // Check if new username already exists
//     const existingAdmin = await Admin.findOne({ username: newUsername });
//     if (existingAdmin && existingAdmin._id.toString() !== admin._id.toString()) {
//       return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
//     }

//     admin.username = newUsername;
//     await admin.save();

//     // Create new token with updated username
//     const newToken = jwt.sign(
//       { id: admin._id, username: admin.username },
//       process.env.JWT_SECRET!,
//       { expiresIn: '1d' }
//     );

//     const response = NextResponse.json({ success: true });
//     response.cookies.set('token', newToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 86400 // 1 day
//     });

//     return response;
//   } catch (error) {
//     console.error('Change username error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// } 