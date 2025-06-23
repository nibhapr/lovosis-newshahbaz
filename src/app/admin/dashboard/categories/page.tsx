"use client";

import DashboardLayout from '@/app/Components/admin/DashboardLayout';
import CategoryManager from '@/app/Components/admin/CategoryManager';

export default function CategoriesPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Categories Management</h1>
      <CategoryManager />
    </DashboardLayout>
  );
} 