"use client";

import DashboardLayout from '@/app/Components/admin/DashboardLayout';
import SubcategoryManager from '@/app/Components/admin/SubcategoryManager';

export default function SubcategoriesPage() {
  return (
    <div>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">Subcategories Management</h1>
        <SubcategoryManager />
      </DashboardLayout>
    </div>
  );
} 