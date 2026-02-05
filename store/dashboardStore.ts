import { create } from 'zustand';
import api from '@/lib/axiosInstance';

export interface Media {
  id: string;
  url: string;
  type?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  basePrice: string;      // API returns string
  finalPrice: string;     // API returns string
  durationDays: number;
  isDraft: boolean;
  isVerified: boolean;
  verificationStatus: string;
  platformFee: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
  totalNumberOfRatings: number;
  averageRating: number | null;
  media: Media[];
}

export interface DashboardState {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;

  services: Service[];
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  setServices: (services: Service[]) => void;

  currentPage: number;
  pageSize: number;
  totalServices: number;
  setCurrentPage: (page: number) => void;

  searchTerm: string;
  setSearchTerm: (term: string) => void;

  editingServiceId: string | null;
  setEditingServiceId: (id: string | null) => void;

  viewFilter: 'all' | 'drafts' | 'published';
  setViewFilter: (filter: 'all' | 'drafts' | 'published') => void;

  singleSpecialist: Service | null;

  fetchServices: () => Promise<void>;
    setSpecialistd: (id: string) => void;
    updateServiceStatus: (id: string) => void;
    updateServiceStatusUnpublish: (id: string) => void;

}







export const useDashboardStore = create<DashboardState>((set, get) => ({
  activeMenu: 'Specialists',
  setActiveMenu: (menu) => set({ activeMenu: menu }),
  services: [],
  totalServices: 0,
  singleSpecialist: null,
  addService: (service) => set((state) => ({ services: [...state.services, service] })),
  updateService: (id, updates) =>
    set((state) => ({
      services: state.services.map((s) => (s.id === id ? { ...s, ...updates } : s))
    })),
  deleteService: async (id) => {
    try {
      await api.delete(`/specialist/${id}`);
      get().fetchServices();
    } catch (err) { 
      console.error('Delete failed', err);
    }
  },
   updateServiceStatus: async (id: string) => {
    try {

      console.log(id)
      await api.patch(`/specialist/${id}/status`);
      get().fetchServices();
    } catch (err) {
      console.error('Update status failed', err);
    }
  },
  updateServiceStatusUnpublish: async (id: string) => {
    try {

      console.log(id)
      await api.patch(`/specialist/${id}/unpublish`);
      get().fetchServices();
    } catch (err) {
      console.error('Update status failed', err);
    }
  },
  setServices: (services) => set({ services }),

  currentPage: 1,
  pageSize: 10,
  setCurrentPage: (page) => set({ currentPage: page }),

  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),

  editingServiceId: null,
  setEditingServiceId: async (id, ) => {
    try {
      console.log( "Check id",id)
    const res = await api.patch(`/specialist/${id}`);

    console.log(res)
      get().fetchServices();
    } catch (err) {
      console.error('Edit fail', err);
    }
  },
   setSpecialistd: async (id: string) => {
    try {

      console.log(id)
    const res = await api.get(`/specialist/${id}/single`);

    console.log("Single specialist data",res.data) 
    set({ singleSpecialist: res.data.data }); 
      get().fetchServices();
    } catch (err) {
      console.error('Edit fail', err);
    }
  },



  viewFilter: 'all',
  setViewFilter: (filter) => set({ viewFilter: filter }),



  fetchServices: async () => {
    try {
      const { currentPage, pageSize, searchTerm } = get();
      const res = await api.get('/specialist', {
        params: {
          page: currentPage,
          limit: pageSize,
          searchTerm
        }
      });

      set({
        services: res.data.data.data,
        totalServices: res?.data?.data.meta?.total || 0
      });
    } catch (err) {
      console.error('Failed to fetch services', err);
    }
  }
}));



