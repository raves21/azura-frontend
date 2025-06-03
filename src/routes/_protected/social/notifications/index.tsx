import NotificationSkeleton from "@/components/core/loadingSkeletons/social/NotificationSkeleton";
import BackButton from "@/components/core/shared/BackButton";
import AsyncConfirmationDialog from "@/components/core/shared/confirmationDialog/AsyncConfirmationDialog";
import ErrorDialog from "@/components/core/shared/ErrorDialog";
import Notification from "@/components/core/social/mainContent/notification/Notification";
import {
  useDeleteAllNotifications,
} from "@/services/social/api/mutations";
import { useNotifications } from "@/services/social/api/queries";
import { replaceDialogContent } from "@/utils/functions/sharedFunctions";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useUniqueMutationKeyStore } from "@/utils/stores/useUniqueMutationKeyStore";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Circle, Trash } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { useShallow } from "zustand/react/shallow";

export const Route = createFileRoute("/_protected/social/notifications/")({
  component: () => <NotificationsPage />,
});

function NotificationsPage() {
  const router = useRouter();

  const {
    data: notifications,
    isPending: isNotificationsPending,
    error: notificationsError,
    isFetchingNextPage,
    fetchNextPage,
  } = useNotifications();

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);

  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const [uniqueMutationKey, setUniqueMutationKey] = useUniqueMutationKeyStore(
    useShallow((state) => [state.uniqueMutationKey, state.setUniqueMutationKey])
  );
  const { mutateAsync: deleteAllNotifications } = useDeleteAllNotifications({
    key: `deleteAllNotifs-${uniqueMutationKey}`,
  });

  async function deleteAllNotifs() {
    try {
      await deleteAllNotifications();
    } catch (error) {
      replaceDialogContent({ content: <ErrorDialog error={error} /> });
    } finally {
      setUniqueMutationKey(crypto.randomUUID());
    }
  }

  if (isNotificationsPending) {
    return (
      <div className="bg-socialPrimary w-full flex flex-col gap-5 rounded-lg">
        <div className="flex items-center gap-6 p-3 text-base font-semibold mobile-l:text-lg sm:p-5 sm:text-xl">
          <button
            onClick={() => router.history.back()}
            className="relative self-start w-min group"
          >
            <ArrowLeft className="transition-colors size-6 mobile-l:size-7 stroke-mainWhite group-hover:stroke-mainAccent" />
            <Circle className="fill-gray-700/20 stroke-none size-[150%] group-hover:opacity-100 opacity-0 transition-opacity rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </button>
          <p>Notifications</p>
        </div>
        <div className="w-full flex flex-col">
          {Array.from({ length: 3 }).map((_, i) => (
            <NotificationSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (notificationsError) {
    return (
      <div className="bg-socialPrimary w-full flex flex-col gap-5 rounded-lg">
        <div className="flex items-center gap-6 p-3 text-base font-semibold mobile-l:text-lg sm:p-5 sm:text-xl">
          <BackButton />
          <p>Notifications</p>
        </div>
        <p className="w-full py-24 text-center font-medium text-xl">
          An error occured.
        </p>
      </div>
    );
  }

  if (notifications) {
    return (
      <div className="bg-socialPrimary w-full flex flex-col gap-5 rounded-lg">
        <div className="flex items-center gap-6 p-3 text-base font-semibold mobile-l:text-lg sm:p-5 sm:text-xl">
          <BackButton />
          <p>Notifications</p>
          <button
            disabled={notifications.pages[0].data.length === 0}
            className="ml-auto group relative"
            onClick={() =>
              toggleOpenDialog(
                <AsyncConfirmationDialog
                  message="Are you sure you want to delete all notifications? This action cannot be undone."
                  header="Confirm wipe notifications"
                  confirmAction={deleteAllNotifs}
                  mutationKey={[`deleteAllNotifs-${uniqueMutationKey}`]}
                />
              )
            }
          >
            <Trash className="transition-colors group-disabled:stroke-gray-600 size-6 stroke-mainWhite group-hover:stroke-mainAccent" />
            <Circle className="fill-gray-700/20 group-disabled:hidden stroke-none size-[190%] group-hover:opacity-100 opacity-0 transition-opacity rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </button>
        </div>
        <div className="w-full flex flex-col">
          {notifications.pages[0].data.length === 0 ? (
            <p className="w-full py-24 text-center text-socialTextSecondary font-medium text-xl">
              No notifications.
            </p>
          ) : (
            notifications.pages.map((page) => (
              <Fragment key={page.page}>
                {page.data.map((notification) => (
                  <Notification
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </Fragment>
            ))
          )}
          <div ref={bottomPageRef}>
            {isFetchingNextPage &&
              Array.from({ length: 2 }).map((_, i) => (
                <NotificationSkeleton key={i} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}
