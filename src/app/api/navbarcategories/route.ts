import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import NavbarCategory from "@/app/models/NavbarCategory";
import File from "@/app/models/File";
import { middleware } from "@/middleware/auth";
import { checkAuth } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const categories = await NavbarCategory.find({}).sort({ name: 1 });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  try {
    await checkAuth(request);
    // Apply auth middleware

    await connectDB();
    const data = await request.json();

    // If the image is a file ID from the upload endpoint, keep it as is
    if (data.image && !data.image.startsWith("/api/files/")) {
      const file = await File.findById(data.image);
      if (file) {
        data.image = `/api/files/${file._id}`;
      }
    }

    const navbarCategory = await NavbarCategory.create(data);
    return NextResponse.json(navbarCategory);
  } catch (error) {
    console.error("Error creating navbar category:", error);
    return NextResponse.json(
      {
        error: "Failed to create navbar category",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await checkAuth(request);

    await connectDB();
    const { _id, ...data } = await request.json();
    const category = await NavbarCategory.findByIdAndUpdate(_id, data, {
      new: true,
    });
    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating navbar category:", error);
    return NextResponse.json(
      {
        error: "Failed to update navbar category",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  await checkAuth(request);
  await connectDB();
  const { _id } = await request.json();
  await NavbarCategory.findByIdAndDelete(_id);
  return NextResponse.json({ message: "Category deleted successfully" });
}
