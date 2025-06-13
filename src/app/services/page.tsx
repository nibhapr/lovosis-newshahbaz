import Services from "../Components/services/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Our Services | Lovosis Technologies Pvt. Ltd.',
  description: 'Explore our comprehensive range of services designed to meet your needs. Professional solutions tailored for success.',
  keywords: 'services, professional services, business solutions',
  openGraph: {
    title: 'Our Services | Lovosis Technologies Pvt. Ltd.',
    description: 'Explore our comprehensive range of services designed to meet your needs. Professional solutions tailored for success.',
    type: 'website',
    url: 'https://lovosis.in/services',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <Services />
    </>
  );
}
