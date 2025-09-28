import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
  favorites: string[];
  addFavorite: (fav: string) => void;
  removeFavorite: (fav: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (fav) => {
        if (!get().favorites.includes(fav)) {
          set((state) => ({ favorites: [...state.favorites, fav] }));
        }
      },

      removeFavorite: (fav) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f !== fav),
        })),
    }),
    {
      name: "favorites-storage",
    }
  )
);
