import BackButton from "@/components/shared/BackButton";
import PostComments from "@/components/shared/social/mainContent/post/postInfo/postComments/PostComments";
import PostInfo from "@/components/shared/social/mainContent/post/postInfo/PostInfo";
import {
  createFileRoute,
  LinkProps,
  useRouterState,
} from "@tanstack/react-router";
import { tempPosts } from "@/utils/variables/temp";

export const Route = createFileRoute(
  "/_protected/social/$userName/post/$postId/"
)({
  component: () => <PostInfoPage />,
});

function PostInfoPage() {
  let linkProps: LinkProps;
  const { postInfoState } = useRouterState({ select: (s) => s.location.state });

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
      to: "/social/$userName",
      params: {
        userName: "elonmusk",
      },
    };
  }

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
        <PostInfo post={tempPosts[1]} />
      </div>
      <PostComments />
    </div>
  );
}
