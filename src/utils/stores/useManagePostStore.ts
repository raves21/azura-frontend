import { create } from "zustand";
import { EntityPrivacy } from "../types/social/shared";
import { Media, TCollection } from "../types/social/social";

type ManagePostPage =
  | "managePost"
  | "selectPrivacy"
  | "selectMediaAttachment"
  | "selectCollectionAttachment";

type ManagePostStoreValues = {
  managePostPage: ManagePostPage;
  selectedPrivacy: EntityPrivacy;
  mediaAttachment: Media | null;
  collectionAttachment: TCollection | null;
};

type ManagePostStoreActions = {
  setManagePostPage: (managePostPage: ManagePostPage) => void;
  setSelectedPrivacy: (selectedPrivacy: EntityPrivacy) => void;
  setMediaAttachment: (mediaAttachment: Media | null) => void;
  setCollectionAttachment: (collectionAttachment: TCollection | null) => void;
  resetState: () => void;
};

type ManagePostStore = ManagePostStoreValues & ManagePostStoreActions;

const defaultCreatePostPrivacyPreference = localStorage.getItem(
  "defaultCreatePostPrivacyPreference"
) as EntityPrivacy;
const managePostStoreDefaultValues: ManagePostStoreValues = {
  managePostPage: "managePost",
  selectedPrivacy: defaultCreatePostPrivacyPreference || "PUBLIC",
  mediaAttachment: null,
  collectionAttachment: null,
};

export const useManagePostStore = create<ManagePostStore>((set) => ({
  ...managePostStoreDefaultValues,
  setManagePostPage: (managePostPage: ManagePostPage) =>
    set({ managePostPage }),
  setSelectedPrivacy: (selectedPrivacy: EntityPrivacy) =>
    set({ selectedPrivacy }),
  setMediaAttachment: (mediaAttachment: Media | null) =>
    set({ mediaAttachment }),
  setCollectionAttachment: (collectionAttachment: TCollection | null) =>
    set({ collectionAttachment }),
  resetState: () => set({ ...managePostStoreDefaultValues }),
}));
