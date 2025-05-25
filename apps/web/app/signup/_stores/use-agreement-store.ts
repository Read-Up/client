import { create } from "zustand";

type AgreementKey = "ALL" | "AGE" | "SERVICE" | "PRIVACY" | "MARKETING";

interface AgreementState {
  state: Record<AgreementKey, boolean>;
  toggle: (key: AgreementKey) => void;
  setAll: (value: boolean) => void;
  clear: () => void;
}

export const useAgreementStore = create<AgreementState>((set) => ({
  state: {
    ALL: false,
    AGE: false,
    SERVICE: false,
    PRIVACY: false,
    MARKETING: false,
  },
  toggle: (key) =>
    set((prev) => {
      const updated = {
        ...prev.state,
        [key]: !prev.state[key],
      };

      const allChecked = ["AGE", "SERVICE", "PRIVACY", "MARKETING"].every((k) => updated[k as AgreementKey]);

      return {
        state: {
          ...updated,
          ALL: allChecked,
        },
      };
    }),
  setAll: (value) =>
    set(() => ({
      state: {
        ALL: value,
        AGE: value,
        SERVICE: value,
        PRIVACY: value,
        MARKETING: value,
      },
    })),
  clear: () => {
    set(() => ({
      state: {
        ALL: false,
        AGE: false,
        SERVICE: false,
        PRIVACY: false,
        MARKETING: false,
      },
    }));
  },
}));
