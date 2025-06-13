import { connectDB } from '@/lib/db';
import Category from '@/app/models/Category';
import Subcategory from '@/app/models/Subcategory';
import Product from '@/app/models/Product';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getCategory(slug: string) {
  try {
    await connectDB();
    const category = await Category.findOne({ slug });

    if (!category) {
      console.error(`Category with slug "${slug}" not found. Check the database for existing categories.`);
      console.log('Available categories:', await Category.find({}, { slug: 1, name: 1 }));
      return null;
    }

    return category;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

async function getSubcategories(categoryId: string) {
  try {
    await connectDB();
    return await Subcategory.find({ categoryId });
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return [];
  }
}

async function getProducts(navbarCategoryId: string, categoryId: string) {
  try {
    await connectDB();
    return await Product.find({
      navbarCategoryId,
      categoryId,
      $or: [
        { subcategoryId: { $exists: false } },
        { subcategoryId: null }
      ]
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { navbarcategory: string, category: string } }): Promise<Metadata> {
  const category = await getCategory(params.category);
  
  if (!category) {
    return {
      title: 'Category Not Found | Lovosis Technology Pvt Ltd',
      description: 'The requested category could not be found.'
    };
  }

  return {
    title: `${category.name} | Lovosis Technology Pvt Ltd`,
    description: category.description || `Browse our collection of ${category.name} products`,
    openGraph: {
      title: `${category.name} | Lovosis Technology Pvt Ltd`,
      description: category.description || `Browse our collection of ${category.name} products`,
      type: 'website',
      url: `/products/${params.navbarcategory}/${params.category}`,
    }
  };
}

export default async function CategoryPage({
  params
}: {
  params: { navbarcategory: string, category: string }
}) {
  const category = await getCategory(params.category);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12 bg-white text-black">
        <h1 className="text-3xl font-bold mb-8 text-blue-600">Category not found</h1>
        <p className="text-gray-800">
          The category "{params.category}" does not exist.
        </p>
        <Link
          href={`/products/${params.navbarcategory}`}
          className="mt-4 text-blue-600 hover:text-blue-500 hover:underline"
        >
          &larr; Back to {params.navbarcategory}
        </Link>
      </div>
    );
  }

  const subcategories = await getSubcategories(category._id.toString());
  const products = await getProducts(category.navbarCategoryId.toString(), category._id.toString());

  // Add JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `/products/${params.navbarcategory}/${params.category}`,
    numberOfItems: subcategories.length + products.length,
    itemListElement: [
      ...subcategories.map((subcategory, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: subcategory.name,
          description: subcategory.description,
          url: `/products/${params.navbarcategory}/${params.category}/${subcategory.slug}`,
          image: subcategory.image || '/images/placeholder.jpg'
        }
      })),
      ...products.map((product, index) => ({
        '@type': 'ListItem',
        position: subcategories.length + index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          description: product.description,
          url: `/products/${params.navbarcategory}/${params.category}/_/${product.slug}`,
          image: product.images?.[0] || '/images/placeholder.jpg'
        }
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white text-black">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-black">
            {category.name} ({subcategories.length + products.length})
          </h1>

          {category.description && (
            <p className="text-gray-800 mb-8">{category.description}</p>
          )}

          {/* Render subcategories if they exist */}
          {subcategories.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-black">Subcategories ({subcategories.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subcategories.map((subcategory) => (
                  <Link
                    key={subcategory._id}
                    href={`/products/${params.navbarcategory}/${params.category}/${subcategory.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1 border border-gray-200">
                      <div className="relative h-48 w-full">                      <Image
                        src={subcategory.image || '/images/placeholder.jpg'}
                        alt={subcategory.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                        quality={75}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHyAjIR8qLSgwKy0sLiwoNz83Mjc3NzchLS4tNEY0OD0+PD83QD05Ozk5Ozn/2wBDAR"
                      />
                      </div>
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-2 text-blue-600">{subcategory.name}</h2>
                        {subcategory.description && (
                          <p className="text-gray-600">{subcategory.description}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Always render products section if products exist */}
          {products.length > 0 && (
            <div>
              {subcategories.length > 0 && <h2 className="text-2xl font-semibold mb-4 text-black">Products ({products.length})</h2>}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${params.navbarcategory}/${params.category}/_/${product.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1 border border-gray-200">
                      <div className="relative h-48 w-full">                      <Image
                        src={product.images?.[0] || '/images/placeholder.jpg'}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                        quality={75}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHyAjIR8qLSgwKy0sLiwoNz83Mjc3NzchLS4tNEY0OD0+PD83QD05Ozk5Ozn/2wBDAR"
                      />
                      </div>
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-2 text-blue-600">{product.name}</h2>
                        {product.description && (
                          <p className="text-gray-600">{product.description}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {subcategories.length === 0 && products.length === 0 && (
            <p className="text-gray-600">No subcategories or products found in this category.</p>
          )}
        </div>
      </div>
    </>
  );
}