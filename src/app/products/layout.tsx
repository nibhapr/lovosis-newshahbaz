import Breadcrumbs from '../Components/products/Breadcrumbs';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs />
      <main className="max-w-7xl mx-auto px-4 py-8 text-gray-200">
        {children}
      </main>
    </div>
  );
}