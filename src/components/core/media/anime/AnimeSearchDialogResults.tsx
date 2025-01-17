import { PaginatedAnimeResponse } from "@/utils/types/thirdParty/anime/animeAnilist";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "@tanstack/react-router";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import AnimeSearchDialogResultCard from "./AnimeSearchDialogResultCard";

type AnimeSearchDialogResultsProps = {
  query: string;
  searchResults: PaginatedAnimeResponse | undefined;
  isLoading: boolean;
  error: Error | null;
};

export default function AnimeSearchDialogResults({
  searchResults,
  isLoading,
  error,
  query
}: AnimeSearchDialogResultsProps) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  if (isLoading) {
    return (
      <div className="grid w-full py-4 bg-gray-800 rounded-b-lg place-items-center text-mainWhite">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid w-full py-4 text-center bg-gray-800 rounded-b-lg place-items-center text-mainWhite text-balance">
        There seems to be problems with search. Please try again later.
      </div>
    );
  }

  if (searchResults) {
    if (searchResults.results.length === 0) {
      return (
        <div className="flex flex-col w-full bg-gray-800 rounded-b-lg text-mainWhite">
          <p>No results found for {query}</p>
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
              query: query
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
