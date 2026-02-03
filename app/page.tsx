'use client';

import { Sidebar } from '@/components/sidebar';
import { ServiceDetailView } from '@/components/service-detail-view';
import { ServicesTable } from '@/components/services-table';
import { EditServicePanel } from '@/components/edit-service-panel';
import { useDashboardStore } from '@/store/dashboardStore';
import { LoginForm } from '@/components/other/loginFrom';

export default function Home() {
  const { activeMenu, editingServiceId } = useDashboardStore();

  return (
    <div className="flex h-screen justify-center items-center bg-background overflow-hidden">
      <LoginForm/>
    </div>
  );
}
