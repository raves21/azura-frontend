import { create } from "zustand";
import { EntityPrivacy } from "../types/social/shared";

type ManageCollectionPage =
  | "manageCollectionDetails"
  | "manageCollecionPhoto"
  | "selectPrivacy";

type ManageCollectionStoreValues = {
  manageCollectionPage: ManageCollectionPage;
  collectionPhoto: string | null;
  collectionName: string;
  collectionDescription: string | null;
  selectedPrivacy: EntityPrivacy;
};

type ManageCollectionStoreActions = {
  setManageCollectionPage: (manageCollectionPage: ManageCollectionPage) => void;
  setCollectionPhoto: (collectionPhoto: string | null) => void;
  setCollectionName: (collectionName: string) => void;
  setCollectionDescription: (collectionDescription: string | null) => void;
  setSelectedPrivacy: (selectedPrivacy: EntityPrivacy) => void;
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
  selectedPrivacy: defaultCreateCollectionPrivacyPreference || "PUBLIC",
};

export const useManageCollectionStore = create<ManageCollectionStore>(
  (set) => ({
    ...manageCollectionStoreDefaultValues,
    setManageCollectionPage: (manageCollectionPage: ManageCollectionPage) =>
      set({ manageCollectionPage }),
    setCollectionPhoto: (collectionPhoto: string | null) =>
      set({ collectionPhoto }),
    setCollectionName: (collectionName: string) => set({ collectionName }),
    setCollectionDescription: (collectionDescription: string | null) =>
      set({ collectionDescription }),
    setSelectedPrivacy: (selectedPrivacy: EntityPrivacy) =>
      set({ selectedPrivacy }),
  })
);
