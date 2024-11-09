import { createFileRoute, Navigate, useRouter } from "@tanstack/react-router";
import CodeVerificationForm from "@/components/shared/auth/CodeVerificationForm";
import { useAuthStore } from "@/utils/stores/authStore";
import { SignUpStep } from "@/utils/types/auth/auth";
import { useShallow } from "zustand/react/shallow";

export const Route = createFileRoute("/_auth/signup/verify-email/")({
  component: () => <VerifyEmailPage />,
});

function VerifyEmailPage() {
  const [signUpStep, setSignUpStep] = useAuthStore(
    useShallow((state) => [state.signUpStep, state.setSignUpStep])
  );
  const router = useRouter();
  if (signUpStep !== SignUpStep.VERIFY_EMAIL) return <Navigate to="/signup" />;
  return (
    <CodeVerificationForm
      backButtonAction={() => {
        router.history.back();
        setSignUpStep(SignUpStep.PASSWORD_CONFIRMATION);
      }}
    />
  );
}
