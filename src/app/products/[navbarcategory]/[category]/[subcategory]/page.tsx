import { connectDB } from '@/lib/db';
import Subcategory from '@/app/models/Subcategory';
import Product from '@/app/models/Product';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

async function getSubcategory(slug: string) {
  await connectDB();
  return await Subcategory.findOne({ slug });
}

async function getProducts(subcategoryId: string) {
  await connectDB();
  return await Product.find({ subcategoryId }).sort({ name: 1 }).lean();
}

export const revalidate = 0; // Enable real-time revalidation

export async function generateMetadata({
  params
}: {
  params: { navbarcategory: string; category: string; subcategory: string }
}): Promise<Metadata> {
  const subcategory = await getSubcategory(params.subcategory);

  if (!subcategory) {
    return {
      title: 'Subcategory Not Found | Lovosis Technology Pvt Ltd',
      description: 'The requested subcategory could not be found.'
    };
  }

  return {
    title: `${subcategory.name} | Lovosis Technology Pvt Ltd`,
    description: subcategory.description || `Explore our collection of ${subcategory.name} products`,
    openGraph: {
      title: `${subcategory.name} | Lovosis Technology Pvt Ltd`,
      description: subcategory.description || `Explore our collection of ${subcategory.name} products`,
      type: 'website',
      url: `/products/${params.navbarcategory}/${params.category}/${params.subcategory}`,
    }
  };
}

export default async function SubcategoryPage({
  params
}: {
  params: { navbarcategory: string; category: string; subcategory: string }
}) {
  const subcategory = await getSubcategory(params.subcategory);
  console.log('Subcategory:', subcategory); // Add this
  const products = subcategory ? await getProducts(subcategory._id) : [];
  console.log('Products:', products); // Add this

  if (!subcategory) {
    return <div>Subcategory not found</div>;
  }

  // Add JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: subcategory.name,
    description: subcategory.description,
    url: `/products/${params.navbarcategory}/${params.category}/${params.subcategory}`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images[0],
        url: `/products/${params.navbarcategory}/${params.category}/${params.subcategory}/${product.slug}`
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 py-12 bg-white">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold mb-6 text-black">
            Explore{" "}
            <span className="text-blue-600">
              {subcategory.name}
            </span>
            <span className="text-lg font-semibold text-gray-600 ml-2">
              ({products.length} products)
            </span>
          </h1>
          <p className="text-black max-w-2xl mx-auto">
            <span className="text-lg font-medium text-blue-600">
              {subcategory.description}
            </span>
            <br />
            <span className="text-base mt-4 block text-gray-600">
              Discover our premium selection of products crafted just for you.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={String(product._id)}
              href={`/products/${params.navbarcategory}/${params.category}/${params.subcategory}/${product.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200">
                <div className="relative h-56 w-full">                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  quality={100}
                  className="object-contain group-hover:opacity-90 transition-opacity duration-300"
                  style={{ objectFit: 'contain' }}
                />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-black group-hover:text-blue-600 transition-colors duration-300">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mt-3">
                    {product.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}