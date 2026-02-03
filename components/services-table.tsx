'use client';

import { useDashboardStore } from '@/store/dashboardStore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { MoreVertical, Edit, Trash2, ChevronLeft, ChevronRight, Search, Plus, Download } from 'lucide-react';

export function ServicesTable() {
  const {
    services,
    currentPage,
    pageSize,
    setCurrentPage,
    deleteService,
    searchTerm,
    setSearchTerm,
    viewFilter,
    setViewFilter,
    setEditingServiceId
  } = useDashboardStore();

  // Filter services based on view filter
  const filteredServices = services.filter((service) => {
    if (viewFilter === 'drafts') return service.publishStatus === 'draft';
    if (viewFilter === 'published') return service.publishStatus === 'published';
    return true;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedServices = filteredServices.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredServices.length / pageSize);

  const getStatusColor = (
    status: 'approved' | 'pending' | 'rejected'
  ): 'default' | 'secondary' | 'outline' => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getPublishColor = (
    status: 'published' | 'draft' | 'archived'
  ): 'default' | 'secondary' | 'outline' => {
    switch (status) {
      case 'published':
        return 'default';
      case 'draft':
        return 'secondary';
      case 'archived':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground text-sm mt-1">Create and publish your services for Clients & Companies</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-border">
          <button
            onClick={() => setViewFilter('all')}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${
              viewFilter === 'all'
                ? 'text-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setViewFilter('drafts')}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${
              viewFilter === 'drafts'
                ? 'text-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Drafts
          </button>
          <button
            onClick={() => setViewFilter('published')}
            className={`pb-3 px-1 text-sm font-medium transition-colors ${
              viewFilter === 'published'
                ? 'text-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Published
          </button>
        </div>
      </div>

      {/* Actions & Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Services"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted border-0"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Create
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="border-border hover:bg-muted">
              <TableHead className="w-12">
                <input type="checkbox" className="h-4 w-4" />
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                SERVICE
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                PRICE
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                PURCHASES
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                DURATION
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                APPROVAL STATUS
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                PUBLISH STATUS
              </TableHead>
              <TableHead className="w-12">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedServices.map((service) => (
              <TableRow key={service.id} className="border-border hover:bg-accent/5">
                <TableCell>
                  <input type="checkbox" className="h-4 w-4" />
                </TableCell>
                <TableCell className="font-medium text-sm">{service.name}</TableCell>
                <TableCell className="text-sm font-medium">
                  RM {service.price.toLocaleString()}
                </TableCell>
                <TableCell className="text-sm">{service.purchases}</TableCell>
                <TableCell className="text-sm">{service.duration}</TableCell>
                <TableCell>
                  <Badge
                    variant={getStatusColor(service.approvalStatus)}
                    className="capitalize"
                  >
                    {service.approvalStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getPublishColor(service.publishStatus)}
                    className="capitalize"
                  >
                    {service.publishStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        className="gap-2 cursor-pointer"
                        onClick={() => setEditingServiceId(service.id)}
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-2 cursor-pointer text-destructive hover:text-destructive"
                        onClick={() => deleteService(service.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(endIndex, services.length)} of{' '}
          {services.length} services
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
