import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useShallow } from "zustand/react/shallow";

export default function GlobalDialogSecondary() {
  const [
    isDialogSecondaryOpen,
    dialogSecondaryContent,
    toggleOpenDialogSecondary,
  ] = useGlobalStore(
    useShallow((state) => [
      state.isDialogSecondaryOpen,
      state.dialogSecondaryContent,
      state.toggleOpenDialogSecondary,
    ])
  );

  return (
    <Dialog
      open={isDialogSecondaryOpen}
      onClose={() => toggleOpenDialogSecondary(null)}
      className="relative z-[300]"
    >
      <div className="fixed inset-0 grid overflow-x-hidden overflow-y-auto bg-black/85 font-montserrat place-items-center w-dvw hide-scrollbar backdrop-blur-[1px]">
        <DialogPanel
          transition
          className="duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {dialogSecondaryContent}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
