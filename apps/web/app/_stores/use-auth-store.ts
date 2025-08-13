import { create } from "zustand";

type AuthState = {
  user: MemberDTO["member"] | null;
  setUser: (u: MemberDTO["member"] | null) => void;
  isLoggedIn: boolean;
  lastCheckedAt: number | null;
  setLastCheckedAt: (t: number) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  lastCheckedAt: null,
  setUser: (u) => set({ user: u, isLoggedIn: !!u }),
  setLastCheckedAt: (t) => set({ lastCheckedAt: t }),
  clearAuth: () => {
    console.log("[useAuthStore] Clearing auth state");
    set({ user: null, isLoggedIn: false });
  },
}));
