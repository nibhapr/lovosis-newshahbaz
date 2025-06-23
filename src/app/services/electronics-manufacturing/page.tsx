import ElectronicsManufacturing from "../../Components/services/electronics-manufacturing/electronics-manufacturing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Electronics Manufacturing Services | Lovosis Technologies Pvt. Ltd.',
  description: 'Professional electronics manufacturing services including PCB assembly, component manufacturing, and quality testing. Expert manufacturing solutions for your electronic products.',
  keywords: 'electronics manufacturing, PCB assembly, electronic components, manufacturing services, quality testing',
  openGraph: {
    title: 'Electronics Manufacturing Services | Lovosis Technologies Pvt. Ltd.',
    description: 'Professional electronics manufacturing services including PCB assembly, component manufacturing, and quality testing. Expert manufacturing solutions for your electronic products.',
    type: 'website',
    url: 'https://lovosis.in/services/electronics-manufacturing',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ElectronicsManufacturingPage() {
  return (
    <>
      <ElectronicsManufacturing />
    </>
  );
}