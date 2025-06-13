import DashboardLayout from '@/app/Components/admin/DashboardLayout';
import CertificatesManager from '@/app/Components/admin/CertificatesManager';

export default function CertificatesPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Certificates Management</h1>
      <CertificatesManager />
    </DashboardLayout>
  );
} 