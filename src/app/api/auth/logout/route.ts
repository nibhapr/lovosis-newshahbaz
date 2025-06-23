import { NextResponse } from 'next/server';

// export async function POST() {
//   const response = NextResponse.json({ success: true });
  
//   // Clear the auth token cookie
//   response.cookies.set('token', '', {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     expires: new Date(0) // Set expiration to past date to delete cookie
//   });

//   return response;
// } 