import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/app/models/Product";
import mongoose from "mongoose";
import NavbarCategory from "@/app/models/NavbarCategory";
import Category from "@/app/models/Category";
import Subcategory from "@/app/models/Subcategory";
import jwt from "jsonwebtoken";
import { checkAuth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    // Validate if category exists
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return NextResponse.json(
          { error: `Category with ID ${categoryId} not found` },
          { status: 404 }
        );
      }
    }

    let query = {};
    if (categoryId) {
      query = { categoryId };
    }

    const products = await Product.find(query)
      .sort({ name: 1 })
      .populate("navbarCategoryId")
      .populate({
        path: "categoryId",
        model: "Category",
        select: "name _id",
      })
      .populate({
        path: "subcategoryId",
        model: "Subcategory",
        select: "name _id",
      });

    console.log(`Found ${products.length} products for category ${categoryId}`);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await checkAuth(request);
    await connectDB();
    const data = await request.json();
    console.log("Received product data:", data);

    const {
      name,
      images,
      navbarCategoryId,
      categoryId,
      subcategoryId,
      catalogImage,
    } = data;

    if (!name || !navbarCategoryId) {
      return NextResponse.json(
        { error: "Name and navbar category are required" },
        { status: 400 }
      );
    }

    // Create new product
    const productData = {
      name,
      slug: name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, ""),
      images: images.filter(Boolean),
      navbarCategoryId,
      categoryId: categoryId || undefined,
      subcategoryId: subcategoryId || undefined,
      catalogImage: catalogImage || null,
    };

    console.log("Creating product with data:", productData);

    const product = await Product.create(productData);
    console.log("Created product:", product);

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create product",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await checkAuth(request);
    await connectDB();
    const values = await request.json();
    const { _id, ...data } = values
    console.log(values)
    console.log("Updating product. ID:", _id, "Data:", data);
    // Validate required fields
    if (
      data.navbarCategoryId &&
      !mongoose.Types.ObjectId.isValid(data.navbarCategoryId)
    ) {
      return NextResponse.json(
        { error: "Invalid navbarCategoryId" },
        { status: 400 }
      );
    }

    // Optional validation for categoryId and subcategoryId
    if (data.categoryId && !mongoose.Types.ObjectId.isValid(data.categoryId)) {
      return NextResponse.json(
        { error: "Invalid categoryId" },
        { status: 400 }
      );
    }

    if (
      data.subcategoryId &&
      !mongoose.Types.ObjectId.isValid(data.subcategoryId)
    ) {
      return NextResponse.json(
        { error: "Invalid subcategoryId" },
        { status: 400 }
      );
    }
    const productData = {
      name: values.name,
      slug: values.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, ""),
      images: values.images.filter(Boolean),
      navbarCategoryId: values.navbarCategoryId,
      categoryId: values.categoryId || undefined,
      subcategoryId: values.subcategoryId || undefined,
      catalogImages: values.catalogImages || [],
    };
    // Update the product
    const product = await Product.findByIdAndUpdate(
      _id,
      {
        ...productData,
        catalogImage: data.catalogImage || null,
      },
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log("Updated product:", product);
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update product",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await checkAuth(request);
    await connectDB();
    console.log("Database connected for deletion");
    const { _id } = await request.json();
    console.log("Deleting product with ID:", _id);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await Product.findById(_id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await Product.findByIdAndDelete(_id);
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete product",
      },
      { status: 500 }
    );
  }
}
