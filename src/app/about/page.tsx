import { Metadata } from 'next';  
import About from "../Components/about";

export const metadata: Metadata = {
  title: 'About Us - Lovosis Technologies Pvt. Ltd.',
  description: 'Learn more about Lovosis Technologies - A leading provider of educational equipment, testing instruments, and digital solutions.',
  keywords: 'about us, company profile, Lovosis Technologies, educational equipment, testing instruments, digital solutions, technology company',
  openGraph: {
    title: 'About Us - Lovosis Technologies Pvt. Ltd.',
    description: 'Learn more about Lovosis Technologies - A leading provider of educational equipment, testing instruments, and digital solutions.',
    type: 'website',
    url: 'https://lovosis.in/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Lovosis Technologies Pvt. Ltd.',
    description: 'Learn more about Lovosis Technologies - A leading provider of educational equipment, testing instruments, and digital solutions.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <About />
    </>
  );
}