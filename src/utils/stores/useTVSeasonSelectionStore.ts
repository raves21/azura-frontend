import { create } from "zustand";

type TVSeasonSelectionStore = {
  selectedSeason: number | null;
  setSelectedSeason: (selectedSeason: number | null) => void;
};

export const useTVSeasonSelectionStore = create<TVSeasonSelectionStore>(
  (set) => ({
    selectedSeason: null,
    setSelectedSeason: (selectedSeason: number | null) =>
      set({ selectedSeason })
  })
);
