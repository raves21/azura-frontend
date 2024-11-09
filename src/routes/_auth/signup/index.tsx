import { createFileRoute } from "@tanstack/react-router";
import UserDetailsForm from "./-UserDetailsForm";
import { SignUpStep } from "@/utils/types/auth/auth";
import PasswordConfirmationForm from "./-PasswordConfirmationForm";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "@/utils/stores/authStore";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth/signup/")({
  component: () => <SignUpPage />,
});

function SignUpPage() {
  const [signUpStep, signUpValues] = useAuthStore(
    useShallow((state) => [state.signUpStep, state.signUpValues])
  );

  useEffect(() => {
    console.log("VALUES", signUpValues);
  }, [signUpValues]);

  return (
    <div className="z-10 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold text-mainWhite">Create an account</h1>
      {signUpStep === SignUpStep.USER_DETAILS ? (
        <UserDetailsForm />
      ) : signUpStep === SignUpStep.PASSWORD_CONFIRMATION ? (
        <PasswordConfirmationForm />
      ) : null}
    </div>
  );
}
