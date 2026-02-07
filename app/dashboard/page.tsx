"use client"

// import { EditServicePanel } from '@/components/edit-service-panel'
import { ServicesTable } from '@/components/services-table'
import { Sidebar } from '@/components/sidebar'
import { useDashboardStore } from '@/store/dashboardStore'


const DashboardHome = () => {

const { activeMenu} = useDashboardStore();


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
              <ServicesTable />
            )}
          </div>
        </div>
      </div>

      {/* Edit Service Panel */}
      {/* {editingServiceId && <EditServicePanel />} */}
    </div>
  )
}

export default DashboardHome