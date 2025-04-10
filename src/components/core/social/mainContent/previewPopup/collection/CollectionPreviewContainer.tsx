import { useState, useEffect, useRef, PropsWithChildren } from "react";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useShallow } from "zustand/react/shallow";
import { X, SquareArrowOutUpRight } from "lucide-react";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { Link, Navigate } from "@tanstack/react-router";

type Props = {
  isSecondaryDialog?: boolean;
  collectionId: string;
  collectionOwnerHandle: string;
} & PropsWithChildren;

export default function CollectionPreviewContainer({
  children,
  isSecondaryDialog,
  collectionId,
  collectionOwnerHandle,
}: Props) {
  const { isTabletUp } = useWindowBreakpoints();
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentUser = useAuthStore((state) => state.currentUser);
  const [toggleOpenDialog, toggleOpenDialogSecondary, toggleOpenDrawer] =
    useGlobalStore(
      useShallow((state) => [
        state.toggleOpenDialog,
        state.toggleOpenDialogSecondary,
        state.toggleOpenDrawer,
      ])
    );
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }
  }, []);

  function closePopup() {
    if (isTabletUp) {
      isSecondaryDialog
        ? toggleOpenDialogSecondary(null)
        : toggleOpenDialog(null);
    } else {
      toggleOpenDrawer(null);
    }
  }

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div
      ref={containerRef}
      className="text-gray-300 overflow-y-auto aspect-[5/4] flex flex-col relative h-[550px] rounded-lg bg-gray-950"
    >
      <button
        onClick={closePopup}
        style={{
          marginLeft: !isTabletUp ? containerWidth - 40 : containerWidth - 10,
          marginTop: 12,
        }}
        className="fixed z-30 group"
      >
        <div className="absolute bg-mainAccent/20 group-hover:opacity-100 transition-opacity opacity-0 size-[150%] rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2" />
        <X className="transition-colors size-8 stroke-mainWhite group-hover:stroke-mainAccent" />
      </button>
      <Link
        to="/social/$userHandle/collections/$collectionId"
        params={{
          collectionId,
          userHandle: collectionOwnerHandle,
        }}
        onClick={closePopup}
        className="z-30 flex items-center drop-shadow-lg gap-2 py-2 px-3 rounded-lg group transition-colors absolute group top-[14px] left-[14px] bg-blue-500 hover:bg-blue-600"
      >
        <SquareArrowOutUpRight className="stroke-mainWhite size-4 transition-colors" />
        <p className="text-mainWhite transition-colors">View</p>
      </Link>
      {children}
    </div>
  );
}
