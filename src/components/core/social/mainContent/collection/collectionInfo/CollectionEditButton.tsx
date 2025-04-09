import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { TCollection } from "@/utils/types/social/social";
import { Circle, Pencil, Settings, Trash } from "lucide-react";
import ManageCollectionDialog from "../manageCollectionDialog/ManageCollectionDialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useDeleteCollection } from "@/services/social/queries/socialQueries";
import { useParams } from "@tanstack/react-router";
import DeleteConfirmationDialog from "@/components/core/DeleteConfirmationDialog";

type Props = {
  collection: TCollection;
};

export default function CollectionEditButton({ collection }: Props) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const { collectionId, userHandle } = useParams({
    from: "/_protected/social/$userHandle/collections/$collectionId/",
  });
  const { mutateAsync: deleteCollection } = useDeleteCollection({
    collectionId,
    userHandle,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative w-min group">
        <Settings className="transition-colors size-6 stroke-mainWhite group-hover:stroke-mainAccent" />
        <Circle className="fill-gray-700/20 stroke-none size-[220%] group-hover:opacity-100 opacity-0 transition-opacity rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-[0.5px] p-[3px] w-[150px] border-socialTextSecondary/30 font-montserrat text-mainWhite bg-socialPrimary"
      >
        <DropdownMenuItem
          onClick={() =>
            toggleOpenDialog(
              <ManageCollectionDialog
                collectionToEdit={collection}
                type="edit"
              />
            )
          }
          className="flex items-center w-full gap-3 py-2 font-medium hover:cursor-pointer group hover:bg-gray-700"
        >
          <Pencil className="size-5 group-hover:fill-mainWhite" />
          <p>Edit</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            toggleOpenDialog(
              <DeleteConfirmationDialog
                nameOfResourceToDelete="collection"
                mutationKey={["deleteCollection", collectionId]}
                deleteAction={() =>
                  deleteCollection({ collectionId, userHandle })
                }
              />
            )
          }
          className="flex items-center w-full gap-3 py-2 font-medium hover:cursor-pointer group hover:bg-gray-700"
        >
          <Trash className="size-5 group-hover:fill-mainWhite" />
          <p>Delete</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
