import ChangeHandleForm from "@/components/core/settings/account/shared/ChangeHandleForm";
import { useAccountSettingStore } from "@/utils/stores/useAccountSettingStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute(
  "/_protected/settings/_change-details/change-handle/"
)({
  component: () => <ChangeHandlePage />,
});

function ChangeHandlePage() {
  const changeHandleStep = useAccountSettingStore(
    (state) => state.changeHandleStep
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (changeHandleStep !== "changeHandle") {
      navigate({ to: "/settings" });
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 w-full px-4 sm:px-0 sm:w-auto">
      <h1 className="text-3xl mobile-l:text-4xl font-bold text-mainWhite">
        Change Handle
      </h1>
      <ChangeHandleForm />
    </div>
  );
}
