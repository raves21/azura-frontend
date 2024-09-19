import { create } from "zustand";
import { ReactNode } from "@tanstack/react-router";

type GlobalStoreValues = {
  isDialogOpen: boolean;
  dialogContent: ReactNode | null;
};

type GlobalStoreActions = {
  toggleOpenDialog: (dialogContent: ReactNode | null) => void;
};

type GlobalStore = GlobalStoreValues &
  GlobalStoreActions;

const globalStoreDefaultValues: GlobalStoreValues = {
  isDialogOpen: false,
  dialogContent: null,
};

export const useGlobalStore = create<GlobalStore>(
  (set) => ({
    ...globalStoreDefaultValues,
    toggleOpenDialog: (dialogContent: ReactNode | null) => {
      if (dialogContent) {
        set({
          dialogContent: dialogContent,
          isDialogOpen: true,
        });
      } else {
        set({ isDialogOpen: false });
        //need to give slight delay when setting dialog content to null
        //so that dialog closing animation does not skip frames
        setTimeout(() => {
          set({ dialogContent: null });
        }, 150);
      }
    },
  })
);
