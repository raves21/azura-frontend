import { TPostComment } from "@/utils/types/social/social";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Circle, Ellipsis, Pencil, Trash } from "lucide-react";
import { useDeletePostComment } from "@/services/social/api/mutations";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import AsyncConfirmationDialog from "@/components/core/shared/confirmationDialog/AsyncConfirmationDialog";
import EditPostCommentDialog from "./EditPostCommentDialog";
import { useCurrentUser } from "@/services/auth/api/queries";
import { Navigate } from "@tanstack/react-router";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  comment: TPostComment;
};

export default function PostCommentOptionsDropdown({ comment }: Props) {
  const { mutateAsync: deleteComment } = useDeletePostComment(comment.id);

  const { toast } = useToast();

  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  const { data: currentUser } = useCurrentUser();

  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative self-start group size-6"
      >
        <Ellipsis className="absolute z-10 -translate-x-1/2 -translate-y-1/2 size-6 top-1/2 left-1/2 stroke-gray-500 group-hover:stroke-mainAccent" />
        <Circle className="absolute top-1/2 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1/2 left-1/2 -translate-x-1/2 size-[200%] rounded-full stroke-none fill-gray-700/50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-[0.5px] p-[3px] w-[150px] border-socialTextSecondary/30 font-montserrat text-mainWhite bg-socialPrimary"
      >
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            toggleOpenDialog(<EditPostCommentDialog comment={comment} />);
          }}
          className="flex items-center w-full gap-3 py-2 font-medium hover:cursor-pointer group hover:bg-gray-700"
        >
          <Pencil className="size-5 group-hover:fill-mainWhite" />
          <p>Edit</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            toggleOpenDialog(
              <AsyncConfirmationDialog
                mutationKey={["deleteComment", comment.id]}
                confirmAction={() =>
                  deleteComment({
                    commentId: comment.id,
                    postId: comment.postId,
                  })
                }
                afterConfirmSuccessAction={() =>
                  toast({ description: "Successfully deleted comment." })
                }
                confirmActionName="Delete"
                header="Delete this comment?"
                message="This will delete this comment permanently. You cannot undo this action."
              />
            );
          }}
          className="flex items-center w-full gap-3 py-2 font-medium hover:cursor-pointer group hover:bg-gray-700"
        >
          <Trash className="size-5 group-hover:fill-mainWhite" />
          <p>Delete</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
