import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { TCollection } from "@/utils/types/social/social";
import { Forward, Settings } from "lucide-react";
import ManagePostDialog from "../../post/managePost/managePostDialog/ManagePostDialog";

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

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between w-full">
        <button
          className="group flex items-center gap-2"
          disabled={props.disabled}
        >
          <Settings className="size-4 mobile-l:size-5 transition-colors group-hover:stroke-mainAccent stroke-mainWhite group-disabled:stroke-gray-700" />
          <p className="group-hover:text-mainAccent transition-colors text-xs mobile-l:text-sm">
            Edit
          </p>
        </button>
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
          className="flex items-center gap-2 group"
        >
          <Forward className="size-4 mobile-l:size-5 transition-colors stroke-mainWhite group-hover:stroke-mainAccent group-disabled:stroke-gray-700" />
          <p className="transition-colors text-xs mobile-l:text-sm text-mainWhite group-hover:text-mainAccent group-disabled:text-gray-700">
            Share
          </p>
        </button>
      </div>
      <div className="w-full mt-4 h-[0.5px] bg-socialTextSecondary/40" />
    </div>
  );
}
