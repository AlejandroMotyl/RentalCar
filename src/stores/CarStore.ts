import { create } from "zustand";
import type Car from "../types/Car";

interface CarStore {
  cars: Car[];
  setCars: (updater: Car[] | ((prev: Car[]) => Car[])) => void;

  fetchedPages: number[];
  setFetchedPages: (updater: number[] | ((prev: number[]) => number[])) => void;

  totalPages: number;
  setTotalPages: (totalPages: number) => void;
}

export const useCarStore = create<CarStore>((set) => ({
  cars: [],
  setCars: (updater) =>
    set((state) => ({
      cars: typeof updater === "function" ? updater(state.cars) : updater,
    })),

  fetchedPages: [],
  setFetchedPages: (updater) =>
    set((state) => ({
      fetchedPages:
        typeof updater === "function" ? updater(state.fetchedPages) : updater,
    })),

  totalPages: 0,
  setTotalPages: (totalPages) =>
    set(() => ({
      totalPages,
    })),
}));
