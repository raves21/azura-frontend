import { create } from "zustand";

type ChangePasswordStep = "verifyEmail" | "changePassword";
type ChangeEmailStep = "inputEmail" | "verifyEmail";

type Values = {
  changePasswordStep: ChangePasswordStep | null;
  changeEmailStep: ChangeEmailStep | null;
  newEmail: string | null;
  changeHandleStep: "changeHandle" | null;
};

type Actions = {
  setChangePasswordStep: (
    changePasswordStep: ChangePasswordStep | null
  ) => void;
  setChangeEmailStep: (changeEmailStep: ChangeEmailStep | null) => void;
  setNewEmail: (newEmail: string | null) => void;
  setChangeHandleStep: (changeHandleStep: "changeHandle" | null) => void;
};

type Store = Values & Actions;

const defaultValues: Values = {
  changePasswordStep: null,
  changeEmailStep: null,
  newEmail: null,
  changeHandleStep: null,
};

export const useAccountSettingStore = create<Store>((set) => ({
  ...defaultValues,
  setChangePasswordStep: (changePasswordStep: ChangePasswordStep | null) =>
    set({ changePasswordStep }),
  setChangeEmailStep: (changeEmailStep: ChangeEmailStep | null) =>
    set({ changeEmailStep }),
  setNewEmail: (newEmail: string | null) => set({ newEmail }),
  setChangeHandleStep: (changeHandleStep: "changeHandle" | null) =>
    set({ changeHandleStep }),
}));
