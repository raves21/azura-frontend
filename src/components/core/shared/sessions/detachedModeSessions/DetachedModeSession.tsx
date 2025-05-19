import { cn } from "@/lib/utils";
import {
  useDetachedModeLogoutSession,
  useLogin,
} from "@/services/auth/authQueries";
import { replaceDialogContent } from "@/utils/functions/sharedFunctions";
import { useFormatToRelativeTimeOnInterval } from "@/utils/hooks/useFormatToRelativeTimeOnInterval";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useUniqueMutationKeyStore } from "@/utils/stores/useUniqueMutationKeyStore";
import {
  UserBasicInfoWithPassword,
  UserSession,
} from "@/utils/types/auth/auth";
import { useShallow } from "zustand/react/shallow";
import AsyncConfirmationDialog from "../../confirmationDialog/AsyncConfirmationDialog";
import ErrorDialog from "../../ErrorDialog";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  session: UserSession;
  userInfo: UserBasicInfoWithPassword;
  className?: string;
  setIsLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DetachedModeSession({
  session,
  className,
  setIsLoggingIn,
  userInfo,
}: Props) {
  const { timeAgo: loggedInRelativeTime } = useFormatToRelativeTimeOnInterval(
    session.createdAt
  );

  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const [uniqueMutationKey, setUniqueMutationKey] = useUniqueMutationKeyStore(
    useShallow((state) => [state.uniqueMutationKey, state.setUniqueMutationKey])
  );
  const { mutateAsync: logoutSession } = useDetachedModeLogoutSession({
    key: `detachedModeLogoutSession-${uniqueMutationKey}`,
  });

  const navigate = useNavigate();

  const { mutateAsync: login } = useLogin();

  return (
    <tr className={cn("border-gray-700", className)}>
      <td className="pl-0 pr-5 md:px-5 py-4 whitespace-nowrap">
        {loggedInRelativeTime}
      </td>
      <td className="px-5 py-4">{session.browser}</td>
      <td className="px-5 py-4">{session.os}</td>
      <td className="px-5 py-4">{session.platform}</td>
      <td className="pr-0 pl-5 md:px-5 py-4 text-center text-blue-500 font-semibold">
        <button
          onClick={() =>
            toggleOpenDialog(
              <AsyncConfirmationDialog
                mutationKey={[`detachedModeLogoutSession-${uniqueMutationKey}`]}
                confirmAction={async () => {
                  try {
                    await logoutSession(session.id);
                  } catch (error) {
                    replaceDialogContent({
                      content: <ErrorDialog error={error} />,
                    });
                  } finally {
                    setUniqueMutationKey(crypto.randomUUID());
                  }
                }}
                afterConfirmSuccessAction={async () => {
                  try {
                    setIsLoggingIn(true);
                    await login({
                      email: userInfo.email,
                      password: userInfo.password,
                    });
                  } catch (error) {
                    navigate({ to: "/login", replace: true });
                    toggleOpenDialog(
                      <ErrorDialog
                        error={new Error("An error occured while logging in.")}
                      />
                    );
                  } finally {
                    setIsLoggingIn(false);
                  }
                }}
                header="Confirm session logout"
                message="Are you sure you want to logout this session?"
              />
            )
          }
          className="px-3 py-1 bg-mainAccent hover:bg-fuchsia-700 rounded-lg font-normal text-mainWhite"
        >
          Logout
        </button>
      </td>
    </tr>
  );
}
