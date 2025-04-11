import { create } from "zustand";

type EditProfilePage =
  | "editProfilePage"
  | "manageBannerPage"
  | "manageAvatarPage";

type Values = {
  editProfileUsername: string;
  editProfileBio: string | null;
  editProfileBanner: string | null;
  editProfileAvatar: string | null;
  editProfilePage: EditProfilePage;
};

type Actions = {
  setEditProfileUsername: (editProfileUsername: string) => void;
  setEditProfileBio: (editProfileBio: string | null) => void;
  setEditProfileBanner: (editProfileBanner: string | null) => void;
  setEditProfileAvatar: (editProfileAvatar: string | null) => void;
  setEditProfilePage: (editProfilePage: EditProfilePage) => void;
};

type Store = Values & Actions;

const defaultValues: Values = {
  editProfileUsername: "",
  editProfileBio: null,
  editProfileBanner: null,
  editProfileAvatar: null,
  editProfilePage: "editProfilePage",
};

export const useEditProfileStore = create<Store>((set) => ({
  ...defaultValues,
  setEditProfileBanner: (editProfileBanner: string | null) =>
    set({ editProfileBanner }),
  setEditProfileAvatar: (editProfileAvatar: string | null) =>
    set({ editProfileAvatar }),
  setEditProfilePage: (editProfilePage: EditProfilePage) =>
    set({ editProfilePage }),
  setEditProfileUsername: (editProfileUsername: string) =>
    set({ editProfileUsername }),
  setEditProfileBio: (editProfileBio: string | null) => set({ editProfileBio }),
}));
