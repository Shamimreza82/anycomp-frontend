import { create } from 'zustand';
import api from '@/lib/axiosInstance';


export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface Media {
  url: string;
  title: string;
}

export interface Specialist {
  id: string;
  title: string;
  slug: string;
  description: string;
  averageRating: number | null;
  isDraft: boolean;
  totalNumberOfRatings: number;
  basePrice: string;
  platformFee: string;
  finalPrice: string;
  verificationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  isVerified: boolean;
  durationDays: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null;
  userId: string;
  user: User;
  media: Media[];
}

export type ApiResponse = Specialist[];

interface HomePageState {
  allSpecialist: Specialist[]
  getAllSpecialist: () => Promise<void>
}




export const usehomePageStore = create<HomePageState>((set, get) => ({
   allSpecialist: [],
    getAllSpecialist: async () => {
        try {
            const res = await api.get('/specialist/approved');

            console.log("All approved data",res.data.data)
            set({ allSpecialist: res.data.data });
        } catch (err) {
            console.error('Failed to fetch services', err);
        }
    }
}));;  

       


 