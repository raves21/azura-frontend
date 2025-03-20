import { create } from "zustand";
import { EntityPrivacy } from "../types/social/shared";

type ManageCollectionPage =
  | "manageCollectionDetails"
  | "manageCollecionPhoto"
  | "selectPrivacy";

type ManageCollectionStoreValues = {
  manageCollectionPage: ManageCollectionPage;
  collectionPhoto: string | null;
  collectionPreviewPosters: string[] | null;
  collectionName: string | null;
  collectionDescription: string | null;
  selectedPrivacy: EntityPrivacy;
};

type ManageCollectionStoreActions = {
  setManageCollectionPage: (manageCollectionPage: ManageCollectionPage) => void;
  setCollectionPhoto: (collectionPhoto: string | null) => void;
  setCollectionPreviewPosters: (collectionPreviewPosters: string[] | null) => void;
  setCollectionName: (collectionName: string | null) => void;
  setCollectionDescription: (collectionDescription: string | null) => void;
  setSelectedPrivacy: (selectedPrivacy: EntityPrivacy) => void;
  resetState: () => void
};

type ManageCollectionStore = ManageCollectionStoreValues &
  ManageCollectionStoreActions;

const defaultCreateCollectionPrivacyPreference = localStorage.getItem(
  "defaultCreateCollectionPrivacyPreference"
) as EntityPrivacy;

const manageCollectionStoreDefaultValues: ManageCollectionStoreValues = {
  manageCollectionPage: "manageCollectionDetails",
  collectionDescription: null,
  collectionName: "",
  collectionPhoto: null,
  collectionPreviewPosters: [],
  selectedPrivacy: defaultCreateCollectionPrivacyPreference || "PUBLIC",
};

export const useManageCollectionStore = create<ManageCollectionStore>(
  (set) => ({
    ...manageCollectionStoreDefaultValues,
    resetState: () => set({...manageCollectionStoreDefaultValues}),
    setManageCollectionPage: (manageCollectionPage: ManageCollectionPage) =>
      set({ manageCollectionPage }),
    setCollectionPhoto: (collectionPhoto: string | null) =>
      set({ collectionPhoto }),
    setCollectionPreviewPosters: (collectionPreviewPosters: string[] | null) => set({collectionPreviewPosters}),
    setCollectionName: (collectionName: string | null) => set({ collectionName }),
    setCollectionDescription: (collectionDescription: string | null) =>
      set({ collectionDescription }),
    setSelectedPrivacy: (selectedPrivacy: EntityPrivacy) =>
      set({ selectedPrivacy }),
  })
);
