import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { TCollection } from "@/utils/types/social/social";
import { Circle, Pencil } from "lucide-react";
import ManageCollectionDialog from "../manageCollectionDialog/ManageCollectionDialog";

type Props = {
  collection: TCollection;
};

export default function CollectionEditButton({ collection }: Props) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  return (
    <button
      onClick={() =>
        toggleOpenDialog(
          <ManageCollectionDialog collectionToEdit={collection} type="edit" />
        )
      }
      className="relative w-min group"
    >
      <Pencil className="transition-colors size-6 stroke-mainWhite group-hover:stroke-mainAccent" />
      <Circle className="fill-gray-700/20 stroke-none size-[220%] group-hover:opacity-100 opacity-0 transition-opacity rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </button>
  );
}
