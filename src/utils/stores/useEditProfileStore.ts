import { create } from "zustand";

type EditProfilePage =
  | "editProfilePage"
  | "manageBannerPage"
  | "manageAvatarPage";

type EditProfileStoreValues = {
  editProfileBanner: string | null;
  editProfileAvatar: string | null;
  editProfilePage: EditProfilePage;
};

type EditProfileStoreActions = {
  setEditProfileBanner: (editProfileBanner: string | null) => void;
  setEditProfileAvatar: (editProfileAvatar: string | null) => void;
  setEditProfilePage: (editProfilePage: EditProfilePage) => void;
};

type EditProfileStore = EditProfileStoreValues & EditProfileStoreActions;

const editProfileStoreDefaultValues: EditProfileStoreValues = {
  editProfileBanner: null,
  editProfileAvatar: null,
  editProfilePage: "editProfilePage"
};

export const useEditProfileStore = create<EditProfileStore>((set) => ({
  ...editProfileStoreDefaultValues,
  setEditProfileBanner: (editProfileBanner: string | null) =>
    set({ editProfileBanner }),
  setEditProfileAvatar: (editProfileAvatar: string | null) =>
    set({ editProfileAvatar }),
  setEditProfilePage: (editProfilePage: EditProfilePage) =>
    set({ editProfilePage })
}));
