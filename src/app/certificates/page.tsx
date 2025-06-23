import { Metadata } from 'next';
import Gallery from '../Components/Gallery';

export const metadata: Metadata = {
  title: 'Certificates - Lovosis Technologies Pvt Ltd',
  description: 'Explore our certificates of products, events, and projects at Lovosis Technologies Pvt Ltd.',
  keywords: 'certificates, products, events, projects, Lovosis Technologies, company portfolio',
  openGraph: {
    title: 'Certificates - Lovosis Technologies Pvt Ltd',
    description: 'Explore our certificates of products, events, and projects at Lovosis Technologies Pvt Ltd.',
    type: 'website',
    url: 'https://lovosis.in/certificates',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GalleryPage() {
  return <Gallery />;
}