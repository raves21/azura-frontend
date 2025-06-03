import FeedPostsSkeleton from "@/components/core/loadingSkeletons/social/FeedPostsSkeleton";
import PostsSkeleton from "@/components/core/loadingSkeletons/social/PostsSkeleton";
import { useFollowingFeed } from "@/services/social/api/queries";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { Fragment } from "react/jsx-runtime";
import ContentOptions from "../../shared/contentOptions/ContentOptions";
import CreatePost from "../post/managePost/CreatePost";
import Post from "../post/Post";
import { TContentOption } from "@/utils/types/social/shared";

type Props = {
  feedOptions: TContentOption[];
  selectedFeedOption: TContentOption;
  setSelectedFeedOption: (option: TContentOption) => void;
};

export default function FollowingFeed({
  feedOptions,
  selectedFeedOption,
  setSelectedFeedOption,
}: Props) {
  const {
    data: followingFeed,
    isLoading: isFollowingFeedLoading,
    error: followingFeedError,
    isFetchingNextPage,
    fetchNextPage,
  } = useFollowingFeed({ enabled: selectedFeedOption === feedOptions[1] });

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);

  if (isFollowingFeedLoading) {
    return <FeedPostsSkeleton />;
  }

  if (followingFeedError) {
    return (
      <div className="w-full pb-24 text-lg font-medium text-center pt-28">
        There was an error fetching the feed.
      </div>
    );
  }

  if (followingFeed) {
    return (
      <div className="flex flex-col w-full gap-3 pb-24">
        <CreatePost />
        <ContentOptions
          contentOptions={feedOptions}
          selectedOption={selectedFeedOption}
          setSelectedOption={setSelectedFeedOption}
        />
        {followingFeed.pages[0].data.length === 0 ? (
          <p className="w-full mt-16 text-lg font-medium text-center">
            No posts yet.
          </p>
        ) : (
          <div className="flex flex-col w-full gap-3">
            {followingFeed.pages.map((page) => (
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
