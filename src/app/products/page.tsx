import { Metadata } from 'next';
import { connectDB } from '@/lib/db';
import NavbarCategory from '@/app/models/NavbarCategory';
import Category from '@/app/models/Category';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Product Categories | Lovosis Technologies Pvt. Ltd.',
  description: 'Explore our wide range of product categories. Find high-quality industrial equipment and supplies at Lovosis Technology Pvt Ltd.',
  keywords: 'industrial products, equipment categories, Lovosis Technology Pvt Ltd products, industrial supplies',
  openGraph: {
    title: 'Product Categories | Lovosis Technologies Pvt. Ltd.',
    description: 'Explore our wide range of product categories. Find high-quality industrial equipment and supplies at Lovosis Technology Pvt Ltd.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Lovosis Technologies Pvt. Ltd.',
    url: 'https://lovosis.in/products',
    images: [{
      url: '/og-image.jpg', // Make sure to add an OG image in your public folder
      width: 1200,
      height: 630,
      alt: 'Lovosis Technology Pvt Ltd Product Categories'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Categories | Lovosis Technologies Pvt. Ltd.',
    description: 'Explore our wide range of product categories. Find high-quality industrial equipment and supplies at Lovosis Technology Pvt Ltd.',
    images: ['/og-image.jpg'], // Same as OG image
  },
  robots: {
    index: true,
    follow: true,
  }
};

// Add this line to disable caching and enable real-time updates
export const revalidate = 0;

async function getNavbarCategories() {
  await connectDB();
  return await NavbarCategory.find({}).sort({ name: 1 });
}

async function getCategories() {
  await connectDB();
  return await Category.find({}).sort({ name: 1 });
}

export default async function ShopPage() {
  const navbarCategories = await getNavbarCategories();
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-12 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">Product Categories ({navbarCategories.length})</h1>

      {/* Desktop View */}
      <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {navbarCategories.map((navbarCategory) => {
          const categoryItems = categories.filter(
            (category) => category.navbarCategoryId === navbarCategory._id.toString()
          );

          return (
            <div key={navbarCategory._id.toString()} className="mb-12 bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300">
              <Link href={`/products/${navbarCategory.slug}`} className="block">
                <h2 className="text-xl font-semibold mb-4 text-black hover:text-blue-600 transition-all duration-300">
                  {navbarCategory.name}
                </h2>

                {navbarCategory.image && (
                  <div className="relative h-32 w-full mb-4 rounded-lg">
                    <Image
                      src={navbarCategory.image.startsWith('/api/files/')
                        ? `https://${process.env.NEXT_PUBLIC_DOMAIN}${navbarCategory.image}`
                        : navbarCategory.image}
                      alt={navbarCategory.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                      style={{ objectFit: 'contain' }}
                      quality={100}  // Add this line to prevent compression
                    />
                  </div>
                )}

                {navbarCategory.description && (
                  <p className="text-gray-600 mb-4">{navbarCategory.description}</p>
                )}
              </Link>

              {/* Display categories under this navbar category */}
              {categoryItems.length > 0 && (
                <div className="ml-4 mt-2">
                  <ul className="space-y-2">
                    {categoryItems.map((category) => (
                      <li key={category._id.toString()}>
                        <Link
                          href={`/products/${navbarCategory.slug}/${category.slug}`}
                          className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors duration-200"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="sm:hidden grid grid-cols-1 gap-6">
        {navbarCategories.map((navbarCategory) => {
          const categoryItems = categories.filter(
            (category) => category.navbarCategoryId === navbarCategory._id.toString()
          );

          return (
            <div key={navbarCategory._id.toString()} className="mb-6 bg-white rounded-xl p-6 border border-gray-200">
              <Link href={`/products/${navbarCategory.slug}`} className="block">
                <h2 className="text-xl font-semibold mb-4 text-black">
                  {navbarCategory.name}
                </h2>

                {navbarCategory.image && (
                  <div className="relative h-40 w-full mb-4 rounded-lg">
                    <Image
                      src={navbarCategory.image.startsWith('/api/files/')
                        ? `https://${process.env.NEXT_PUBLIC_DOMAIN}${navbarCategory.image}`
                        : navbarCategory.image}
                      alt={navbarCategory.name}
                      fill
                      sizes="100vw"
                      className="object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                )}

                {navbarCategory.description && (
                  <p className="text-gray-600 mb-4">{navbarCategory.description}</p>
                )}
              </Link>

              {/* Display categories under this navbar category for mobile */}
              {categoryItems.length > 0 && (
                <div className="ml-2 mt-1">
                  <ul className="space-y-2">
                    {categoryItems.map((category) => (
                      <li key={category._id.toString()}>
                        <Link
                          href={`/products/${navbarCategory.slug}/${category.slug}`}
                          className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors duration-200"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}