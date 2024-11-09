import CodeVerificationForm from "@/components/shared/auth/CodeVerificationForm";
import { useAuthStore } from "@/utils/stores/authStore";
import { createFileRoute, Navigate, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/login/forgot-password/verify-email/"
)({
  component: () => <VerifyEmailPage />,
});

function VerifyEmailPage() {
  const { forgotPassword } = useAuthStore();
  const router = useRouter();

  if (!forgotPassword) return <Navigate to="/login" />;
  return (
    <CodeVerificationForm
      backButtonAction={() => {
        router.history.back();
      }}
      verificationSuccessNavigationLink="/login/forgot-password/change-password"
    />
  );
}
