import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useShallow } from "zustand/react/shallow";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function GlobalSheet() {
  const [isSheetOpen, sheetContent, toggleOpenSheet] = useGlobalStore(
    useShallow((state) => [
      state.isSheetOpen,
      state.sheetContent,
      state.toggleOpenSheet,
    ])
  );

  return (
    <Sheet open={isSheetOpen} onOpenChange={toggleOpenSheet}>
      <SheetContent side="left" className="p-0 border-0 font-montserrat">
        <VisuallyHidden.Root>
          <SheetHeader className="hidden">
            <SheetTitle></SheetTitle>
          </SheetHeader>
        </VisuallyHidden.Root>
        {sheetContent}
      </SheetContent>
    </Sheet>
  );
}
