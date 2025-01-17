import FeedPostsSkeleton from "@/components/core/loadingSkeletons/social/FeedPostsSkeleton";
import PostsSkeleton from "@/components/core/loadingSkeletons/social/PostsSkeleton";
import ContentOptions from "@/components/core/social/mainContent/contentOptions/ContentOptions";
import CreatePost from "@/components/core/social/mainContent/post/managePost/CreatePost";
import Post from "@/components/core/social/mainContent/post/Post";
import { useForYouFeed } from "@/services/social/queries/socialQueries";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { TContentOption } from "@/utils/types/social/shared";
import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute("/_protected/social/")({
  component: () => <SocialPage />
});

const feedOptions: TContentOption[] = [
  {
    name: "For You",
    linkProps: {
      to: "/social"
    }
  },
  {
    name: "Following",
    linkProps: {
      to: "/social"
    }
  }
];

function SocialPage() {
  useCustomScrollRestoration();

  const {
    data: forYouFeed,
    isLoading: isForYouFeedLoading,
    error: forYouFeedError,
    isFetchingNextPage,
    fetchNextPage
  } = useForYouFeed();

  const ref = useFetchNextPageInView(fetchNextPage);

  if (isForYouFeedLoading) {
    return <FeedPostsSkeleton />;
  }

  if (forYouFeedError) {
    return (
      <div className="w-full pb-24 text-lg font-medium text-center pt-28">
        There was an error fetching the feed.
      </div>
    );
  }

  if (forYouFeed) {
    return (
      <div className="flex flex-col w-full gap-3 pb-24">
        <CreatePost />
        <ContentOptions
          contentOptions={feedOptions}
          defaultOption={feedOptions[0]}
        />
        {forYouFeed.pages[0].data.length === 0 ? (
          <p className="w-full mt-16 text-lg font-medium text-center">
            No posts yet.
          </p>
        ) : (
          <div className="flex flex-col w-full gap-3">
            {forYouFeed.pages.map((page) => (
              <Fragment key={page.page}>
                {page.data.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </Fragment>
            ))}
            <div ref={ref} key={"bottom of page"}>
              {isFetchingNextPage ? (
                <PostsSkeleton loadingType="fetchingNextPage" />
              ) : (
                <p className="w-full mt-8 text-lg font-medium text-center">
                  You're all caught up!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
