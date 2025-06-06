import { create } from "zustand";
import { ReactNode } from "@tanstack/react-router";
import { SocialSearchOption } from "../types/social/shared";

type Values = {
  isDialogOpen: boolean;
  isDialogClickableOutside: boolean;
  isDialogSecondaryOpen: boolean;
  isSheetOpen: boolean;
  isDrawerOpen: boolean;
  dialogContent: ReactNode | null;
  dialogSecondaryContent: ReactNode | null;
  sheetContent: ReactNode | null;
  drawerContent: ReactNode | null;
  selectedSocialSearchOption: SocialSearchOption;
  socialSearchKeyword: string | undefined;
};

type Actions = {
  toggleOpenDialog: (dialogContent: ReactNode | null) => void;
  setIsDialogClickableOutside: (isDialogClickableOutside: boolean) => void;
  toggleOpenDialogSecondary: (dialogSecondaryContent: ReactNode | null) => void;
  toggleOpenSheet: (sheetContent: ReactNode | null) => void;
  toggleOpenDrawer: (drawerContent: ReactNode | null) => void;
  setSelectedSocialSearchOption: (
    selectedSocialSearchOption: SocialSearchOption
  ) => void;
  setSocialSearchKeyword: (socialSearchKeyword: string | undefined) => void;
};

type Store = Values & Actions;

const defaultValues: Values = {
  isDialogOpen: false,
  isDialogClickableOutside: true,
  isDialogSecondaryOpen: false,
  isSheetOpen: false,
  isDrawerOpen: false,
  dialogContent: null,
  dialogSecondaryContent: null,
  sheetContent: null,
  drawerContent: null,
  selectedSocialSearchOption: "People",
  socialSearchKeyword: undefined,
};

export const useGlobalStore = create<Store>((set) => ({
  ...defaultValues,
  setIsDialogClickableOutside: (isDialogClickableOutside: boolean) =>
    set({ isDialogClickableOutside }),
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
  toggleOpenDialogSecondary: (dialogSecondaryContent: ReactNode | null) => {
    if (dialogSecondaryContent) {
      set({
        dialogSecondaryContent,
        isDialogSecondaryOpen: true,
      });
    } else {
      set({ isDialogSecondaryOpen: false });
      //need to give slight delay when setting dialog content to null
      //so that dialog closing animation does not skip frames
      setTimeout(() => {
        set({ dialogSecondaryContent: null });
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
      }, 400);
    }
  },
  toggleOpenDrawer: (drawerContent: ReactNode | null) => {
    if (drawerContent) {
      set({
        drawerContent,
        isDrawerOpen: true,
      });
    } else {
      set({ isDrawerOpen: false });
      //need to give slight delay when setting sheet content to null
      //so that dialog closing animation does not skip frames
      setTimeout(() => {
        set({ drawerContent: null });
      }, 300);
    }
  },
  setSelectedSocialSearchOption: (
    selectedSocialSearchOption: SocialSearchOption
  ) => set({ selectedSocialSearchOption }),
  setSocialSearchKeyword: (socialSearchKeyword: string | undefined) =>
    set({ socialSearchKeyword }),
}));
