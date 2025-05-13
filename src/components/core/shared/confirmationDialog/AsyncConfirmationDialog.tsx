import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { LoaderCircle, X } from "lucide-react";
import ErrorDialog from "../ErrorDialog";
import { MutationKey } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { useHandleMutationState } from "@/utils/hooks/useHandleMutationState";
import {
  closeAllDialogs,
  replaceDialogContent,
} from "@/utils/functions/sharedFunctions";
import { useUniqueMutationKeyStore } from "@/utils/stores/useUniqueMutationKeyStore";

type Props = {
  confirmAction: () => void;
  afterConfirmSuccessAction?: () => void;
  mutationKey: MutationKey;
  disableCloseOnPending?: boolean;
  isSecondaryDialog?: boolean;
  header: string;
  message: string;
  confirmActionName?: string;
  confirmButtonColorMainAccent?: boolean;
};

export default function AsyncConfirmationDialog({
  confirmActionName,
  confirmAction,
  disableCloseOnPending = true,
  mutationKey,
  header,
  message,
  isSecondaryDialog,
  afterConfirmSuccessAction,
  confirmButtonColorMainAccent,
}: Props) {
  const [
    toggleOpenDialog,
    toggleOpenDialogSecondary,
    setIsDialogClickableOutside,
  ] = useGlobalStore(
    useShallow((state) => [
      state.toggleOpenDialog,
      state.toggleOpenDialogSecondary,
      state.setIsDialogClickableOutside,
    ])
  );

  const setUniqueMutationKey = useUniqueMutationKeyStore(
    (state) => state.setUniqueMutationKey
  );

  const { isPending: isConfirmPending } = useHandleMutationState({
    mutationKey,
    onPending: () => {
      if (disableCloseOnPending) {
        setIsDialogClickableOutside(false);
      }
    },
    onSuccess: () => {
      if (isSecondaryDialog) {
        toggleOpenDialogSecondary(null);
        if (afterConfirmSuccessAction) {
          afterConfirmSuccessAction();
        }
      } else {
        if (afterConfirmSuccessAction) {
          setIsDialogClickableOutside(true);
          afterConfirmSuccessAction();
        }
      }
      toggleOpenDialog(null);
      setUniqueMutationKey(crypto.randomUUID());
    },
    onError: (error) => {
      if (isSecondaryDialog) {
        replaceDialogContent({
          isSecondaryDialog: true,
          content: (
            <ErrorDialog
              error={error}
              okButtonAction={() => closeAllDialogs()}
            />
          ),
        });
      } else {
        setIsDialogClickableOutside(true);
        replaceDialogContent({ content: <ErrorDialog error={error} /> });
      }
      setUniqueMutationKey(crypto.randomUUID());
    },
  });

  return (
    <div className="flex flex-col gap-5 p-5 sm:p-7 rounded-lg max-w-[90dvw] mobile-l:max-w-[380px] sm:max-w-[450px] md:max-w-[580px] text-mainWhite bg-socialPrimary">
      <div className="relative">
        <p className="text-lg sm:text-xl md:text-2xl font-bold">{header}</p>
        <button
          disabled={isConfirmPending && disableCloseOnPending}
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
      <p className="text-sm sm:text-base mt-2">{message}</p>
      <div className="flex items-center justify-end gap-3 mt-3 text-sm sm:text-base">
        <button
          disabled={isConfirmPending && disableCloseOnPending}
          onClick={() =>
            isSecondaryDialog
              ? toggleOpenDialogSecondary(null)
              : toggleOpenDialog(null)
          }
          className="px-8 py-3 font-medium rounded-lg hover:bg-gray-700 disabled:text-gray-500 disabled:bg-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            await confirmAction();
          }}
          disabled={isConfirmPending}
          className={cn(
            "flex items-center gap-2 px-8 py-3 font-medium bg-red-500 rounded-lg disabled:bg-red-500/60 hover:bg-red-700",
            {
              "bg-mainAccent disabled:bg-mainAccent/60 hover:bg-fuchsia-700":
                confirmButtonColorMainAccent,
            }
          )}
        >
          <p className={cn({ "text-gray-400": isConfirmPending })}>
            {confirmActionName || "Confirm"}
          </p>
          {isConfirmPending && (
            <LoaderCircle className="group-disabled:stroke-gray-400 animate-spin size-[22px] stroke-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
}
