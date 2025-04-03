import { create } from "zustand";

type AgreementKey = "all" | "age" | "terms" | "privacy" | "marketing";

interface AgreementState {
  agreements: Record<AgreementKey, boolean>;
  toggle: (key: AgreementKey) => void;
  setAll: (value: boolean) => void;
  clear: () => void;
}

export const useAgreementStore = create<AgreementState>((set) => ({
  agreements: {
    all: false,
    age: false,
    terms: false,
    privacy: false,
    marketing: false,
  },
  toggle: (key) =>
    set((state) => {
      const updated = {
        ...state.agreements,
        [key]: !state.agreements[key],
      };

      const allChecked = ["age", "terms", "privacy", "marketing"].every((k) => updated[k as AgreementKey]);

      return {
        agreements: {
          ...updated,
          all: allChecked,
        },
      };
    }),
  setAll: (value) =>
    set(() => ({
      agreements: {
        all: value,
        age: value,
        terms: value,
        privacy: value,
        marketing: value,
      },
    })),
  clear: () => {
    set(() => ({
      agreements: {
        all: false,
        age: false,
        terms: false,
        privacy: false,
        marketing: false,
      },
    }));
  },
}));
