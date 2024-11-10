import { useAuthStore } from "@/utils/stores/authStore";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import ChangePasswordForm from "./-ChangePasswordForm";
import { ForgotPasswordStep } from "@/utils/types/auth/auth";
import { useEffect } from "react";

export const Route = createFileRoute(
  "/_auth/login/forgot-password/change-password/"
)({
  component: () => <ChangePasswordPage />,
});

function ChangePasswordPage() {
  const { forgotPasswordStep } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (forgotPasswordStep !== ForgotPasswordStep.CHANGE_PASSWORD) {
      router.navigate({
        to: "/login",
      });
    }
  }, []);

  return (
    <div className="z-10 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold text-mainWhite">Change Password</h1>
      <ChangePasswordForm />
    </div>
  );
}
