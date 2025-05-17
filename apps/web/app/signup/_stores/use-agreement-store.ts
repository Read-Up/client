import { create } from "zustand";

type AgreementKey = "ALL" | "AGE" | "SERVICE" | "PRIVACY" | "MARKETING";

interface AgreementState {
  agreements: Record<AgreementKey, boolean>;
  toggle: (key: AgreementKey) => void;
  setAll: (value: boolean) => void;
  clear: () => void;
}

export const useAgreementStore = create<AgreementState>((set) => ({
  agreements: {
    ALL: false,
    AGE: false,
    SERVICE: false,
    PRIVACY: false,
    MARKETING: false,
  },
  toggle: (key) =>
    set((state) => {
      const updated = {
        ...state.agreements,
        [key]: !state.agreements[key],
      };

      const allChecked = ["AGE", "SERVICE", "PRIVACY", "MARKETING"].every((k) => updated[k as AgreementKey]);

      return {
        agreements: {
          ...updated,
          ALL: allChecked,
        },
      };
    }),
  setAll: (value) =>
    set(() => ({
      agreements: {
        ALL: value,
        AGE: value,
        SERVICE: value,
        PRIVACY: value,
        MARKETING: value,
      },
    })),
  clear: () => {
    set(() => ({
      agreements: {
        ALL: false,
        AGE: false,
        SERVICE: false,
        PRIVACY: false,
        MARKETING: false,
      },
    }));
  },
}));
