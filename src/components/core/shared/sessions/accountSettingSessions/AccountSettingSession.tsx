import PasswordVerificationDialog from "@/components/core/settings/account/shared/PasswordVerificationDialog";
import { cn } from "@/lib/utils";
import { useAccountSettingLogoutSession } from "@/services/auth/authQueries";
import { replaceDialogContent } from "@/utils/functions/sharedFunctions";
import { useFormatToRelativeTimeOnInterval } from "@/utils/hooks/useFormatToRelativeTimeOnInterval";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useUniqueMutationKeyStore } from "@/utils/stores/useUniqueMutationKeyStore";
import { UserSession } from "@/utils/types/auth/auth";
import { useShallow } from "zustand/react/shallow";
import AsyncConfirmationDialog from "../../confirmationDialog/AsyncConfirmationDialog";
import ErrorDialog from "../../ErrorDialog";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  session: UserSession;
  className?: string;
};

export default function AccountSettingSession({ session, className }: Props) {
  const { timeAgo: loggedInRelativeTime } = useFormatToRelativeTimeOnInterval(
    session.createdAt
  );

  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const [uniqueMutationKey, setUniqueMutationKey] = useUniqueMutationKeyStore(
    useShallow((state) => [state.uniqueMutationKey, state.setUniqueMutationKey])
  );
  const { mutateAsync: logoutSession } = useAccountSettingLogoutSession({
    key: `logoutSession-${uniqueMutationKey}`,
  });
  const { toast } = useToast();

  return (
    <tr className={cn("border-gray-700", className)}>
      <td className="pl-0 pr-5 md:px-5 py-4 whitespace-nowrap">
        {loggedInRelativeTime}
      </td>
      <td className="px-5 py-4">{session.browser}</td>
      <td className="px-5 py-4">{session.os}</td>
      <td className="px-5 py-4">{session.platform}</td>
      <td className="pr-0 pl-5 md:px-5 py-4 text-center text-blue-500 font-semibold">
        {session.isCurrentSession ? (
          "You"
        ) : (
          <button
            onClick={() =>
              toggleOpenDialog(
                <PasswordVerificationDialog
                  afterSubmitSuccessAction={() => {
                    replaceDialogContent({
                      content: (
                        <AsyncConfirmationDialog
                          mutationKey={[`logoutSession-${uniqueMutationKey}`]}
                          confirmAction={async () => {
                            try {
                              await logoutSession(session.id);
                              toast({
                                description: "Successfully logged out session.",
                              });
                            } catch (error) {
                              replaceDialogContent({
                                content: <ErrorDialog error={error} />,
                              });
                            } finally {
                              setUniqueMutationKey(crypto.randomUUID());
                            }
                          }}
                          header="Confirm session logout"
                          message="Are you sure you want to logout this session?"
                        />
                      ),
                    });
                  }}
                />
              )
            }
            className="px-3 py-1 bg-mainAccent hover:bg-fuchsia-700 rounded-lg font-normal text-mainWhite"
          >
            Logout
          </button>
        )}
      </td>
    </tr>
  );
}
