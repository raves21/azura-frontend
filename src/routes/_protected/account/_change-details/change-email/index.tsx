import ChangeEmailForm from "@/components/core/account/shared/ChangeEmailForm";
import { useAccountSettingStore } from "@/utils/stores/useAccountSettingStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute(
  "/_protected/account/_change-details/change-email/"
)({
  component: () => <AccountChangeEmailPage />,
});

function AccountChangeEmailPage() {
  const changeEmailStep = useAccountSettingStore(
    (state) => state.changeEmailStep
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (changeEmailStep !== "inputEmail") {
      navigate({ to: "/account" });
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 w-full px-4 sm:px-0 sm:w-auto">
      <h1 className="text-3xl mobile-l:text-4xl font-bold text-mainWhite">
        Change Email
      </h1>
      <ChangeEmailForm />
    </div>
  );
}
