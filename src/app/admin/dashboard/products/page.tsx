"use client";

import DashboardLayout from '@/app/Components/admin/DashboardLayout';
import ProductManager from '@/app/Components/admin/ProductManager';

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <ProductManager />
    </DashboardLayout>
  );
} 