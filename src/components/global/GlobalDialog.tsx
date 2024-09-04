import { useGlobalStore } from "@/utils/stores/globalStore";
import {
  Dialog,
  DialogPanel,
} from "@headlessui/react";
import { useShallow } from "zustand/react/shallow";

export default function GlobalDialog() {
  const [isDialogOpen, dialogContent, toggleOpenDialog] = useGlobalStore(
    useShallow((state) => [
      state.isDialogOpen,
      state.dialogContent,
      state.toggleOpenDialog,
    ])
  );

  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => toggleOpenDialog(null)}
      className="relative z-[99999999]"
    >
      <div className="fixed inset-0 w-dvw bg-black/80"></div>
      <div className="fixed inset-0 grid place-items-center font-montserrat">
        <DialogPanel
          transition
          className="min-w-fit duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {dialogContent}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
