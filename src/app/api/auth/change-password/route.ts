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

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       id: string;
//       username: string;
//     };

//     const { currentPassword, newPassword } = await request.json();

//     const admin = await Admin.findById(decoded.id);
//     if (!admin) {
//       return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
//     }

//     const isValidPassword = await admin.comparePassword(currentPassword);
//     if (!isValidPassword) {
//       return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
//     }

//     admin.password = newPassword;
//     await admin.save();

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Change password error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// } 