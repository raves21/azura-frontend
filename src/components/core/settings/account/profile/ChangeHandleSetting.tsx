import { useCurrentUser } from "@/services/auth/api/queries";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { Edit2 } from "lucide-react";
import PasswordVerificationDialog from "../shared/PasswordVerificationDialog";
import { useAccountSettingStore } from "@/utils/stores/useAccountSettingStore";

export default function ChangeHandleSetting() {
  const { data: currentUser } = useCurrentUser();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const navigate = useNavigate();
  const setChangeHandleStep = useAccountSettingStore(
    (state) => state.setChangeHandleStep
  );

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between w-full md:py-4">
      <p className="text-blue-500 font-medium py-3 text-lg">
        {currentUser.handle}
      </p>
      <button
        onClick={() =>
          toggleOpenDialog(
            <PasswordVerificationDialog
              afterSubmitSuccessAction={() => {
                setChangeHandleStep("changeHandle");
                navigate({ to: "/settings/change-handle" });
              }}
            />
          )
        }
        className="text-sm sm:text-base ml-auto md:self-center h-min w-fit px-4 py-3 gap-3 bg-mainAccent rounded-lg hover:bg-fuchsia-700 font-medium flex items-center"
      >
        <Edit2 className="stroke-mainWhite size-4 sm:size-5" />
        <p>Change</p>
      </button>
    </div>
  );
}
