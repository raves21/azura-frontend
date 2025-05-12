import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useShallow } from "zustand/react/shallow";

export default function GlobalDialog() {
  const [
    isDialogOpen,
    dialogContent,
    toggleOpenDialog,
    isDialogClickableOutside,
  ] = useGlobalStore(
    useShallow((state) => [
      state.isDialogOpen,
      state.dialogContent,
      state.toggleOpenDialog,
      state.isDialogClickableOutside,
    ])
  );

  return (
    <Dialog
      open={isDialogOpen}
      onClose={
        isDialogClickableOutside ? () => toggleOpenDialog(null) : () => {}
      }
      className="relative z-[200]"
    >
      <div className="fixed font-montserrat inset-0 grid place-items-center w-dvw overflow-x-hidden hide-scrollbar overflow-y-auto bg-black/85 backdrop-blur-[1px]">
        <DialogPanel
          transition
          className="duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 overflow-y-auto"
        >
          {dialogContent}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
