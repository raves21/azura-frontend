import ErrorDialog from "@/components/core/shared/ErrorDialog";
import GlobalDialogHeader from "@/components/global/shared/GlobalDialogHeader";
import GlobalDialogHeaderCloseButton from "@/components/global/shared/GlobalDialogHeaderCloseButton";
import GlobalDialogHeaderTitle from "@/components/global/shared/GlobalDialogHeaderTitle";
import { useToast } from "@/components/ui/use-toast";
import { useEditPostComment } from "@/services/social/queries/socialQueries";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { TPostComment } from "@/utils/types/social/social";
import { Textarea } from "@headlessui/react";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

type Props = {
  comment: TPostComment;
};

export default function EditPostCommentDialog({ comment }: Props) {
  const [toggleOpenDialog, toggleOpenDialogSecondary] = useGlobalStore(
    useShallow((state) => [
      state.toggleOpenDialog,
      state.toggleOpenDialogSecondary,
    ])
  );

  const [editCommentText, setEditCommentText] = useState(comment.content);

  const { mutateAsync: editComment, isPending: isEditingComment } =
    useEditPostComment(comment.id);

  const { toast } = useToast();

  async function onSubmit(updatedComment: string) {
    try {
      if (comment.content !== updatedComment) {
        await editComment({
          commentId: comment.id,
          postId: comment.postId,
          content: updatedComment.trim(),
        });
        toast({ description: "Successfully edited comment." });
      }
      toggleOpenDialog(null);
    } catch (error) {
      toggleOpenDialogSecondary(
        <ErrorDialog
          error={error}
          okButtonAction={() => toggleOpenDialogSecondary(null)}
        />
      );
    }
  }

  return (
    <div className="h-[370px] w-[95dvw] sm:w-[500px] bg-socialPrimary rounded-lg flex flex-col text-mainWhite">
      <GlobalDialogHeader>
        <GlobalDialogHeaderTitle>Edit Comment</GlobalDialogHeaderTitle>
        <GlobalDialogHeaderCloseButton onClick={() => toggleOpenDialog(null)} />
      </GlobalDialogHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(editCommentText);
        }}
        className="flex-grow flex flex-col p-4"
      >
        <Textarea
          value={editCommentText}
          disabled={isEditingComment}
          onChange={(e) => setEditCommentText(e.target.value)}
          className="rounded-lg p-3 bg-gray-700 focus:outline-none resize-none mb-4 flex-grow bg-transparent border-[0.5px] border-socialTextSecondary"
          placeholder="Edit comment..."
        />
        <button
          type="submit"
          disabled={isEditingComment || !editCommentText.trim()}
          className="rounded-lg bg-mainAccent py-2 font-medium flex justify-center items-center gap-2 disabled:bg-fuchsia-700 disabled:text-gray-400"
        >
          <p>{isEditingComment ? "Updating..." : "Save"}</p>
          {isEditingComment && (
            <LoaderCircle className="group-disabled:stroke-gray-400 animate-spin size-[22px] stroke-gray-400" />
          )}
        </button>
      </form>
    </div>
  );
}
