import ErrorDialog from "@/components/core/shared/ErrorDialog";
import {
  useMediaExistenceInCollection,
  useAddCollectionItem,
} from "@/services/social/queries/socialQueries";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { Media } from "@/utils/types/social/social";
import { Navigate, useParams } from "@tanstack/react-router";
import { Plus, LoaderCircle } from "lucide-react";
import {
  ButtonHTMLAttributes,
  forwardRef,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useShallow } from "zustand/react/shallow";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  media: Media;
};

const AddToCollectionButton = forwardRef<HTMLButtonElement, Props>(
  ({ media, ...props }, ref) => {
    const { collectionId } = useParams({
      from: "/_protected/social/$userHandle/collections/$collectionId/",
    });
    const {
      data: mediaExistenceInCollection,
      status: mediaExistenceInCollectionStatus,
    } = useMediaExistenceInCollection({
      collectionId,
      mediaId: media.id,
      mediaType: media.type,
    });

    const { mutateAsync: addCollectionItem, status: addCollectionItemStatus } =
      useAddCollectionItem();

    const [toggleOpenDialogSecondary, toggleOpenDrawer] = useGlobalStore(
      useShallow((state) => [
        state.toggleOpenDialogSecondary,
        state.toggleOpenDrawer,
      ])
    );
    const { isTabletUp } = useWindowBreakpoints();
    const [buttonContent, setButtonContent] = useState<ReactNode | null>(null);
    const currentUser = useAuthStore((state) => state.currentUser);

    const alreadyExistsInCollection =
      mediaExistenceInCollection &&
      mediaExistenceInCollection.doesGivenMediaExist === true;

    useEffect(() => {
      if (mediaExistenceInCollection) {
        if (!alreadyExistsInCollection) {
          setButtonContent(
            <>
              <Plus className="stroke-mainWhite size-5 transition-colors" />
              <p className="text-mainWhite transition-colors">
                Add to collection
              </p>
            </>
          );
        } else {
          setButtonContent(
            <>
              <p className="text-mainWhite transition-colors">
                Already exists in collection
              </p>
            </>
          );
        }
      } else if (mediaExistenceInCollectionStatus === "pending") {
        setButtonContent(
          <>
            <LoaderCircle className="stroke-mainWhite size-5 transition-colors animate-spin" />
            <p className="text-mainWhite transition-colors">Loading...</p>
          </>
        );
      } else {
        setButtonContent(
          <>
            <p className="text-mainWhite transition-colors">
              An error occured!
            </p>
          </>
        );
      }
    }, [mediaExistenceInCollection, mediaExistenceInCollectionStatus]);

    useEffect(() => {
      if (addCollectionItemStatus === "pending") {
        setButtonContent(
          <>
            <LoaderCircle className="stroke-mainWhite size-5 transition-colors animate-spin" />
            <p className="text-mainWhite transition-colors">
              Adding to collection...
            </p>
          </>
        );
      }
      if (addCollectionItemStatus === "error") {
        if (isTabletUp) {
          toggleOpenDialogSecondary(null);
          setTimeout(() => {
            toggleOpenDialogSecondary(
              <ErrorDialog
                error={new Error("An error occured.")}
                okButtonAction={() => toggleOpenDialogSecondary(null)}
              />
            );
          }, 150);
        } else {
          toggleOpenDrawer(null);
          setTimeout(() => {
            toggleOpenDialogSecondary(
              <ErrorDialog
                error={new Error("An error occured.")}
                okButtonAction={() => toggleOpenDialogSecondary(null)}
              />
            );
          }, 150);
        }
      }
      if (addCollectionItemStatus === "success") {
        if (isTabletUp) {
          toggleOpenDialogSecondary(null);
        } else {
          toggleOpenDrawer(null);
        }
      }
    }, [addCollectionItemStatus]);

    if (!currentUser) return <Navigate to="/login" replace />;

    return (
      <button
        ref={ref}
        {...props}
        onClick={async () => {
          await addCollectionItem({
            collectionId,
            currentUserHandle: currentUser.handle,
            media,
          });
        }}
        disabled={
          mediaExistenceInCollectionStatus === "pending" ||
          mediaExistenceInCollectionStatus === "error" ||
          addCollectionItemStatus === "error" ||
          addCollectionItemStatus === "pending" ||
          alreadyExistsInCollection
        }
        className="z-30 flex drop-shadow-lg font-medium justify-center disabled:bg-gray-600 bg-mainAccent hover:bg-fuchsia-700 items-center gap-6 py-2 px-4 rounded-lg group transition-colors fixed group"
      >
        {buttonContent}
      </button>
    );
  }
);

export default AddToCollectionButton;
