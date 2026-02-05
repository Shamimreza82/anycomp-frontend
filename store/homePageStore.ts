import { create } from 'zustand';
import api from '@/lib/axiosInstance';


export interface Specialist {
  id: string
  title: string
  description: string
  finalPrice: string
  durationDays: number
  verificationStatus: string
  user: {
    fullName: string
  }
}

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

       


 