import FeedPostsSkeleton from "@/components/core/loadingSkeletons/social/FeedPostsSkeleton";
import PostsSkeleton from "@/components/core/loadingSkeletons/social/PostsSkeleton";
import { useForYouFeed } from "@/services/social/queries/socialQueries";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { Fragment } from "react/jsx-runtime";
import ContentOptions from "../contentOptions/ContentOptions";
import CreatePost from "../post/managePost/CreatePost";
import Post from "../post/Post";
import { TContentOption } from "@/utils/types/social/shared";

type Props = {
  feedOptions: TContentOption[];
  selectedFeedOption: TContentOption;
  setSelectedFeedOption: (option: TContentOption) => void;
};

export default function ForYouFeed({
  feedOptions,
  selectedFeedOption,
  setSelectedFeedOption,
}: Props) {
  const {
    data: forYouFeed,
    isLoading: isForYouFeedLoading,
    error: forYouFeedError,
    isFetchingNextPage,
    fetchNextPage,
  } = useForYouFeed();

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);

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
          selectedOption={selectedFeedOption}
          setSelectedOption={setSelectedFeedOption}
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
            <div ref={bottomPageRef} key={"bottom of page"}>
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
