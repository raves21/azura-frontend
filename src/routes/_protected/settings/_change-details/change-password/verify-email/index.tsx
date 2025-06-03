import CodeVerificationForm from "@/components/core/auth/shared/CodeVerificationForm";
import { useCurrentUser } from "@/services/auth/api/queries";
import { useAccountSettingStore } from "@/utils/stores/useAccountSettingStore";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export const Route = createFileRoute(
  "/_protected/settings/_change-details/change-password/verify-email/"
)({
  component: () => <AccountChangePasswordVerifyEmailPage />,
});

function AccountChangePasswordVerifyEmailPage() {
  const { data: currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const [changePasswordStep, setChangePasswordStep] = useAccountSettingStore(
    useShallow((state) => [
      state.changePasswordStep,
      state.setChangePasswordStep,
    ])
  );

  useEffect(() => {
    if (changePasswordStep !== "verifyEmail") {
      navigate({ to: "/settings" });
    }
  }, []);

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <CodeVerificationForm
      type="accountSettings"
      afterSubmitSuccessAction={() => {
        setChangePasswordStep("changePassword");
        navigate({ to: "/settings/change-password/input-password" });
      }}
      backButtonAction={() => {
        setChangePasswordStep(null);
        navigate({ to: "/settings" });
      }}
      email={currentUser.email}
    />
  );
}
