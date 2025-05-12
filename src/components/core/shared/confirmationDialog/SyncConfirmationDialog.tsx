import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { X } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

type Props = {
  header: string;
  message: string;
  confirmAction: () => void;
  confirmActionName?: string;
  isSecondaryDialog?: boolean;
};

export default function SyncConfirmationDialog({
  header,
  message,
  confirmAction,
  confirmActionName,
  isSecondaryDialog,
}: Props) {
  const [toggleOpenDialog, toggleOpenDialogSecondary] = useGlobalStore(
    useShallow((state) => [
      state.toggleOpenDialog,
      state.toggleOpenDialogSecondary,
    ])
  );

  return (
    <div className="flex flex-col gap-5 p-5 sm:p-7 rounded-lg max-w-[90dvw] mobile-l:max-w-[380px] sm:max-w-[450px] md:max-w-[580px] text-mainWhite bg-socialPrimary">
      <div className="relative">
        <p className="text-lg sm:text-xl md:text-2xl font-bold">{header}</p>
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
      <p className="text-sm sm:text-base mt-2">{message}</p>
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
          onClick={() => {
            confirmAction();
          }}
          className="flex items-center gap-2 px-8 py-3 font-medium bg-red-500 rounded-lg disabled:bg-red-500/60 hover:bg-red-700"
        >
          <p>{confirmActionName || "Confirm"}</p>
        </button>
      </div>
    </div>
  );
}
