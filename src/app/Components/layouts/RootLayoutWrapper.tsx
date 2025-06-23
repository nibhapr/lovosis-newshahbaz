"use client";

import { usePathname } from 'next/navigation';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showNavbarFooter = !pathname.startsWith('/admin') && !pathname.startsWith('/auth');

  return (
    <>
      {showNavbarFooter && <Navbar />}
      {children}
      {showNavbarFooter && <Footer />}
    </>
  );
} 