import PostsSkeleton from "@/components/shared/loadingSkeletons/social/PostsSkeleton";
import ContentOptions from "@/components/shared/social/mainContent/contentOptions/ContentOptions";
import CreatePost from "@/components/shared/social/mainContent/post/createPost/CreatePost";
import Post from "@/components/shared/social/mainContent/post/Post";
import { useForYouFeed } from "@/services/social/queries/socialQueries";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { TContentOption } from "@/utils/types/social/shared";
import { createFileRoute } from "@tanstack/react-router";
import { ReactNode } from "react";

export const Route = createFileRoute("/_protected/social/")({
  component: () => <SocialPage />,
});

const feedOptions: TContentOption[] = [
  {
    name: "For You",
    linkProps: {
      to: "/social",
    },
  },
  {
    name: "Following",
    linkProps: {
      to: "/social",
    },
  },
];

function SocialPage() {
  useCustomScrollRestoration();

  const {
    data: forYouFeed,
    isLoading: isForYouFeedLoading,
    error: forYouFeedError,
    isFetchingNextPage,
    fetchNextPage,
  } = useForYouFeed();

  const ref = useFetchNextPageInView(fetchNextPage);

  let renderedResult: ReactNode;

  if (isForYouFeedLoading) {
    renderedResult = <PostsSkeleton loadingType="loadingAllPosts" />;
  }

  if (forYouFeedError) {
    renderedResult = (
      <p className="w-full mt-28 tex-center">
        There was an error fetching the feed.
      </p>
    );
  }

  if (forYouFeed) {
    if (forYouFeed.pages[0].data.length === 0) {
      renderedResult = (
        <p className="w-full mt-16 text-lg font-medium text-center">
          No posts yet.
        </p>
      );
    } else {
      renderedResult = (
        <div className="flex flex-col w-full gap-3">
          {forYouFeed.pages.map((page) =>
            page.data.map((post) => <Post key={post.id} post={post} />)
          )}
          {forYouFeed.pages.length !== 0 &&
            forYouFeed.pages[0].data.length !== 0 && (
              <div ref={ref} className="w-full">
                {isFetchingNextPage ? (
                  <PostsSkeleton loadingType="fetchingNextPage" />
                ) : (
                  <p className="w-full mt-8 text-lg font-medium text-center">
                    You're all caught up!
                  </p>
                )}
              </div>
            )}
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col w-full gap-3 pb-24">
      <CreatePost />
      <ContentOptions
        contentOptions={feedOptions}
        defaultOption={feedOptions[0]}
      />
      {renderedResult}
    </div>
  );
}
