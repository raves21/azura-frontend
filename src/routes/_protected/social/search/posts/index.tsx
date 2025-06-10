import ActivitySkeleton from "@/components/core/loadingSkeletons/social/ActivitySkeleton";
import PostsSkeleton from "@/components/core/loadingSkeletons/social/PostsSkeleton";
import Post from "@/components/core/social/mainContent/post/Post";
import { useSearchPosts } from "@/services/social/api/queries";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";
import { useHandleSearchParamsValidationFailure } from "@/utils/hooks/useHandleSearchParamsValidationFailure";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { SearchSchemaValidationStatus } from "@/utils/types/media/shared";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Fragment, useEffect } from "react";
import { z } from "zod";

const postsSearchResultsPageSchema = z.object({
  query: z.string().min(1),
});

type PostsSearchResultsPageSchema = z.infer<
  typeof postsSearchResultsPageSchema
> &
  SearchSchemaValidationStatus;

export const Route = createFileRoute("/_protected/social/search/posts/")({
  component: () => <PostsSearchResultsPage />,
  validateSearch: (search): PostsSearchResultsPageSchema => {
    const validated = postsSearchResultsPageSchema.safeParse(search);
    if (validated.success) {
      return {
        ...validated.data,
        success: true,
      };
    }
    return { query: "", success: false };
  },
});

function PostsSearchResultsPage() {
  useCustomScrollRestoration();
  const { query, success } = Route.useSearch();
  const navigate = useNavigate();

  useHandleSearchParamsValidationFailure({
    isValidationFail: !success,
    onValidationFail: () => navigate({ to: "/social" }),
  });

  const setSocialSearchKeyword = useGlobalStore(
    (state) => state.setSocialSearchKeyword
  );

  useEffect(() => {
    setSocialSearchKeyword(query);
  }, [query]);

  const {
    data: searchPostsResults,
    isLoading: isSearchPostsLoading,
    error: searchPostsError,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchPosts(query, !!query && !!success);

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);

  if (isSearchPostsLoading) {
    return <PostsSkeleton loadingType="loadingAllPosts" />;
  }

  if (searchPostsError) {
    return (
      <div className="grid w-full gap-3 py-12 text-lg text-gray-300 place-items-center">
        <p>An error occured. Please try again later.</p>
      </div>
    );
  }

  if (searchPostsResults) {
    if (searchPostsResults.pages[0].data.length === 0) {
      return (
        <div className="grid w-full gap-3 py-12 text-lg text-center text-gray-300 place-items-center">
          <p>No results found for "{query}"</p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col w-full gap-3 pb-24">
          {searchPostsResults.pages.map((page) => (
            <Fragment key={page.page}>
              {page.data.map((post) => (
                <Post key={post.id} post={post} fromState="search-page" />
              ))}
            </Fragment>
          ))}
          <div ref={bottomPageRef}>
            {isFetchingNextPage && (
              <ActivitySkeleton type="post" withAttachment={false} />
            )}
          </div>
        </div>
      );
    }
  }
}
