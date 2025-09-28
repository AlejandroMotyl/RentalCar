import { create } from "zustand";
import type GetCarsQuery from "../types/CarsQuery";

interface filterStore {
  query: GetCarsQuery;
  setQuery: (query: GetCarsQuery) => void;
}

export const useFilterStore = create<filterStore>((set) => ({
  query: {},
  setQuery: (query) =>
    set(() => ({
      query,
    })),
}));
