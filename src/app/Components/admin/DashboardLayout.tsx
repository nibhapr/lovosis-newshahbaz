"use client";

import { useState } from 'react';
import Sidebar from './Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <div className="fixed inset-y-0">
        <Sidebar isCollapsed={isCollapsed} onCollapse={setIsCollapsed} />
      </div>
      <main className={`flex-1 ${isCollapsed ? 'ml-20' : 'ml-64'} p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900`}>
        {children}
      </main>
    </div>
  );
}