import { create } from "zustand";

type MediaPortalAnimationStatus = "intro" | "exit";

type Values = {
  isMediaPortalOpen: boolean;
  mediaPortalAnimationStatus: MediaPortalAnimationStatus;
};

type Actions = {
  setIsMediaPortalOpen: (isMediaPortalOpen: boolean) => void;
  setMediaPortalAnimationStatus: (
    mediaPortalAnimationStatus: MediaPortalAnimationStatus
  ) => void;
};

type Store = Values & Actions;

const defaultValues: Values = {
  isMediaPortalOpen: false,
  mediaPortalAnimationStatus: "exit",
};

export const useMediaPortalStore = create<Store>((set) => ({
  ...defaultValues,
  setIsMediaPortalOpen: (isMediaPortalOpen: boolean) =>
    set({ isMediaPortalOpen }),
  setMediaPortalAnimationStatus: (
    mediaPortalAnimationStatus: MediaPortalAnimationStatus
  ) => set({ mediaPortalAnimationStatus }),
}));
