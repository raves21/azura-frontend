import ChangePasswordForm from "@/components/core/auth/login/forgotPassword/changePassword/ChangePasswordForm";
import { useCurrentUser } from "@/services/auth/authQueries";
import { useAccountSettingStore } from "@/utils/stores/useAccountSettingStore";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export const Route = createFileRoute(
  "/_protected/account/_change-details/change-password/input-password/"
)({
  component: () => <ChangePasswordInputPasswordPage />,
});

function ChangePasswordInputPasswordPage() {
  const navigate = useNavigate();
  const [changePasswordStep, setChangePasswordStep] = useAccountSettingStore(
    useShallow((state) => [
      state.changePasswordStep,
      state.setChangePasswordStep,
    ])
  );
  const { data: currentUser } = useCurrentUser();

  useEffect(() => {
    if (changePasswordStep !== "changePassword") {
      navigate({ to: "/account" });
    }
  }, []);

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col items-center gap-8 w-full px-4 sm:px-0 sm:w-auto">
      <h1 className="text-3xl mobile-l:text-4xl font-bold text-mainWhite text-center">
        Change Password
      </h1>
      <ChangePasswordForm
        type="accountSettingChangePassword"
        user={currentUser}
        afterSubmitSuccessAction={async () => {
          navigate({ to: "/account" });
          setChangePasswordStep(null);
        }}
        cancelButtonLinkProps={{ to: "/account" }}
      />
    </div>
  );
}
