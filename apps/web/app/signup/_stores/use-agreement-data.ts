import { create } from "zustand";

export type AgreementKey = "AGE" | "SERVICE" | "PRIVACY" | "MARKETING";

export interface AgreementItem {
  code: AgreementKey;
  termsVersionId: number;
  title: string;
  content: string;
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
