import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "./-LoginForm";
import { useAuthStore } from "@/utils/stores/authStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { SignUpStep } from "@/utils/types/auth/auth";

export const Route = createFileRoute("/_auth/login/")({
  component: () => <LoginPage />,
});

function LoginPage() {
  const [setSignUpValues, setSignUpStep] = useAuthStore(
    useShallow((state) => [state.setSignUpValues, state.setSignUpStep])
  );

  useEffect(() => {
    setSignUpValues({
      email: "",
      handle: "",
      password: "",
      username: "",
    });
    setSignUpStep(SignUpStep.USER_DETAILS);
  }, []);

  return (
    <div className="z-10 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold text-mainWhite">Login</h1>
      <LoginForm />
    </div>
  );
}
