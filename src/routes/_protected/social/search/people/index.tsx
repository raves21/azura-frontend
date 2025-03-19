import { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchPeople } from "@/services/social/queries/socialQueries";
import { useHandleSearchValidationFailure } from "@/utils/hooks/useHandleSearchValidationFailure";
import { SearchSchemaValidationStatus } from "@/utils/types/media/shared";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import UserListItem from "@/components/core/social/UserListItem";

const peopleSearchResultsPageSchema = z.object({
  query: z.string()
});

type PeopleSearchResultsPageSchema = z.infer<
  typeof peopleSearchResultsPageSchema
> &
  SearchSchemaValidationStatus;

export const Route = createFileRoute("/_protected/social/search/people/")({
  component: () => <PeopleSearchResultsPage />,
  validateSearch: (search): PeopleSearchResultsPageSchema => {
    const validated = peopleSearchResultsPageSchema.safeParse(search);
    if (validated.success) {
      return {
        ...validated.data,
        success: true
      };
    }
    return {
      query: "",
      success: false
    };
  }
});

function PeopleSearchResultsPage() {
  const { query, success } = Route.useSearch();
  const navigate = useNavigate();

  useHandleSearchValidationFailure({
    isValidationFail: !success || !query,
    onValidationError: () => navigate({ to: "/social" })
  });

  const {
    data: searchPeopleResults,
    isLoading: isSearchPeopleLoading,
    error: searchPeopleError
  } = useSearchPeople(query, !!success && !!query);

  if (isSearchPeopleLoading) {
    return (
      <div className="flex flex-col w-full gap-3 p-5 rounded-lg bg-socialPrimary">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col w-full gap-[10px] py-3 hover:bg-socialPrimaryHover px-5"
          >
            <div className="flex w-full">
              <Skeleton className="object-cover bg-gray-800 rounded-full size-10" />
              <div className="flex-grow pl-2 space-y-1 text-sm text-start">
                <Skeleton className="font-semibold bg-gray-800 w-min whitespace-nowrap">
                  lorem ipsum dolor
                </Skeleton>
                <Skeleton className="bg-gray-800 w-min whitespace-nowrap">
                  lorem ipsum dolor
                </Skeleton>
              </div>
              <Skeleton className="bg-gray-800 w-[90px] py-3 h-min ml-auto text-xs font-semibold text-gray-800 hover:text-gray-900 hover:bg-gray-400 border-gray-800 hover:border-gray-900 rounded-full">
                Follow
              </Skeleton>
            </div>
            <Skeleton className="w-min ml-[48px] whitespace-nowrap bg-gray-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
              beatae?
            </Skeleton>
          </div>
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
        <div className="flex flex-col w-full gap-3 pb-24 overflow-hidden rounded-lg bg-socialPrimary">
          {searchPeopleResults.pages.map((page) => (
            <Fragment key={page.page}>
              {page.data.map((userPreview) => (
                <UserListItem
                  type="searchPeople"
                  key={userPreview.id}
                  {...userPreview}
                  className="py-5"
                />
              ))}
            </Fragment>
          ))}
        </div>
      );
    }
  }
}
