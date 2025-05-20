import { create } from "zustand";
import {
  ForgotPasswordStep,
  LoginResponseDetachedMode,
  SignUpStep,
  SignUpValues,
  UserBasicInfo,
} from "../types/auth/auth";

type Values = {
  signUpStep: SignUpStep;
  signUpValues: SignUpValues;
  forgotPasswordStep: ForgotPasswordStep | null;
  findAccountFoundUser: UserBasicInfo | null;
  detachedModeUserInfo: LoginResponseDetachedMode | null;
};

type Actions = {
  setSignUpStep: (signUpStep: SignUpStep) => void;
  setSignUpValues: (signUpValues: SignUpValues) => void;
  setForgotPasswordStep: (
    forgotPasswordStep: ForgotPasswordStep | null
  ) => void;
  setFindAccountFoundUser: (findAccountFoundUser: UserBasicInfo | null) => void;
  setDetachedModeUserInfo: (
    detachedModeUserInfo: LoginResponseDetachedMode | null
  ) => void;
  resetState: () => void;
};

type Store = Values & Actions;

const defaultValues: Values = {
  signUpStep: SignUpStep.USER_DETAILS,
  signUpValues: {
    email: "",
    handle: "",
    password: "",
    username: "",
  },
  forgotPasswordStep: ForgotPasswordStep.FIND_ACCOUNT,
  findAccountFoundUser: null,
  detachedModeUserInfo: null,
};

export const useAuthStore = create<Store>((set) => ({
  ...defaultValues,
  setSignUpStep: (signUpStep: SignUpStep) => set({ signUpStep }),
  setSignUpValues: (signUpValues: SignUpValues) => set({ signUpValues }),
  setForgotPasswordStep: (forgotPasswordStep: ForgotPasswordStep | null) =>
    set({ forgotPasswordStep }),
  setFindAccountFoundUser: (findAccountFoundUser: UserBasicInfo | null) =>
    set({ findAccountFoundUser }),
  setDetachedModeUserInfo: (
    detachedModeUserInfo: LoginResponseDetachedMode | null
  ) => set({ detachedModeUserInfo }),
  resetState: () => set({ ...defaultValues }),
}));
