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
import { LoaderCircle } from "lucide-react";

export const Route = createFileRoute(
  "/_protected/settings/_change-details/change-email/verify-email/"
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
      navigate({ to: "/settings" });
    }
  }, []);

  if (!currentUser) return <Navigate to="/login" replace />;

  if (!newEmail) return <Navigate to="/settings" replace />;

  if (isChangingEmail) {
    return (
      <div className="flex items-center justify-center gap-5 w-full flex-wrap">
        <h1 className="text-2xl mobile-m:text-3xl font-bold text-mainAccent text-center w-fit">
          Changing your email...
        </h1>
        <LoaderCircle className="animate-spin size-8 mobile-m:size-10 stroke-mainAccent" />
      </div>
    );
  }

  return (
    <CodeVerificationForm
      type="accountSettings"
      afterSubmitSuccessAction={async () => {
        try {
          await changeEmail(newEmail);
          navigate({ to: "/settings" });
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
        navigate({ to: "/settings" });
      }}
      email={newEmail}
    />
  );
}
