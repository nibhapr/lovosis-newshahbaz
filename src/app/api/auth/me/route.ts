import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Admin from '@/app/models/Admin';

// export async function GET() {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get('token')?.value;

//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       id: string;
//       username: string;
//     };

//     const admin = await Admin.findById(decoded.id);
//     if (!admin) {
//       return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       id: admin._id,
//       username: admin.username,
//       lastLoginAt: admin.lastLoginAt
//     });
//   } catch (error) {
//     console.error('Me error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }