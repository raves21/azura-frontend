import { create } from "zustand";
import { EntityPrivacy } from "../types/social/shared";

type CreatePostPage =
  | "createPost"
  | "selectPrivacy"
  | "selectMediaAttachment"
  | "selectCollectionAttachment";

type CreatePostStoreValues = {
  createPostPage: CreatePostPage;
  selectedPrivacy: EntityPrivacy;
};

type CreatePostStoreActions = {
  setCreatePostPage: (createPostPage: CreatePostPage) => void;
  setSelectedPrivacy: (selectedPrivacy: EntityPrivacy) => void;
};

type CreatePostStore = CreatePostStoreValues & CreatePostStoreActions;

const defaultCreatePostPrivacyPreference = localStorage.getItem(
  "defaultCreatePostPrivacyPreference"
) as EntityPrivacy;
const createPostStoreDefaultValues: CreatePostStoreValues = {
  createPostPage: "createPost",
  selectedPrivacy: defaultCreatePostPrivacyPreference || "PUBLIC",
};

export const useCreatePostStore = create<CreatePostStore>((set) => ({
  ...createPostStoreDefaultValues,
  setCreatePostPage: (createPostPage: CreatePostPage) =>
    set({ createPostPage }),
  setSelectedPrivacy: (selectedPrivacy: EntityPrivacy) =>
    set({ selectedPrivacy }),
}));
