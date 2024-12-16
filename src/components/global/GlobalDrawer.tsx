import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useGlobalStore } from "@/utils/stores/globalStore";
import { useShallow } from "zustand/react/shallow";

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
        <DrawerHeader className="hidden">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        {drawerContent}
      </DrawerContent>
    </Drawer>
  );
}
