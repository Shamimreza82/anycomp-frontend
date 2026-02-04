import nookies from "nookies";

import { jwtDecode } from "jwt-decode";
import api from "./axiosInstance";


interface DecodedToken {
  id: string;
  email: string;
  exp: number;
}


export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};


export const getUserFromCookie = (ctx?: any) => {
  const cookies = nookies.get(ctx);
  const token = cookies.token;
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
};