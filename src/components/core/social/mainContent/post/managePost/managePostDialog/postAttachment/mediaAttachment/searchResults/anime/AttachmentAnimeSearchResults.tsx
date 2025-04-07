import SearchDialogResultsLoading from "@/components/core/loadingSkeletons/media/episode/SearchDialogResultsLoading";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import AttachmentAnimeSearchResultCard from "./AttachmentAnimeSearchResultCard";
import {
  useFetchAnimesByCategory,
  useFilterAnime,
} from "@/services/media/anime/queries/animeQueries";
import { AnimeSortBy } from "@/utils/types/media/anime/animeAnilist";

type Props = {
  query: string;
};

export default function AttachmentTVSearchResults({ query }: Props) {
  //todo: use infinite scrolling
  const {
    data: searchResults,
    isLoading: isSearchResultsLoading,
    error: searchResultsError,
  } = useFilterAnime({ page: 1, query });
  const {
    data: trendingAnime,
    isLoading: isTrendingAnimeLoading,
    error: trendingAnimeError,
  } = useFetchAnimesByCategory(10, AnimeSortBy.TRENDING_DESC);

  if (isSearchResultsLoading || isTrendingAnimeLoading) {
    return <SearchDialogResultsLoading className="bg-socialPrimary" />;
  }

  if (searchResultsError || trendingAnimeError) {
    return (
      <div className="grid w-full py-4 text-lg text-center text-gray-400 bg-gray-800 rounded-b-lg place-items-center text-balance">
        There seems to be problems with search. Please try again later.
      </div>
    );
  }

  if (query.length === 0 && trendingAnime) {
    return (
      <ScrollArea
        className={`w-full text-mainWhite rounded-b-lg bg-socialPrimary mt-2 h-[300px] overflow-y-auto`}
      >
        <ul className="flex flex-col">
          {" "}
          {trendingAnime.results.map((tv) => (
            <AttachmentAnimeSearchResultCard key={tv.id} anime={tv} />
          ))}
        </ul>
      </ScrollArea>
    );
  }

  if (searchResults) {
    return (
      <ScrollArea
        className={`w-full text-mainWhite rounded-b-lg bg-socialPrimary mt-2 h-[300px] overflow-y-auto`}
      >
        <ul className="flex flex-col">
          {searchResults.results.map((tv) => (
            <AttachmentAnimeSearchResultCard key={tv.id} anime={tv} />
          ))}
        </ul>
      </ScrollArea>
    );
  }
}
