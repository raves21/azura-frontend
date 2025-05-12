import { useState, useEffect, useRef, PropsWithChildren } from "react";
import { X } from "lucide-react";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { useCurrentUser } from "@/services/auth/authQueries";
import { Navigate } from "@tanstack/react-router";
import { Media } from "@/utils/types/social/social";
import AddToCollectionButton from "./AddToCollectionButton";
import { toggleDialogOrDrawer } from "@/utils/functions/sharedFunctions";

type Props = {
  media: Media;
} & PropsWithChildren;

export default function AddCollectionItemMediaPreviewContainer({
  children,
  media,
}: Props) {
  const { isTabletUp } = useWindowBreakpoints();
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data: currentUser } = useCurrentUser();

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
      setContainerHeight(containerRef.current.getBoundingClientRect().height);
    }
  }, []);

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div
      ref={containerRef}
      className="text-gray-300 overflow-y-auto aspect-[5/4] flex flex-col relative h-[550px] rounded-lg bg-gray-950"
    >
      <button
        onClick={() =>
          toggleDialogOrDrawer({
            content: null,
            isTabletUp,
            isSecondaryDialog: true,
          })
        }
        style={{
          marginLeft: !isTabletUp ? containerWidth - 40 : containerWidth - 10,
          marginTop: 12,
        }}
        className="fixed z-30 group"
      >
        <div className="absolute bg-mainAccent/20 group-hover:opacity-100 transition-opacity opacity-0 size-[150%] rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2" />
        <X className="transition-colors size-8 stroke-mainWhite group-hover:stroke-mainAccent" />
      </button>
      <div>
        <AddToCollectionButton
          media={media}
          style={{
            width: containerWidth - 16,
            marginLeft: isTabletUp ? 24 : 8,
            marginTop: isTabletUp ? containerHeight - 30 : containerHeight - 55,
          }}
        />
      </div>
      {children}
    </div>
  );
}
