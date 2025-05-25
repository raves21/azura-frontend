import { useDeleteAccount } from "@/services/auth/authQueries";
import { replaceDialogContent } from "@/utils/functions/sharedFunctions";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useUniqueMutationKeyStore } from "@/utils/stores/useUniqueMutationKeyStore";
import { Trash } from "lucide-react";
import PasswordVerificationDialog from "../shared/PasswordVerificationDialog";
import AsyncConfirmationDialog from "@/components/core/shared/confirmationDialog/AsyncConfirmationDialog";
import ErrorDialog from "@/components/core/shared/ErrorDialog";

export default function DeleteAccountButton() {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const uniqueMutationKey = useUniqueMutationKeyStore(
    (state) => state.uniqueMutationKey
  );
  const { mutateAsync: deleteAccount } = useDeleteAccount({
    key: `deleteAccount-${uniqueMutationKey}`,
  });

  return (
    <button
      onClick={() =>
        toggleOpenDialog(
          <PasswordVerificationDialog
            afterSubmitSuccessAction={() => {
              replaceDialogContent({
                content: (
                  <AsyncConfirmationDialog
                    mutationKey={[`deleteAccount-${uniqueMutationKey}`]}
                    confirmAction={async () => {
                      try {
                        await deleteAccount();
                      } catch (error) {
                        replaceDialogContent({
                          content: <ErrorDialog error={error} />,
                        });
                      }
                    }}
                    header="Delete account confirmation"
                    message="Are you sure you want to delete your account? This action cannot be undone."
                  />
                ),
              });
            }}
          />
        )
      }
      className="text-sm sm:text-base ml-auto 1440:self-center h-min mt-4 1440:mt-0 px-4 py-3 gap-3 bg-red-500 rounded-lg hover:bg-red-600 font-medium flex items-center"
    >
      <Trash className="stroke-mainWhite size-4 sm:size-5" />
      <p>Delete account</p>
    </button>
  );
}
