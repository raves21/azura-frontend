import BackButton from "@/components/shared/BackButton";
import PostComments from "@/components/shared/social/mainContent/post/postInfo/postComments/PostComments";
import PostInfo from "@/components/shared/social/mainContent/post/postInfo/PostInfo";
import {
  createFileRoute,
  LinkProps,
  useRouterState,
} from "@tanstack/react-router";

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
    <div className="flex flex-col w-full gap-4 mb-24 overflow-hidden text-base rounded-lg bg-socialPrimary">
      <div className="flex flex-col w-full gap-8 p-5">
        <div className="flex items-center gap-6">
          <BackButton linkProps={linkProps} />
          <p className="text-lg font-semibold">Post</p>
        </div>
        <PostInfo />
      </div>
      <PostComments />
    </div>
  );
}
