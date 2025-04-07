import { createFileRoute } from "@tanstack/react-router";
import UserDetailsForm from "../../../components/core/auth/signup/UserDetailsForm";
import { SignUpStep } from "@/utils/types/auth/auth";
import PasswordConfirmationForm from "../../../components/core/auth/signup/PasswordConfirmationForm";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth/signup/")({
  component: () => <SignUpPage />,
});

function SignUpPage() {
  const { signUpStep, setSignUpStep } = useAuthStore();

  useEffect(() => {
    setSignUpStep(SignUpStep.USER_DETAILS);
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold text-mainWhite">Create an account</h1>
      {signUpStep === SignUpStep.USER_DETAILS ? (
        <UserDetailsForm />
      ) : signUpStep === SignUpStep.PASSWORD_CONFIRMATION ? (
        <PasswordConfirmationForm />
      ) : null}
    </>
  );
}
