import { PaginatedAnimeResponse } from "@/utils/types/media/anime/animeAnilist";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "@tanstack/react-router";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import AnimeSearchDialogResultCard from "./AnimeSearchDialogResultCard";
import { UseQueryResult } from "@tanstack/react-query";
import SearchDialogResultsLoading from "@/components/core/loadingSkeletons/media/episode/SearchDialogResultsLoading";

type Props = {
  query: string;
  animeSearchQuery: UseQueryResult<PaginatedAnimeResponse, Error>;
};

export default function AnimeSearchDialogResults({
  animeSearchQuery,
  query,
}: Props) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const {
    data: searchResults,
    isLoading: isSearchResultsLoading,
    error: searchResultsError,
  } = animeSearchQuery;

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
    if (searchResults.results.length === 0) {
      return (
        <div className="grid w-full py-4 text-gray-400 bg-gray-800 rounded-b-lg place-items-center">
          <p>No results found for "{query}"</p>
        </div>
      );
    }
    return (
      <ScrollArea
        className={`w-full text-mainWhite rounded-b-lg bg-gray-800 ${searchResults.results.length <= 2 ? "h-auto" : "h-[300px]"} overflow-y-auto`}
      >
        <ul className="flex flex-col">
          {searchResults.results.map((anime) => (
            <AnimeSearchDialogResultCard key={anime.id} anime={anime} />
          ))}
        </ul>
        {searchResults.hasNextPage && (
          <Link
            to="/anime/catalog"
            search={{
              page: 1,
              query: query,
            }}
            onClick={() => toggleOpenDialog(null)}
            className="grid w-full py-3 mt-4 text-lg text-center place-items-center bg-mainAccent"
          >
            View all search results
          </Link>
        )}
      </ScrollArea>
    );
  }
}
