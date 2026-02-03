'use client';

import { Sidebar } from '@/components/sidebar';
import { ServiceDetailView } from '@/components/service-detail-view';
import { ServicesTable } from '@/components/services-table';
import { EditServicePanel } from '@/components/edit-service-panel';
import { useDashboardStore } from '@/store/dashboardStore';

export default function Home() {
  const { activeMenu, editingServiceId } = useDashboardStore();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content */}
        <div className="flex-1 overflow-y-auto relative">
          <div className="p-8 pb-12">
            {activeMenu === 'specialists' ? (
              <ServicesTable />
            ) : (
              <ServiceDetailView />
            )}
          </div>
        </div>
      </div>

      {/* Edit Service Panel */}
      {editingServiceId && <EditServicePanel />}
    </div>
  );
}
