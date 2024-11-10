import CodeVerificationForm from "@/components/shared/auth/CodeVerificationForm";
import { useAuthStore } from "@/utils/stores/authStore";
import { ForgotPasswordStep } from "@/utils/types/auth/auth";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
// import { useShallow } from "zustand/react/shallow";

export const Route = createFileRoute(
  "/_auth/login/forgot-password/verify-email/"
)({
  component: () => <VerifyEmailPage />,
});

function VerifyEmailPage() {
  const [forgotPasswordStep, setForgotPasswordStep] = useAuthStore(
    useShallow((state) => [
      state.forgotPasswordStep,
      state.setForgotPasswordStep,
    ])
  );

  const router = useRouter();

  useEffect(() => {
    if (forgotPasswordStep !== ForgotPasswordStep.VERIFY_EMAIL) {
      router.navigate({
        to: "/login",
      });
    }
  }, []);

  return (
    <CodeVerificationForm
      backButtonAction={() => {
        router.history.back();
      }}
      verifyButtonAction={() => {
        setForgotPasswordStep(ForgotPasswordStep.CHANGE_PASSWORD);
        router.navigate({
          to: "/login/forgot-password/change-password",
        });
      }}
    />
  );
}
