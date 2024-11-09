import { useAuthStore } from "@/utils/stores/authStore";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import ChangePasswordForm from "./-ChangePasswordForm";

export const Route = createFileRoute(
  "/_auth/login/forgot-password/change-password/"
)({
  component: () => <ChangePasswordPage />,
});

function ChangePasswordPage() {
  const { forgotPassword } = useAuthStore();

  if (!forgotPassword) return <Navigate to="/login" />;
  return (
    <div className="z-10 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold text-mainWhite">Change Password</h1>
      <ChangePasswordForm />
    </div>
  );
}
