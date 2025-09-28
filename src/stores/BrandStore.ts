import { create } from "zustand";

interface BrandStore {
  brandsList: string[];
  setBrandsList: (brandsList: string[]) => void;
}

export const useBrandStore = create<BrandStore>((set) => ({
  brandsList: [],
  setBrandsList: (brandsList) =>
    set(() => ({
      brandsList,
    })),
}));
