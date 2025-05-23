import { create } from "zustand";
import { EntityPrivacy } from "../types/social/shared";
import { Media, TCollection } from "../types/social/social";

type ManagePostPage =
  | "managePost"
  | "selectPrivacy"
  | "selectMediaAttachment"
  | "selectCollectionAttachment";

type Values = {
  managePostPage: ManagePostPage;
  selectedPrivacy: EntityPrivacy;
  mediaAttachment: Media | null;
  content: string | null;
  collectionAttachment: TCollection | null;
};

type Actions = {
  setManagePostPage: (managePostPage: ManagePostPage) => void;
  setSelectedPrivacy: (selectedPrivacy: EntityPrivacy) => void;
  setContent: (content: string | null) => void;
  setMediaAttachment: (mediaAttachment: Media | null) => void;
  setCollectionAttachment: (collectionAttachment: TCollection | null) => void;
  resetState: () => void;
};

type Store = Values & Actions;

const defaultCreatePostPrivacyPreference = localStorage.getItem(
  "defaultCreatePostPrivacyPreference"
) as EntityPrivacy;
const defaultValues: Values = {
  managePostPage: "managePost",
  selectedPrivacy: defaultCreatePostPrivacyPreference || "PUBLIC",
  content: null,
  mediaAttachment: null,
  collectionAttachment: null,
};

export const useManagePostStore = create<Store>((set) => ({
  ...defaultValues,
  setManagePostPage: (managePostPage: ManagePostPage) =>
    set({ managePostPage }),
  setContent: (content: string | null) => set({ content }),
  setSelectedPrivacy: (selectedPrivacy: EntityPrivacy) =>
    set({ selectedPrivacy }),
  setMediaAttachment: (mediaAttachment: Media | null) =>
    set({ mediaAttachment }),
  setCollectionAttachment: (collectionAttachment: TCollection | null) =>
    set({ collectionAttachment }),
  resetState: () => set({ ...defaultValues }),
}));
