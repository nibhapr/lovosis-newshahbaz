import { NextResponse, NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Contact from '@/app/models/Contact';

// export async function PATCH(
//     request: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     try {
//         await connectDB();
//         const body = await request.json();
//         const { id } = params;

//         const updatedContact = await Contact.findByIdAndUpdate(
//             id,
//             { ...body },
//             { new: true, runValidators: true }
//         );

//         if (!updatedContact) {
//             return NextResponse.json(
//                 { error: 'Contact not found' },
//                 { status: 404 }
//             );
//         }

//         return NextResponse.json(updatedContact);
//     } catch (error) {
//         console.error('Contact update error:', error);
//         return NextResponse.json(
//             { error: 'Failed to update contact' },
//             { status: 500 }
//         );
//     }
// }

// export async function DELETE(
//     request: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     try {
//         await connectDB();
//         const contact = await Contact.findByIdAndDelete(params.id);
        
//         if (!contact) {
//             return NextResponse.json(
//                 { error: 'Contact not found' },
//                 { status: 404 }
//             );
//         }
        
//         return NextResponse.json({ success: true });
//     } catch (error) {
//         console.error('Contact deletion error:', error);
//         return NextResponse.json(
//             { error: 'Failed to delete contact' },
//             { status: 500 }
//         );
//     }
// }

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const id = params.id;
        const contact = await Contact.findById(id);

        if (!contact) {
            return NextResponse.json(
                { error: 'Contact not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(contact);
    } catch (error) {
        console.error('Contact fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contact' },
            { status: 500 }
        );
    }
} 