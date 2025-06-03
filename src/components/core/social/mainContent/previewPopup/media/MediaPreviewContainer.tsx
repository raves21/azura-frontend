import { useState, useEffect, useRef, PropsWithChildren } from "react";
import { X, SquareArrowOutUpRight } from "lucide-react";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { useCurrentUser } from "@/services/auth/api/queries";
import { Link, LinkProps, Navigate } from "@tanstack/react-router";
import { MediaType } from "@/utils/types/shared";
import { toggleDialogOrDrawer } from "@/utils/functions/sharedFunctions";

type Props = {
  isSecondaryDialog?: boolean;
  mediaId: string;
  mediaType: MediaType;
} & PropsWithChildren;

export default function MediaPreviewContainer({
  children,
  isSecondaryDialog,
  mediaId,
  mediaType,
}: Props) {
  const { isTabletUp } = useWindowBreakpoints();
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [viewButtonWidth, setViewButtonWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewButtonRef = useRef<HTMLAnchorElement | null>(null);
  const { data: currentUser } = useCurrentUser();
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
      setContainerHeight(containerRef.current.getBoundingClientRect().height);
    }
    if (viewButtonRef.current) {
      setViewButtonWidth(viewButtonRef.current.getBoundingClientRect().height);
    }
  }, []);

  function closePopup() {
    toggleDialogOrDrawer({
      content: null,
      isTabletUp,
      isSecondaryDialog,
    });
  }

  let visitLinkProps: LinkProps;
  switch (mediaType) {
    case "ANIME":
      visitLinkProps = {
        to: "/anime/$animeId",
        params: {
          animeId: mediaId,
        },
      };
      break;
    case "MOVIE":
      visitLinkProps = {
        to: "/movie/$movieId",
        params: {
          movieId: mediaId,
        },
      };
      break;
    case "TV":
      visitLinkProps = {
        to: "/tv/$tvId",
        params: {
          tvId: mediaId,
        },
      };
      break;
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
      <div>
        <Link
          ref={viewButtonRef}
          {...visitLinkProps}
          onClick={closePopup}
          style={{
            marginLeft: isTabletUp
              ? containerWidth - viewButtonWidth - 40
              : containerWidth - viewButtonWidth - 66,
            marginTop: isTabletUp ? containerHeight - 30 : containerHeight - 55,
          }}
          className="z-30 flex drop-shadow-lg bg-blue-500 hover:bg-blue-600 items-center gap-2 py-2 px-4 rounded-xl group transition-colors fixed group"
        >
          <SquareArrowOutUpRight className="stroke-mainWhite size-4 transition-colors" />
          <p className="text-mainWhite transition-colors">View</p>
        </Link>
      </div>
      {children}
    </div>
  );
}
