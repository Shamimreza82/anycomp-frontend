'use client';

import { Service, useDashboardStore } from '@/store/dashboardStore';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Search, MoreVertical, Plus } from 'lucide-react';
import { CreateServiceSheet, EditServiceSheet } from './from/service-sheet';
import { useState } from 'react';

export function DashboardHeader() {
  const { activeMenu, searchTerm, setSearchTerm } = useDashboardStore();

  const [createSheetOpen, setCreateSheetOpen] = useState(false)
  const [editSheetOpen, setEditSheetOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  return (
    <div className="flex flex-col gap-4 pb-6 border-b border-border">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground capitalize">
            {activeMenu}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create and publish your services for Clients & Companies
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Export</DropdownMenuItem>
            <DropdownMenuItem>Import</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline">All</Button>
          <Button variant="outline">Drafts</Button>
          <Button variant="outline">Published</Button>
        </div>

        <CreateServiceSheet
          open={createSheetOpen}
          onOpenChange={setCreateSheetOpen}
          onSuccess={() => {
            // Optionally refresh the service list or show a success message
          }}
        />
        <Button onClick={() => setCreateSheetOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
        {/* <EditServiceSheet
          open={editSheetOpen}
          onOpenChange={(open) => {
            setEditSheetOpen(open)
            if (!open) setEditingService(null)
          }}
          service={editingService}
          onSuccess={}
        /> */}

        <Button className="bg-blue-600 text-white hover:bg-blue-700">Export</Button>
      </div>
    </div>
  );
}
