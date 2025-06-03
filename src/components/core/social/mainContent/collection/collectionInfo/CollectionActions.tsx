import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { TCollection } from "@/utils/types/social/social";
import { Forward, Plus } from "lucide-react";
import ManagePostDialog from "../../post/managePost/managePostDialog/ManagePostDialog";
import { useCurrentUser } from "@/services/auth/api/queries";
import { Navigate, useParams } from "@tanstack/react-router";
import AddCollectionItemDialog from "./addCollectionItemDialog/AddCollectionItemDialog";

type DisabledProps = {
  disabled: true;
};

type ActiveProps = {
  disabled: false;
  collection: TCollection;
};

type Props = DisabledProps | ActiveProps;

export default function CollectionActions(props: Props) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const setCollectionAttachment = useManagePostStore(
    (state) => state.setCollectionAttachment
  );
  const { data: currentUser } = useCurrentUser();
  const { userHandle } = useParams({
    from: "/_protected/social/$userHandle/collections/$collectionId/",
  });

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between w-full">
        <button
          onClick={() => {
            if (!props.disabled) {
              setCollectionAttachment(props.collection);
              toggleOpenDialog(
                <ManagePostDialog type="create" resetStateOnMount={false} />
              );
            }
          }}
          disabled={props.disabled}
          className="flex items-center gap-2 group py-2 pr-3"
        >
          <Forward className="size-4 mobile-m:size-5 transition-colors stroke-mainWhite group-hover:stroke-mainAccent group-disabled:stroke-gray-700" />
          <p className="transition-colors text-sm sm:text-md text-mainWhite group-hover:text-mainAccent group-disabled:text-gray-700">
            Share
          </p>
        </button>
        {currentUser.handle === userHandle && (
          <button
            onClick={() => toggleOpenDialog(<AddCollectionItemDialog />)}
            disabled={props.disabled}
            className="rounded-xl transition-colors flex items-center gap-2 py-2 group px-3 border border-mainAccent hover:bg-mainAccent disabled:border-gray-700 text-md"
          >
            <Plus className="group-hover:stroke-mainWhite group-disabled:stroke-gray-700 transition-colors stroke-mainAccent size-4" />
            <p className="group-hover:text-mainWhite group-disabled:text-gray-700 text-mainAccent transition-colors">
              Add Item
            </p>
          </button>
        )}
      </div>
      <div className="w-full mt-4 h-[0.5px] bg-socialTextSecondary/40" />
    </div>
  );
}
