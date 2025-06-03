import { useState, useEffect, useRef, PropsWithChildren } from "react";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { X, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { useCurrentUser } from "@/services/auth/api/queries";
import { Link, LinkProps, Navigate, useParams } from "@tanstack/react-router";
import AsyncConfirmationDialog from "@/components/core/shared/confirmationDialog/AsyncConfirmationDialog";
import { MutationKey } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import {
  closeAllPopups,
  toggleDialogOrDrawer,
} from "@/utils/functions/sharedFunctions";
import { Media } from "@/utils/types/social/social";
import { useShallow } from "zustand/react/shallow";

type Props = {
  isSecondaryDialog?: boolean;
  deleteAction: () => void;
  mutationKey: MutationKey;
  media: Media;
} & PropsWithChildren;

export default function CollectionItemPreviewContainer({
  children,
  isSecondaryDialog,
  deleteAction,
  mutationKey,
  media,
}: Props) {
  const { isTabletUp } = useWindowBreakpoints();
  const { userHandle } = useParams({
    from: "/_protected/social/$userHandle/collections/$collectionId/",
  });
  const { id: mediaId, type: mediaType } = media;
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [actionButtonsContainerWidth, setActionButtonsContainerWidth] =
    useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const actionButtonsContainerRef = useRef<HTMLDivElement | null>(null);
  const { data: currentUser } = useCurrentUser();
  const [toggleOpenDrawer, toggleOpenDialog, toggleOpenDialogSecondary] =
    useGlobalStore(
      useShallow((state) => [
        state.toggleOpenDrawer,
        state.toggleOpenDialog,
        state.toggleOpenDialogSecondary,
      ])
    );

  const { isTabletSmallUp } = useWindowBreakpoints();

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
      setContainerHeight(containerRef.current.getBoundingClientRect().height);
    }
    if (actionButtonsContainerRef.current) {
      setActionButtonsContainerWidth(
        actionButtonsContainerRef.current.getBoundingClientRect().width
      );
    }
  }, []);

  function closePopup() {
    toggleDialogOrDrawer({
      content: null,
      isTabletUp,
      isSecondaryDialog,
    });
  }

  if (!currentUser) return <Navigate to="/login" replace />;

  let visitLinkProps: LinkProps;
  switch (mediaType) {
    case "ANIME":
      visitLinkProps = {
        to: "/anime/$animeId",
        params: {
          animeId: mediaId,
        },
        search: {
          title: media.title,
          lang: "eng",
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
      {userHandle === currentUser.handle && (
        <div
          ref={actionButtonsContainerRef}
          style={{
            marginLeft: isTabletUp
              ? containerWidth - actionButtonsContainerWidth + 8
              : containerWidth - actionButtonsContainerWidth - 12,
            marginTop: isTabletUp ? containerHeight - 30 : containerHeight - 50,
          }}
          className="z-30 fixed flex items-center gap-4"
        >
          <Link
            {...visitLinkProps}
            onClick={closePopup}
            className={cn(
              "flex bg-blue-500 hover:bg-blue-600 items-center drop-shadow-lg gap-2 py-2 px-3 rounded-lg group transition-colors group"
            )}
          >
            <SquareArrowOutUpRight className="stroke-mainWhite size-4 transition-colors" />
            <p className="text-mainWhite transition-colors">View</p>
          </Link>
          <button
            onClick={() => {
              if (isTabletSmallUp) {
                toggleOpenDialogSecondary(
                  <AsyncConfirmationDialog
                    isSecondaryDialog={true}
                    confirmAction={deleteAction}
                    mutationKey={mutationKey}
                    header="Remove from collection?"
                    message="This will remove this item from this collection. This action cannot be undone."
                  />
                );
              } else {
                toggleOpenDrawer(null);
                toggleOpenDialog(
                  <AsyncConfirmationDialog
                    confirmAction={deleteAction}
                    mutationKey={mutationKey}
                    header="Remove from collection?"
                    afterConfirmSuccessAction={() => closeAllPopups()}
                    message="This will remove this item from this collection. This action cannot be undone."
                  />
                );
              }
            }}
            className="flex items-center gap-2 py-2 px-3 rounded-lg bg-red-500 hover:bg-red-600 text-md"
          >
            <Trash2 className="stroke-mainWhite size-4" />
            <p>Remove</p>
          </button>
        </div>
      )}
      {children}
    </div>
  );
}
