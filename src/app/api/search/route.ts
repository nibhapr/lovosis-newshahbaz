import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import NavbarCategory from '@/app/models/NavbarCategory';
import Category from '@/app/models/Category';
import Subcategory from '@/app/models/Subcategory';
import Product from '@/app/models/Product';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json([]);
    }

    const searchRegex = new RegExp(query, 'i');

    // Search across all collections in parallel with populated data
    const [
      navbarCategories,
      categories,
      subcategories,
      products,
    ] = await Promise.all([
      NavbarCategory.find({ name: searchRegex }).limit(5),
      Category.find({ name: searchRegex })
        .populate('navbarCategoryId')
        .limit(5),
      Subcategory.find({ name: searchRegex })
        .populate('categoryId')
        .limit(5),
      Product.find({ name: searchRegex })
        .populate('navbarCategoryId')
        .populate('categoryId')
        .populate('subcategoryId')
        .limit(5),
    ]);

    // Create a Map to handle duplicates with priority (Product > Subcategory > Category > Product Group)
    const resultMap = new Map();

    const addResult = (result: any, priority: number) => {
      const key = result.title.toLowerCase();
      if (!resultMap.has(key) || resultMap.get(key).priority > priority) {
        resultMap.set(key, { ...result, priority });
      }
    };

    // Add results in reverse priority order (higher number = lower priority)
    navbarCategories.forEach(nc => addResult({
      title: nc.name,
      url: `/products/${nc.slug}`,
      type: 'Product Group'
    }, 4));

    categories.forEach(c => {
      const navbarSlug = c.navbarCategoryId?.slug || '_';
      addResult({
        title: c.name,
        url: `/products/${navbarSlug}/${c.slug}`,
        type: 'Category'
      }, 3);
    });

    subcategories.forEach(sc => {
      const category = sc.categoryId;
      const navbarSlug = category?.navbarCategoryId?.slug || '_';
      const categorySlug = category?.slug || '_';
      addResult({
        title: sc.name,
        url: `/products/${navbarSlug}/${categorySlug}/${sc.slug}`,
        type: 'Subcategory'
      }, 2);
    });

    products.forEach(p => {
      const navbarSlug = p.navbarCategoryId?.slug || '_';
      const categorySlug = p.categoryId?.slug || '_';
      const subcategorySlug = p.subcategoryId?.slug || '_';
      addResult({
        title: p.name,
        url: `/products/${navbarSlug}/${categorySlug}/${subcategorySlug}/${p.slug}`,
        type: 'Product'
      }, 1);
    });

    // Remove priority field and return results
    const results = Array.from(resultMap.values()).map(({ priority, ...result }) => result);

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}