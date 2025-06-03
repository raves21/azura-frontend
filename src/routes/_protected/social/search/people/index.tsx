import { Fragment, useEffect } from "react";
import { useSearchPeople } from "@/services/social/api/queries";
import { useHandleSearchParamsValidationFailure } from "@/utils/hooks/useHandleSearchParamsValidationFailure";
import { SearchSchemaValidationStatus } from "@/utils/types/media/shared";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import UserListItem from "@/components/core/social/shared/UserListItem";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import UserListItemSkeleton from "@/components/core/loadingSkeletons/social/UserListItemSkeleton";
import { useFetchNextPageInView } from "@/utils/hooks/useFetchNextPageInView";

const peopleSearchResultsPageSchema = z.object({
  query: z.string(),
});

type PeopleSearchResultsPageSchema = z.infer<
  typeof peopleSearchResultsPageSchema
> &
  SearchSchemaValidationStatus;

export const Route = createFileRoute("/_protected/social/search/people/")({
  component: () => <PeopleSearchResultsPage />,
  validateSearch: (search): PeopleSearchResultsPageSchema => {
    const validated = peopleSearchResultsPageSchema.safeParse(search);
    if (validated.success && validated.data.query.trim()) {
      return {
        ...validated.data,
        success: true,
      };
    }
    return {
      query: "",
      success: false,
    };
  },
});

function PeopleSearchResultsPage() {
  useCustomScrollRestoration();
  const { query, success } = Route.useSearch();
  const navigate = useNavigate();

  useHandleSearchParamsValidationFailure({
    isValidationFail: !success,
    onValidationError: () => navigate({ to: "/social" }),
  });

  const setSocialSearchKeyword = useGlobalStore(
    (state) => state.setSocialSearchKeyword
  );

  useEffect(() => {
    setSocialSearchKeyword(query);
  }, [query]);

  const {
    data: searchPeopleResults,
    isLoading: isSearchPeopleLoading,
    error: searchPeopleError,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchPeople(query, !!success && !!query);

  const bottomPageRef = useFetchNextPageInView(fetchNextPage);

  if (isSearchPeopleLoading) {
    return (
      <div className="flex flex-col w-full gap-3 p-5 rounded-lg bg-socialPrimary">
        {Array.from({ length: 3 }).map((_, i) => (
          <UserListItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (searchPeopleError) {
    return (
      <div className="grid w-full gap-3 py-12 text-lg text-gray-300 place-items-center">
        <p>An error occured. Please try again later.</p>
      </div>
    );
  }

  if (searchPeopleResults) {
    if (searchPeopleResults.pages[0].data.length === 0) {
      return (
        <div className="grid w-full gap-3 py-12 text-lg text-center text-gray-300 place-items-center">
          <p>No results found for "{query}"</p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col w-full gap-3 overflow-hidden rounded-lg bg-socialPrimary">
          {searchPeopleResults.pages.map((page) => (
            <Fragment key={page.page}>
              {page.data.map((userPreview) => (
                <UserListItem
                  key={userPreview.id}
                  {...userPreview}
                  className="py-5"
                />
              ))}
            </Fragment>
          ))}
          <div ref={bottomPageRef}>
            {isFetchingNextPage &&
              Array.from({ length: 2 }).map((_, i) => (
                <UserListItemSkeleton key={i} />
              ))}
          </div>
        </div>
      );
    }
  }
}
