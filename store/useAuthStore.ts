/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import api from "@/lib/axiosInstance";
import { toast } from "sonner";




interface User {
    id: string;
    name: string;
    email: string;

}



interface AuthState {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;

    fetchUser: () => Promise<void>;
    login: (email: string, password: string) => Promise<any>;
    signup: (fullName: string, email: string, password: string) => Promise<any>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => (
    {
        user: null,
        loading: true,
        isAuthenticated: false,

        // 🔹 Check logged-in user (on app load)
        fetchUser: async () => {
            try {
                const res = await api.get("/auth/user/me", {
                    withCredentials: true,
                });

                console.log("Store Responce",res)

                set({
                    user: res.data.data,
                    isAuthenticated: true,
                });
            } catch (error) {
                set({
                    user: null,
                    isAuthenticated: false,
                });
            } finally {
                set({ loading: false });
            }
        },



        // 🔹 Login
        login: async (email, password) => {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            // Optional: fetch user after login
            await get().fetchUser();

            return res.data;
        },



        // 🔹 Signup
        signup: async (fullName, email, password) => {
            try {
                const res = await api.post(
                    "/auth/register",
                    { fullName, email, password },
                    { withCredentials: true }
                );

                // Optional: auto-login after signup
                await get().fetchUser();

                return res.data;
            } catch (error: any) {
                toast.error(error.response?.data?.message || "Signup failed");
            }
        },


        // 🔹 Logout
        logout: async () => {
            await api.post("/auth/logout", {}, { withCredentials: true });

            set({
                user: null,
                isAuthenticated: false,
            });
        },


    }

));
