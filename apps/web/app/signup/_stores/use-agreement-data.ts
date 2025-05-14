import { create } from "zustand";

export interface AgreementItem {
  key: "age" | "terms" | "privacy" | "marketing";
  label: string;
  required: boolean;
  detail?: string;
}

interface AgreementsDataState {
  items: AgreementItem[];
  setItems: (items: AgreementItem[]) => void;
  clear: () => void;
}

export const useAgreementsData = create<AgreementsDataState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  clear: () => set({ items: [] }),
}));
