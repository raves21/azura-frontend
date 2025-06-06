import BackButton from "@/components/core/shared/BackButton";
import PostComments from "@/components/core/social/mainContent/post/postInfo/postComments/PostComments";
import PostInfo from "@/components/core/social/mainContent/post/postInfo/PostInfo";
import {
  createFileRoute,
  LinkProps,
  Navigate,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import PostInfoSkeleton from "@/components/core/loadingSkeletons/social/PostInfoSkeleton";
import { usePostInfo } from "@/services/social/api/queries";
import { useCurrentUser } from "@/services/auth/api/queries";

export const Route = createFileRoute(
  "/_protected/social/$userHandle/posts/$postId/"
)({
  component: () => <PostInfoPage />,
});

function PostInfoPage() {
  const { postId, userHandle } = Route.useParams();

  const { data: currentUser } = useCurrentUser();
  const {
    data: postInfo,
    isLoading: isPostInfoLoading,
    error: postInfoError,
  } = usePostInfo(postId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let linkProps: LinkProps;
  const { postInfoState } = useRouterState({ select: (s) => s.location.state });

  if (!currentUser) return <Navigate to="/login" replace />;

  if (!postInfoState || (postInfoState && postInfoState.from === "home-page")) {
    linkProps = {
      to: "/social",
    };
  } else if (postInfoState.from === "search-page") {
    linkProps = {
      to: "/social/search/posts",
    };
  } else {
    linkProps = {
      to: "/social/$userHandle",
      params: {
        userHandle,
      },
    };
  }

  if (isPostInfoLoading) {
    return <PostInfoSkeleton linkProps={linkProps} withAttachment={false} />;
  }

  if (postInfoError) {
    return (
      <div className="flex flex-col w-full gap-2 mb-24 overflow-hidden text-base rounded-lg bg-socialPrimary">
        <div className="flex flex-col w-full gap-8 px-3 py-4 sm:p-5">
          <div className="flex items-center gap-4 mobile-l:gap-5">
            <BackButton
              arrowIconClassName="size-6 mobile-m:size-[26px]"
              linkProps={linkProps}
            />
            <p className="text-base font-semibold mobile-m:text-lg">Post</p>
          </div>
          <div className="w-full h-[400px] text-center font-medium text-lg grid place-items-center">
            An error occured while fetching this post.
          </div>
        </div>
      </div>
    );
  }

  if (postInfo) {
    return (
      <div className="flex flex-col w-full gap-2 mb-40 overflow-hidden text-base rounded-lg bg-socialPrimary">
        <div className="flex flex-col w-full gap-8 px-3 py-4 sm:p-5">
          <div className="flex items-center gap-4 mobile-l:gap-5">
            <BackButton
              arrowIconClassName="size-6 mobile-m:size-[26px]"
              linkProps={linkProps}
            />
            <p className="text-base font-semibold mobile-m:text-lg">Post</p>
          </div>
          <PostInfo post={postInfo} />
        </div>
        <PostComments />
      </div>
    );
  }
}
