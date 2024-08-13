import { create } from "zustand";
import { ReactNode } from "@tanstack/react-router";

type GlobalComponentStoreValues = {
  isDialogOpen: boolean;
  dialogContent: ReactNode | null;
};

type GlobalComponentStoreActions = {
  toggleOpenDialog: (dialogContent: ReactNode) => void;
};

type GlobalComponentStore = GlobalComponentStoreValues &
  GlobalComponentStoreActions;

const globalComponentStoreDefaultValues: GlobalComponentStoreValues = {
  isDialogOpen: false,
  dialogContent: null,
};

export const useGlobalComponentStore = create<GlobalComponentStore>(
  (set, get) => ({
    ...globalComponentStoreDefaultValues,
    toggleOpenDialog: (dialogContent: ReactNode) => {
      if (get().isDialogOpen) {
        set({ isDialogOpen: false });
        setTimeout(() => set({ dialogContent: null }), 300);
      } else {
        set({ isDialogOpen: true, dialogContent });
      }
    },
  })
);
