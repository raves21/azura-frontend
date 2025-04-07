import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "@tanstack/react-router";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import SearchPeopleResultCard from "./SearchPeopleResultCard";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import SearchDialogResultsLoading from "@/components/core/loadingSkeletons/media/episode/SearchDialogResultsLoading";
import { PaginatedUserPreviewsResponse } from "@/utils/types/social/social";
import { Fragment } from "react/jsx-runtime";

type Props = {
  query: string;
  searchPeopleQuery: UseInfiniteQueryResult<
    InfiniteData<PaginatedUserPreviewsResponse, unknown>,
    Error
  >;
};

export default function SearchPeopleResults({
  searchPeopleQuery,
  query,
}: Props) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const {
    data: searchResults,
    isLoading: isSearchResultsLoading,
    error: searchResultsError,
  } = searchPeopleQuery;

  if (isSearchResultsLoading) {
    return <SearchDialogResultsLoading />;
  }

  if (searchResultsError) {
    return (
      <div className="grid w-full py-4 text-lg text-center text-gray-400 bg-gray-800 rounded-b-lg place-items-center text-balance">
        There seems to be problems with search. Please try again later.
      </div>
    );
  }

  if (searchResults) {
    if (searchResults.pages[0].data.length === 0) {
      return (
        <div className="grid w-full py-4 text-lg text-gray-400 bg-gray-800 rounded-b-lg place-items-center">
          <p>No results found for "{query}"</p>
        </div>
      );
    }
    return (
      <ScrollArea
        className={`w-full text-mainWhite rounded-b-lg bg-gray-800 ${searchResults.pages[0].data.length <= 2 ? "h-auto" : "h-[300px]"} overflow-y-auto`}
      >
        <ul className="flex flex-col">
          {searchResults.pages.map((page) => (
            <Fragment key={page.page}>
              {page.data.map((userPreview) => (
                <SearchPeopleResultCard
                  key={userPreview.id}
                  user={userPreview}
                />
              ))}
              {page.page < page.totalPages && (
                <Link
                  to="/social/search/people"
                  search={{
                    query,
                  }}
                  onClick={() => toggleOpenDialog(null)}
                  className="grid w-full py-3 mt-4 text-lg text-center place-items-center bg-mainAccent"
                >
                  View all search results
                </Link>
              )}
            </Fragment>
          ))}
        </ul>
      </ScrollArea>
    );
  }
}
