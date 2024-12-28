import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/utils/stores/globalStore";
import { useMutationState } from "@tanstack/react-query";
import { LoaderCircle, X } from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import ErrorDialog from "./ErrorDialog";
import { MutationKey } from "@tanstack/react-query";

type DeleteConfirmationDialogProps = {
  nameOfResourceToDelete: string;
  deleteAction: () => void;
  mutationKey: MutationKey;
};

export default function DeleteConfirmationDialog({
  nameOfResourceToDelete,
  deleteAction,
  mutationKey,
}: DeleteConfirmationDialogProps) {
  const [toggleOpenDialog, toggleOpenDialogSecondary] = useGlobalStore(
    useShallow((state) => [
      state.toggleOpenDialog,
      state.toggleOpenDialogSecondary,
    ])
  );

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
    if (isDeleteSuccess) {
      toggleOpenDialog(null);
    }
    if (isDeleteError) {
      toggleOpenDialog(null);
      toggleOpenDialogSecondary(
        <ErrorDialog
          error={deleteError[0]}
          okButtonAction={() => toggleOpenDialogSecondary(null)}
        />
      );
    }
  }, [deleteStatus, deleteError]);

  return (
    <div className="flex flex-col gap-5 p-7 rounded-lg max-w-[580px] text-mainWhite bg-socialPrimary">
      <div className="relative">
        <p className="text-2xl font-bold">
          Delete this {nameOfResourceToDelete.toLowerCase()}?
        </p>
        <button
          onClick={() => toggleOpenDialog(null)}
          className="group absolute top-1/2 -translate-y-1/2 right-0 rounded-full p-2 border-[0.5px] border-socialTextSecondary"
        >
          <X className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
        </button>
      </div>
      <p className="mt-2">
        This will delete this {nameOfResourceToDelete.toLowerCase()}&nbsp;
        permanently. You cannot undo this action.
      </p>
      <div className="flex items-center justify-end gap-3 mt-3">
        <button
          onClick={() => toggleOpenDialog(null)}
          className="px-8 py-3 font-medium rounded-lg hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            await deleteAction();
          }}
          disabled={isDeleting}
          className="flex items-center gap-2 px-8 py-3 font-medium rounded-lg disabled:bg-mainAccent/60 bg-mainAccent hover:bg-fuchsia-700"
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
