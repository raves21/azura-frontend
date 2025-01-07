import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useShallow } from "zustand/react/shallow";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function GlobalDrawer() {
  const [toggleOpenDrawer, isDrawerOpen, drawerContent] = useGlobalStore(
    useShallow((state) => [
      state.toggleOpenDrawer,
      state.isDrawerOpen,
      state.drawerContent,
    ])
  );

  return (
    <Drawer open={isDrawerOpen} onOpenChange={toggleOpenDrawer}>
      <DrawerContent className="bg-gray-800 font-montserrat">
        <VisuallyHidden.Root>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
        </VisuallyHidden.Root>
        {drawerContent}
      </DrawerContent>
    </Drawer>
  );
}
