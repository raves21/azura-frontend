import { useCurrentUser, useSendOTC } from "@/services/auth/authQueries";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Circle, Edit2 } from "lucide-react";
import AsyncConfirmationDialog from "@/components/core/shared/confirmationDialog/AsyncConfirmationDialog";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { useAccountSettingStore } from "@/utils/stores/useAccountSettingStore";
import { useUniqueMutationKeyStore } from "@/utils/stores/useUniqueMutationKeyStore";

export default function ChangePasswordSetting() {
  const uniqueMutationKey = useUniqueMutationKeyStore(
    (state) => state.uniqueMutationKey
  );
  const { mutateAsync: sendOTC } = useSendOTC({
    key: `accountSettingChangePassword-${uniqueMutationKey}`,
  });

  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  const { data: currentUser } = useCurrentUser();

  const navigate = useNavigate();

  const setChangePasswordStep = useAccountSettingStore(
    (state) => state.setChangePasswordStep
  );

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between w-full md:py-4">
      <div className="flex items-center gap-1 py-3">
        {Array.from({ length: 15 }).map((_, i) => (
          <Circle
            className="size-[6px] sm:size-2 fill-mainWhite stroke-none"
            key={i}
          />
        ))}
      </div>
      <button
        onClick={() =>
          toggleOpenDialog(
            <AsyncConfirmationDialog
              mutationKey={[
                `accountSettingChangePassword-${uniqueMutationKey}`,
              ]}
              confirmAction={async () => await sendOTC(currentUser.email)}
              header="Change password?"
              message="Are you sure you want to change your password? This will send an OTC to your email for verification."
              afterConfirmSuccessAction={() => {
                setChangePasswordStep("verifyEmail");
                navigate({ to: "/settings/change-password/verify-email" });
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
