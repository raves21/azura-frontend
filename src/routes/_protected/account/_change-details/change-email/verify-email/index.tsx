import CodeVerificationForm from "@/components/core/auth/shared/CodeVerificationForm";
import ErrorDialog from "@/components/core/shared/ErrorDialog";
import { useChangeEmail } from "@/services/auth/authQueries";
import { setCurrentUser } from "@/services/auth/sharedFunctions";
import { useAccountSettingStore } from "@/utils/stores/useAccountSettingStore";
import { useCurrentUser } from "@/services/auth/authQueries";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { UserBasicInfo } from "@/utils/types/auth/auth";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export const Route = createFileRoute(
  "/_protected/account/_change-details/change-email/verify-email/"
)({
  component: () => <ChangeEmailVerifyEmailPage />,
});

function ChangeEmailVerifyEmailPage() {
  const { mutateAsync: changeEmail, isPending: isChangingEmail } =
    useChangeEmail();
  const { data: currentUser } = useCurrentUser();
  const [changeEmailStep, setChangeEmailStep, newEmail] =
    useAccountSettingStore(
      useShallow((state) => [
        state.changeEmailStep,
        state.setChangeEmailStep,
        state.newEmail,
      ])
    );
  const navigate = useNavigate();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  useEffect(() => {
    if (changeEmailStep !== "verifyEmail" || !newEmail) {
      navigate({ to: "/account" });
    }
  }, []);

  if (!currentUser) return <Navigate to="/login" replace />;

  if (!newEmail) return <Navigate to="/account" replace />;

  if (isChangingEmail) {
    return (
      <h1 className="text-3xl text-center font-bold text-mainAccent">
        Changing your email...
      </h1>
    );
  }

  return (
    <CodeVerificationForm
      type="accountSettings"
      afterSubmitSuccessAction={async () => {
        try {
          await changeEmail(newEmail);
          navigate({ to: "/account" });
          setChangeEmailStep(null);
          const currentUserWithNewEmail: UserBasicInfo = {
            ...currentUser,
            email: newEmail,
          };
          setCurrentUser(currentUserWithNewEmail);
          setChangeEmailStep(null);
        } catch (error) {
          toggleOpenDialog(<ErrorDialog error={error} />);
        }
      }}
      backButtonAction={() => {
        setChangeEmailStep(null);
        navigate({ to: "/account" });
      }}
      email={newEmail}
    />
  );
}
