import { useState, useEffect, useRef, PropsWithChildren } from "react";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useShallow } from "zustand/react/shallow";
import { X, SquareArrowOutUpRight } from "lucide-react";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";

export default function PreviewContainer({ children }: PropsWithChildren) {
  const { isTablet } = useWindowBreakpoints();
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [toggleOpenDialog, toggleOpenDrawer] = useGlobalStore(
    useShallow((state) => [state.toggleOpenDialog, state.toggleOpenDrawer])
  );
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }
  }, []);

  function closePopup() {
    if (isTablet) {
      toggleOpenDialog(null);
    } else {
      toggleOpenDrawer(null);
    }
  }
  return (
    <div
      ref={containerRef}
      className="text-gray-300 overflow-y-auto aspect-[5/4] flex flex-col relative h-[550px] rounded-lg bg-gray-950"
    >
      <button
        onClick={closePopup}
        style={{
          marginLeft: !isTablet ? containerWidth - 40 : containerWidth - 10,
          marginTop: 12,
        }}
        className="fixed z-30 group"
      >
        <div className="absolute bg-mainAccent/20 group-hover:opacity-100 transition-opacity opacity-0 size-[150%] rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2" />
        <X className="transition-colors size-8 stroke-mainWhite group-hover:stroke-mainAccent" />
      </button>
      <button className="absolute z-30 group top-4 left-4">
        <div className="absolute bg-mainAccent/20 group-hover:opacity-100 transition-opacity opacity-0 size-[180%] rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2" />
        <SquareArrowOutUpRight className="transition-colors size-7 stroke-mainWhite group-hover:stroke-mainAccent" />
      </button>
      {children}
    </div>
  );
}
