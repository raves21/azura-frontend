import { create } from "zustand";
import { ReactNode } from "@tanstack/react-router";

type GlobalStoreValues = {
  isDialogOpen: boolean;
  dialogContent: ReactNode | null;
  isSheetOpen: boolean;
  sheetContent: ReactNode | null;
};

type GlobalStoreActions = {
  toggleOpenDialog: (dialogContent: ReactNode | null) => void;
  toggleOpenSheet: (sheetContent: ReactNode | null) => void;
};

type GlobalStore = GlobalStoreValues & GlobalStoreActions;

const globalStoreDefaultValues: GlobalStoreValues = {
  isDialogOpen: false,
  dialogContent: null,
  isSheetOpen: false,
  sheetContent: null,
};

export const useGlobalStore = create<GlobalStore>((set) => ({
  ...globalStoreDefaultValues,
  toggleOpenDialog: (dialogContent: ReactNode | null) => {
    if (dialogContent) {
      set({
        dialogContent,
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
  toggleOpenSheet: (sheetContent: ReactNode | null) => {
    if (sheetContent) {
      set({
        sheetContent,
        isSheetOpen: true,
      });
    } else {
      set({ isSheetOpen: false });
      //need to give slight delay when setting sheet content to null
      //so that dialog closing animation does not skip frames
      setTimeout(() => {
        set({ sheetContent: null });
      }, 300);
    }
  },
}));
