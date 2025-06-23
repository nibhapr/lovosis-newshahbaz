"use client";

import DashboardLayout from '@/app/Components/admin/DashboardLayout';
import NavbarCategoryManager from '@/app/Components/admin/NavbarCategoryManager';

export default function NavbarCategoriesPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Navbar Categories Management</h1>
      <NavbarCategoryManager />
    </DashboardLayout>
  );
} 