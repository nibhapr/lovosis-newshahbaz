import { Metadata } from 'next';
import { connectDB } from '@/lib/db';
import Product from '@/app/models/Product';

async function getProduct(slug: string): Promise<any | null> {
  await connectDB();
  return await Product.findOne({ slug }).lean();
}

export async function generateMetadata({ params }: { 
  params: { product: string } 
}): Promise<Metadata> {
  const product = await getProduct(params.product);

  if (!product || Array.isArray(product)) {
    return {
      title: 'Product Not Found | Lovosis Technology Pvt Ltd',
      description: 'The requested product could not be found.'
    };
  }

  return {
    title: `${product.name} | Lovosis Technology Pvt Ltd`,
    description: product.description || `View details about ${product.name}`,
    openGraph: {
      title: `${product.name} | Lovosis Technology Pvt Ltd`,
      description: product.description || `View details about ${product.name}`,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
