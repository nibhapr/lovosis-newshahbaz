import ItServices from "../../Components/services/it-services/it-services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'IT Services | Lovosis Technologies Pvt. Ltd.',
  description: 'Professional IT services including software development, web solutions, and technical consulting. Expert IT solutions tailored for your business needs.',
  keywords: 'IT services, software development, web development, technical consulting, IT solutions',
  openGraph: {
    title: 'IT Services | Lovosis Technologies Pvt. Ltd.',
    description: 'Professional IT services including software development, web solutions, and technical consulting. Expert IT solutions tailored for your business needs.',
    type: 'website',
    url: 'https://lovosis.in/services/it-services',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ItServicesPage() {
  return (
    <>
      <ItServices />
    </>
  );
}