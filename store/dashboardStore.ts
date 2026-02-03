import { create } from 'zustand';

export interface Service {
  id: string;
  name: string;
  price: number;
  purchases: number;
  duration: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  publishStatus: 'published' | 'draft' | 'archived';
  description?: string;
  image?: string;
}

export interface DashboardState {
  // Navigation
  activeMenu: string;
  setActiveMenu: (menu: string) => void;

  // Services
  services: Service[];
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  setServices: (services: Service[]) => void;

  // Pagination
  currentPage: number;
  pageSize: number;
  setCurrentPage: (page: number) => void;

  // Search/Filter
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  // Edit Panel
  editingServiceId: string | null;
  setEditingServiceId: (id: string | null) => void;

  // View Filter
  viewFilter: 'all' | 'drafts' | 'published';
  setViewFilter: (filter: 'all' | 'drafts' | 'published') => void;
}

const initialServices: Service[] = [
  {
    id: '1',
    name: 'Incorporation of a new company',
    price: 2000,
    purchases: 20,
    duration: '3 Days',
    approvalStatus: 'approved',
    publishStatus: 'published',
    description: 'Complete company incorporation with all legal documentation'
  },
  {
    id: '2',
    name: 'Incorporation of a new company',
    price: 2000,
    purchases: 0,
    duration: '1 Day',
    approvalStatus: 'pending',
    publishStatus: 'draft',
    description: 'Expedited incorporation service'
  },
  {
    id: '3',
    name: 'Incorporation of a new company',
    price: 2000,
    purchases: 431,
    duration: '14 Days',
    approvalStatus: 'approved',
    publishStatus: 'published',
    description: 'Standard incorporation with full support'
  },
  {
    id: '4',
    name: 'Incorporation of a new company',
    price: 2000,
    purchases: 0,
    duration: '7 Days',
    approvalStatus: 'approved',
    publishStatus: 'draft',
    description: 'Standard incorporation with documentation'
  },
  {
    id: '5',
    name: 'Incorporation of a new company',
    price: 2000,
    purchases: 1283,
    duration: '4 Days',
    approvalStatus: 'approved',
    publishStatus: 'published',
    description: 'Full incorporation with consultation'
  },
  {
    id: '6',
    name: 'Incorporation of a new company',
    price: 2000,
    purchases: 5180,
    duration: '5 Days',
    approvalStatus: 'rejected',
    publishStatus: 'archived',
    description: 'Premium incorporation service'
  }
];

export const useDashboardStore = create<DashboardState>((set) => ({
  // Navigation
  activeMenu: 'Specialists',
  setActiveMenu: (menu) => set({ activeMenu: menu }),

  // Services
  services: initialServices,
  addService: (service) =>
    set((state) => ({
      services: [...state.services, service]
    })),
  updateService: (id, updates) =>
    set((state) => ({
      services: state.services.map((service) =>
        service.id === id ? { ...service, ...updates } : service
      )
    })),
  deleteService: (id) =>
    set((state) => ({
      services: state.services.filter((service) => service.id !== id)
    })),
  setServices: (services) => set({ services }),

  // Pagination
  currentPage: 1,
  pageSize: 5,
  setCurrentPage: (page) => set({ currentPage: page }),

  // Search
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),

  // Edit Panel
  editingServiceId: null,
  setEditingServiceId: (id) => set({ editingServiceId: id }),

  // View Filter
  viewFilter: 'all',
  setViewFilter: (filter) => set({ viewFilter: filter })
}));
