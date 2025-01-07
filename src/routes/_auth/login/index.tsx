import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "./-LoginForm";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { SignUpStep } from "@/utils/types/auth/auth";

export const Route = createFileRoute("/_auth/login/")({
  component: () => <LoginPage />,
});

function LoginPage() {
  const [setSignUpValues, setSignUpStep, setDetachedModeUserInfo] =
    useAuthStore(
      useShallow((state) => [
        state.setSignUpValues,
        state.setSignUpStep,
        state.setDetachedModeUserInfo,
      ])
    );

  useEffect(() => {
    setSignUpValues({
      email: "",
      handle: "",
      password: "",
      username: "",
    });
    setSignUpStep(SignUpStep.USER_DETAILS);
    setDetachedModeUserInfo(null);
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold text-mainWhite">Login</h1>
      <LoginForm />
    </>
  );
}
