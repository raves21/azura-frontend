import PostComment from "./PostComment";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { Navigate, useParams } from "@tanstack/react-router";
import { usePostComments } from "@/services/social/queries/socialQueries";
import PostCommentsSkeleton from "@/components/shared/loadingSkeletons/social/PostCommentsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";
import CreateComment from "./CreateComment";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";

export default function PostComments() {
  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;

  const { postId } = useParams({
    from: "/_protected/social/$userHandle/posts/$postId/",
  });

  const {
    data: comments,
    isLoading: isCommentsLoading,
    error: commentsError,
    isFetchingNextPage,
    fetchNextPage,
  } = usePostComments(postId);

  const { isDesktopSmall } = useWindowBreakpoints();

  const ref = useFetchNextPageInView(fetchNextPage);

  let renderedResult: ReactNode;

  if (isCommentsLoading) {
    renderedResult = (
      <>
        <div className="flex items-center w-full gap-3 px-5">
          <Skeleton className="bg-gray-700 rounded-full size-[38px]" />
          <Skeleton className="flex-grow h-8 mr-12 bg-gray-700 rounded-2xl" />
        </div>
        <PostCommentsSkeleton />
      </>
    );
  }

  if (commentsError) {
    renderedResult = (
      <div className="w-full h-[200px] text-center font-medium text-lg grid place-items-center">
        An error occured while fetching the comments.
      </div>
    );
  }

  if (comments) {
    if (comments.pages[0].data.length === 0) {
      renderedResult = isDesktopSmall && (
        <div className="w-full pb-5">
          <CreateComment isFloatingCommentBar={false} author={currentUser} />
        </div>
      );
    } else {
      renderedResult = (
        <>
          {isDesktopSmall && (
            <CreateComment isFloatingCommentBar={false} author={currentUser} />
          )}
          <div className="flex flex-col gap-2 pt-2">
            {comments.pages.map((page) =>
              page.data.map((comment) => (
                <PostComment comment={comment} key={comment.id} />
              ))
            )}
            {comments.pages.length !== 0 &&
              comments.pages[0].data.length !== 0 && (
                <div ref={ref} className="w-full">
                  {isFetchingNextPage && <PostCommentsSkeleton />}
                </div>
              )}
          </div>
        </>
      );
    }
  }

  return (
    <div className="flex flex-col w-full gap-2 text-sm">{renderedResult}</div>
  );
}
