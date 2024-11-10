import create from "zustand";
import {
  ForgotPasswordStep,
  SignUpStep,
  SignUpValues,
} from "../types/auth/auth";

type AuthStoreValues = {
  signUpStep: SignUpStep;
  signUpValues: SignUpValues;
  forgotPasswordStep: ForgotPasswordStep | null;
};

type AuthStoreActions = {
  setSignUpStep: (signUpStep: SignUpStep) => void;
  setSignUpValues: (signUpValues: SignUpValues) => void;
  setForgotPasswordStep: (forgotPasswordStep: ForgotPasswordStep) => void;
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
  forgotPasswordStep: ForgotPasswordStep.FIND_ACCOUNT,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...authStoreDefaultValues,
  setSignUpStep: (signUpStep: SignUpStep) => set({ signUpStep }),
  setSignUpValues: (signUpValues: SignUpValues) => set({ signUpValues }),
  setForgotPasswordStep: (forgotPasswordStep: ForgotPasswordStep) =>
    set({ forgotPasswordStep }),
}));
