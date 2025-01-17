import CodeVerificationForm from "@/components/core/auth/CodeVerificationForm";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { ForgotPasswordStep } from "@/utils/types/auth/auth";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
// import { useShallow } from "zustand/react/shallow";

export const Route = createFileRoute(
  "/_auth/login/forgot-password/verify-email/"
)({
  component: () => <VerifyEmailPage />
});

function VerifyEmailPage() {
  const [forgotPasswordStep, setForgotPasswordStep, findAccountFoundUser] =
    useAuthStore(
      useShallow((state) => [
        state.forgotPasswordStep,
        state.setForgotPasswordStep,
        state.findAccountFoundUser
      ])
    );

  const router = useRouter();

  useEffect(() => {
    if (
      forgotPasswordStep !== ForgotPasswordStep.VERIFY_EMAIL ||
      !findAccountFoundUser
    ) {
      router.navigate({
        to: "/login"
      });
    }
  }, []);

  return (
    <CodeVerificationForm
      email={findAccountFoundUser ? findAccountFoundUser.email : ""}
      backButtonAction={() => {
        setForgotPasswordStep(ForgotPasswordStep.FIND_ACCOUNT);
        router.history.back();
      }}
      afterVerificationSuccessAction={() => {
        setForgotPasswordStep(ForgotPasswordStep.CHANGE_PASSWORD);
        router.navigate({
          to: "/login/forgot-password/change-password"
        });
      }}
    />
  );
}
