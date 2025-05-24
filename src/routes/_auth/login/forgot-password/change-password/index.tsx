import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import ChangePasswordForm from "../../../../../components/core/auth/login/forgotPassword/changePassword/ChangePasswordForm";
import { ForgotPasswordStep } from "@/utils/types/auth/auth";
import { useEffect } from "react";
import { useLogin } from "@/services/auth/authQueries";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ErrorDialog from "@/components/core/shared/ErrorDialog";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { LoaderCircle } from "lucide-react";

export const Route = createFileRoute(
  "/_auth/login/forgot-password/change-password/"
)({
  component: () => <ChangePasswordPage />,
});

function ChangePasswordPage() {
  const [forgotPasswordStep, findAccountFoundUser] = useAuthStore(
    useShallow((state) => [
      state.forgotPasswordStep,
      state.findAccountFoundUser,
    ])
  );
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
      <div className="flex items-center justify-center gap-5 w-full flex-wrap">
        <h1 className="text-2xl mobile-m:text-3xl font-bold text-mainAccent text-center w-fit">
          Logging in
        </h1>
        <LoaderCircle className="animate-spin size-8 mobile-m:size-10 stroke-mainAccent" />
      </div>
    );
  }

  if (!findAccountFoundUser) return <Navigate to="/login" replace />;

  return (
    <>
      <h1 className="text-4xl font-bold text-mainWhite self-center">
        Change Password
      </h1>
      <ChangePasswordForm
        type="forgotPassword"
        user={findAccountFoundUser}
        afterSubmitSuccessAction={async (values) => {
          try {
            await login({
              email: findAccountFoundUser.email.trim(),
              password: values.newPassword.trim(),
            });
          } catch (error) {
            toggleOpenDialog(<ErrorDialog error={error} />);
          }
        }}
        cancelButtonLinkProps={{ to: "/login" }}
      />
    </>
  );
}
