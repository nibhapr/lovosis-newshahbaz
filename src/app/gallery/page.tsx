import { Metadata } from 'next';
import Gallery from '../Components/Gallery';

export const metadata: Metadata = {
  title: 'Gallery - Lovosis Technologies Pvt Ltd',
  description: 'Explore our gallery of products, events, and projects at Lovosis Technologies Pvt Ltd.',
  keywords: 'gallery, products, events, projects, Lovosis Technologies, company portfolio',
  openGraph: {
    title: 'Gallery - Lovosis Technologies Pvt Ltd',
    description: 'Explore our gallery of products, events, and projects at Lovosis Technologies Pvt Ltd.',
    type: 'website',
    url: 'https://lovosis.in/gallery',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GalleryPage() {
  return <Gallery />;
}