import Contact from "../Components/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contact Us | Lovosis Technologies Pvt. Ltd.',
  description: 'Get in touch with Lovosis Technologies. Contact us for inquiries, support, or business opportunities. We are here to help.',
  keywords: 'contact, get in touch, support, business inquiries, location, contact form',
  openGraph: {
    title: 'Contact Us | Lovosis Technologies Pvt. Ltd.',
    description: 'Get in touch with Lovosis Technologies. Contact us for inquiries, support, or business opportunities. We are here to help.',
    type: 'website',
    url: 'https://lovosis.in/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <>
      <Contact />
    </>
  );
}

