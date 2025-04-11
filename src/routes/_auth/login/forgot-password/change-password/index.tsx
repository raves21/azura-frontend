import { useAuthStore } from "@/utils/stores/useAuthStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ChangePasswordForm from "../../../../../components/core/auth/login/forgotPassword/changePassword/ChangePasswordForm";
import { ForgotPasswordStep } from "@/utils/types/auth/auth";
import { useEffect } from "react";
import { useLogin } from "@/services/auth/authQueries";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ErrorDialog from "@/components/core/shared/ErrorDialog";

export const Route = createFileRoute(
  "/_auth/login/forgot-password/change-password/"
)({
  component: () => <ChangePasswordPage />,
});

function ChangePasswordPage() {
  const { forgotPasswordStep, findAccountFoundUser } = useAuthStore();
  const { mutateAsync: login, isPending: isLoggingIn } = useLogin();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const navigate = useNavigate();

  useEffect(() => {
    if (forgotPasswordStep !== ForgotPasswordStep.CHANGE_PASSWORD) {
      navigate({
        to: "/login",
      });
    }
  }, []);

  if (isLoggingIn) {
    return (
      <h1 className="text-3xl font-bold text-mainAccent">Logging in...</h1>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-mainWhite">Change Password</h1>
      <ChangePasswordForm
        afterChangePasswordSuccessAction={async (values) => {
          try {
            if (!findAccountFoundUser) throw new Error("User not found.");
            //todo: show dialog choice before logging in, if user wants to logout other sessions or not
            await login({
              email: findAccountFoundUser.email.trim(),
              password: values.newPassword.trim(),
            });
          } catch (error) {
            toggleOpenDialog(<ErrorDialog error={error} />);
          }
        }}
      />
    </>
  );
}
