import create from "zustand";
import { SignUpStep, SignUpValues } from "../types/auth/auth";

type AuthStoreValues = {
  signUpStep: SignUpStep;
  signUpValues: SignUpValues;
  forgotPassword: boolean;
};

type AuthStoreActions = {
  setSignUpStep: (signUpStep: SignUpStep) => void;
  setSignUpValues: (signUpValues: SignUpValues) => void;
  setForgotPassword: (forgotPassword: boolean) => void;
};

type AuthStore = AuthStoreValues & AuthStoreActions;

const authStoreDefaultValues: AuthStoreValues = {
  signUpStep: SignUpStep.USER_DETAILS,
  signUpValues: {
    email: "",
    handle: "",
    password: "",
    username: "",
  },
  forgotPassword: false,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...authStoreDefaultValues,
  setSignUpStep: (signUpStep: SignUpStep) => set({ signUpStep }),
  setSignUpValues: (signUpValues: SignUpValues) => set({ signUpValues }),
  setForgotPassword: (forgotPassword: boolean) => set({ forgotPassword }),
}));
