import { create } from "zustand";
import { EntityPrivacy } from "../types/social/shared";

type ManagePostPage =
  | "managePost"
  | "selectPrivacy"
  | "selectMediaAttachment"
  | "selectCollectionAttachment";

type ManagePostStoreValues = {
  managePostPage: ManagePostPage;
  selectedPrivacy: EntityPrivacy;
};

type ManagePostStoreActions = {
  setManagePostPage: (managePostPage: ManagePostPage) => void;
  setSelectedPrivacy: (selectedPrivacy: EntityPrivacy) => void;
};

type ManagePostStore = ManagePostStoreValues & ManagePostStoreActions;

const defaultCreatePostPrivacyPreference = localStorage.getItem(
  "defaultCreatePostPrivacyPreference"
) as EntityPrivacy;
const managePostStoreDefaultValues: ManagePostStoreValues = {
  managePostPage: "managePost",
  selectedPrivacy: defaultCreatePostPrivacyPreference || "PUBLIC",
};

export const useManagePostStore = create<ManagePostStore>((set) => ({
  ...managePostStoreDefaultValues,
  setManagePostPage: (managePostPage: ManagePostPage) =>
    set({ managePostPage }),
  setSelectedPrivacy: (selectedPrivacy: EntityPrivacy) =>
    set({ selectedPrivacy }),
}));
