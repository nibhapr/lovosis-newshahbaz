import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Lovosis Technologies Pvt. Ltd.',
  description: 'Learn about how Lovosis uses cookies to enhance your browsing experience. Our cookie policy explains the types of cookies we use and how you can manage them.',
  keywords: 'cookie policy, cookies, privacy, website cookies, Lovosis, digital marketing',
  openGraph: {
    title: 'Cookie Policy | Lovosis',
    description: 'Understanding how we use cookies to improve your experience',
    url: 'https://lovosis.in/cookie-policy',
    siteName: 'Lovosis',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://lovosis.in/cookie-policy'
  }
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
