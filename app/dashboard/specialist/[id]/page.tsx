import { ServiceDetailView } from '@/components/service-detail-view'
import { Sidebar } from '@/components/sidebar'
import React from 'react'

const SpecialistDetail = async ({params,}: {params: Promise<{ id: string }>}) => {
const { id } = await params

  return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Content */}
            <div className="flex-1 overflow-y-auto relative">
              <div className="p-8 pb-12">
               <ServiceDetailView serviceId={id} />
              </div>
            </div>
          </div>
    
        </div>
  )
}

export default SpecialistDetail