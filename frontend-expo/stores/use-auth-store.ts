import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

interface AuthState {
  token: string | null | boolean;
  session: boolean;
  setToken: (token: string | null) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: false,
  session: false,

  setToken: (token) => set({ token, session: !!token }),

  checkAuth: async () => {
    const storedToken = await SecureStore.getItemAsync("userToken");
    set({ token: storedToken, session: !!storedToken });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("userToken");
    set({ token: null, session: false });
  },
}));
