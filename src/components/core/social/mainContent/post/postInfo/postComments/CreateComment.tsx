import { Circle, LoaderCircle, SendHorizonal, Smile } from "lucide-react";
import UserAvatar from "@/components/core/social/shared/UserAvatar";
import { EntityOwner } from "@/utils/types/social/shared";
import { useCreatePostComment } from "@/services/social/api/mutations";
import { Navigate, useParams } from "@tanstack/react-router";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/services/auth/api/queries";
import { useState } from "react";
import { AutosizeTextarea } from "@/components/ui/autosize-text-area";

type Props = {
  author: EntityOwner;
  isFloatingCommentBar: boolean;
};

export default function CreateComment({ author, isFloatingCommentBar }: Props) {
  const { data: currentUser } = useCurrentUser();

  const { postId } = useParams({
    from: "/_protected/social/$userHandle/posts/$postId/",
  });

  const { isMobileMediumUp } = useWindowBreakpoints();

  const [commentText, setCommentText] = useState("");

  const { mutateAsync: createComment, status: createCommentStatus } =
    useCreatePostComment();

  if (!currentUser) return <Navigate to="/login" replace />;

  const isSendingComment = createCommentStatus === "pending";

  async function handleCreateComment(inputText: string) {
    await createComment({ content: inputText.trim(), postId });
    setCommentText("");
  }

  return (
    <div
      className={cn("relative flex items-start gap-2 px-3 mobile-m:px-5", {
        "px-1 mobile-m:px-2": isFloatingCommentBar,
      })}
    >
      <UserAvatar
        linkProps={{
          to: "/social/$userHandle",
          params: {
            userHandle: currentUser.handle,
          },
        }}
        src={author.avatar ?? "/no-image-2.jpg"}
        className="hidden sm:block"
      />
      <div className="relative flex items-end w-full mr-10 mobile-m:mr-0">
        <div className="w-full">
          <AutosizeTextarea
            value={commentText}
            onChange={(e) => setCommentText(e.currentTarget.value)}
            placeholder="Write a comment...."
            maxHeight={200}
            maxLength={200}
            className="min-w-full py-2 pl-4 pr-8 text-sm border md:pr-12 mobile-l:text-base rounded-2xl bg-transparent border-socialTextSecondary/50 lg:border-socialTextSecondary/80"
          />
          <button className="absolute top-2 right-3 group">
            <Smile className="size-6 stroke-socialTextSecondary group-hover:stroke-gray-400" />
          </button>
        </div>
      </div>
      {isMobileMediumUp ? (
        <button
          onClick={async () => await handleCreateComment(commentText!)}
          disabled={!commentText || isSendingComment}
          className="px-4 py-2 flex items-center gap-2 disabled:bg-mainAccent/50 transition-colors group disabled:text-gray-400 mt-[2px] text-sm font-medium rounded-full bg-mainAccent"
        >
          <p>Send</p>
          {isSendingComment && (
            <LoaderCircle className="group-disabled:stroke-gray-400 animate-spin size-5 stroke-mainWhite" />
          )}
        </button>
      ) : (
        <button
          onClick={async () => await handleCreateComment(commentText!)}
          disabled={!commentText || isSendingComment}
          className="absolute grid right-2 group place-items-center top-1"
        >
          {isSendingComment ? (
            <LoaderCircle className="group-disabled:stroke-mainAccent/50 animate-spin size-8 stroke-mainAccent" />
          ) : (
            <>
              <SendHorizonal className="z-10 transition-colors stroke-none size-8 group-disabled:fill-mainAccent/50 fill-mainAccent" />
              <Circle className="absolute inset-0 transition-opacity -translate-y-1/2 left-1/2 top-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 stroke-none group-disabled:hidden fill-gray-700 size-[150%]" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
