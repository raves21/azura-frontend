import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useMutationState } from "@tanstack/react-query";
import { LoaderCircle, X } from "lucide-react";
import { useEffect } from "react";
import ErrorDialog from "./ErrorDialog";
import { MutationKey } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { LinkProps, useRouter } from "@tanstack/react-router";

type Props = {
  nameOfResourceToDelete: string;
  deleteAction: () => void;
  shouldNavigateBackOnSuccess?: boolean;
  onSuccessNavigationFallbackRoute?: LinkProps;
  mutationKey: MutationKey;
  isSecondaryDialog?: boolean;
  customHeader?: string;
  customMessage?: string;
};

export default function DeleteConfirmationDialog({
  nameOfResourceToDelete,
  deleteAction,
  mutationKey,
  customHeader,
  customMessage,
  isSecondaryDialog,
  shouldNavigateBackOnSuccess,
  onSuccessNavigationFallbackRoute,
}: Props) {
  const [toggleOpenDialog, toggleOpenDialogSecondary] = useGlobalStore(
    useShallow((state) => [
      state.toggleOpenDialog,
      state.toggleOpenDialogSecondary,
    ])
  );

  const router = useRouter();

  const deleteStatus = useMutationState({
    filters: { mutationKey },
    select: (mutation) => mutation.state.status,
  });

  const deleteError = useMutationState({
    filters: { mutationKey },
    select: (mutation) => mutation.state.error,
  });

  const isDeleting = deleteStatus[0] === "pending";
  const isDeleteSuccess = deleteStatus[0] === "success";
  const isDeleteError = deleteStatus[0] === "error" && !!deleteError[0];

  useEffect(() => {
    if (isSecondaryDialog) {
      if (isDeleteSuccess) {
        toggleOpenDialogSecondary(null);
        toggleOpenDialog(null);
        if (shouldNavigateBackOnSuccess) {
          if (router.state) {
            router.history.go(-1);
          } else {
            onSuccessNavigationFallbackRoute
              ? router.navigate(onSuccessNavigationFallbackRoute)
              : router.navigate({ to: "/social" });
          }
        }
      }
      if (isDeleteError) {
        toggleOpenDialogSecondary(null);
        setTimeout(() => {
          toggleOpenDialogSecondary(
            <ErrorDialog
              error={deleteError[0]}
              okButtonAction={() => {
                toggleOpenDialogSecondary(null);
                toggleOpenDialog(null);
              }}
            />
          );
        }, 180);
      }
    } else {
      if (isDeleteSuccess) {
        toggleOpenDialog(null);
        if (shouldNavigateBackOnSuccess) {
          if (router.state) {
            router.history.go(-1);
          } else {
            onSuccessNavigationFallbackRoute
              ? router.navigate(onSuccessNavigationFallbackRoute)
              : router.navigate({ to: "/social" });
          }
        }
      }
      if (isDeleteError) {
        toggleOpenDialog(null);
        setTimeout(() => {
          toggleOpenDialog(<ErrorDialog error={deleteError[0]} />);
        }, 180);
      }
    }
  }, [
    deleteStatus,
    deleteError,
    isSecondaryDialog,
    isDeleteError,
    isDeleteSuccess,
  ]);

  return (
    <div className="flex flex-col gap-5 p-5 sm:p-7 rounded-lg max-w-[90dvw] mobile-l:max-w-[380px] sm:max-w-[450px] md:max-w-[580px] text-mainWhite bg-socialPrimary">
      <div className="relative">
        <p className="text-lg sm:text-xl md:text-2xl font-bold">
          {customHeader ||
            `Delete this ${nameOfResourceToDelete.toLowerCase()}?`}
        </p>
        <button
          onClick={() =>
            isSecondaryDialog
              ? toggleOpenDialogSecondary(null)
              : toggleOpenDialog(null)
          }
          className="group absolute top-1/2 -translate-y-1/2 right-0 rounded-full p-2 border-[0.5px] border-socialTextSecondary"
        >
          <X className="transition-colors size-4 sm:size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
        </button>
      </div>
      <p className="text-sm sm:text-base mt-2">
        {customMessage ||
          `This will delete this ${nameOfResourceToDelete.toLowerCase() + " "}
        permanently. You cannot undo this action.`}
      </p>
      <div className="flex items-center justify-end gap-3 mt-3 text-sm sm:text-base">
        <button
          onClick={() =>
            isSecondaryDialog
              ? toggleOpenDialogSecondary(null)
              : toggleOpenDialog(null)
          }
          className="px-8 py-3 font-medium rounded-lg hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            await deleteAction();
          }}
          disabled={isDeleting}
          className="flex items-center gap-2 px-8 py-3 font-medium bg-red-500 rounded-lg disabled:bg-red-500/60 hover:bg-red-700"
        >
          <p className={cn({ "text-gray-400": isDeleting })}>Delete</p>
          {isDeleting && (
            <LoaderCircle className="group-disabled:stroke-gray-400 animate-spin size-[22px] stroke-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
}
