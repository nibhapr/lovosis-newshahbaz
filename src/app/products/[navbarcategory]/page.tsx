import { connectDB } from '@/lib/db';
import Category from '@/app/models/Category';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import NavbarCategory from '@/app/models/NavbarCategory';
import Product from '@/app/models/Product';

export const dynamic = 'force-dynamic';

async function getNavbarCategory(slug: string) {
  await connectDB();
  return await NavbarCategory.findOne({ slug });
}

async function getCategories(navbarCategoryId: string) {
  await connectDB();
  return await Category.find({ navbarCategoryId }).sort({ name: 1 });
}

async function getProducts(navbarCategoryId: string) {
  await connectDB();
  return await Product.find({
    navbarCategoryId
  }).sort({ name: 1 }).lean();
}

export async function generateMetadata({ params }: { params: { navbarcategory: string } }): Promise<Metadata> {
  const navbarCategory = await getNavbarCategory(params.navbarcategory);
  
  if (!navbarCategory) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.'
    };
  }

  return {
    title: `${navbarCategory.name} | Lovosis Technology Pvt Ltd`,
    description: navbarCategory.description || `Browse our collection of ${navbarCategory.name} products`,
    openGraph: {
      title: `${navbarCategory.name} | Lovosis Technology Pvt Ltd`,
      description: navbarCategory.description || `Browse our collection of ${navbarCategory.name} products`,
      type: 'website',
      url: `/products/${params.navbarcategory}`,
    }
  };
}

export default async function NavbarCategoryPage({
  params
}: {
  params: { navbarcategory: string }
}) {
  const navbarCategory = await getNavbarCategory(params.navbarcategory);

  if (!navbarCategory) {
    return <div className="container mx-auto px-4 py-12">Navbar Category not found</div>;
  }

  const categories = await getCategories(navbarCategory._id.toString());
  const uncategorizedProducts = await getProducts(navbarCategory._id.toString());

  // Add JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: navbarCategory.name,
    description: navbarCategory.description,
    url: `/products/${params.navbarcategory}`,
    numberOfItems: categories.length + uncategorizedProducts.length,
    itemListElement: [
      ...categories.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: category.name,
          description: category.description,
          url: `/products/${params.navbarcategory}/${category.slug}`
        }
      })),
      ...uncategorizedProducts.map((product, index) => ({
        '@type': 'ListItem',
        position: categories.length + index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          description: product.description,
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
      <div className="container mx-auto px-4 py-12 bg-white min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-black">
          {navbarCategory.name} 
        </h1>
        {navbarCategory.description && (
          <p className="text-gray-800 mb-8">{navbarCategory.description}</p>
        )}

        {categories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-black">
              Categories 
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/products/${params.navbarcategory}/${category.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1 border border-gray-200">
                    <div className="relative h-48 w-full">
                      <Image
                        src={category.image || '/images/placeholder.jpg'}
                        alt={category.name}
                        fill
                        unoptimized={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2 text-black">{category.name}</h2>
                      {category.description && (
                        <p className="text-gray-600">{category.description}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {uncategorizedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-black">
              Other Products 
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {uncategorizedProducts.map((product) => (
                <Link
                  key={product._id as string}
                  href={`/products/${params.navbarcategory}/_/_/${product.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1 border border-gray-200">
                    <div className="relative h-48 w-full">
                      <Image
                        src={product.images?.[0] || '/images/placeholder.jpg'}
                        alt={product.name}
                        fill
                        unoptimized={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2 text-black">{product.name}</h2>
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
      </div>
    </>
  );
}
