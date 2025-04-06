import SearchDialogResultsLoading from "@/components/core/loadingSkeletons/media/episode/SearchDialogResultsLoading";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import AttachmentTVSearchResultCard from "./AttachmentTVSearchResultCard";
import { useSearchTV, useTVByCategory } from "@/services/media/tv/tvQueries";

type Props = {
  query: string;
};

export default function AttachmentTVSearchResults({ query }: Props) {
  //todo: use infinite scrolling
  const {
    data: searchResults,
    isLoading: isSearchResultsLoading,
    error: searchResultsError,
  } = useSearchTV(query, 1, query.length > 0);
  const {
    data: trendingTV,
    isLoading: isTrendingTVLoading,
    error: trendingTVError,
  } = useTVByCategory("trending");

  if (isSearchResultsLoading || isTrendingTVLoading) {
    return <SearchDialogResultsLoading className="bg-socialPrimary" />;
  }

  if (searchResultsError || trendingTVError) {
    return (
      <div className="grid w-full py-4 text-lg text-center text-gray-400 bg-gray-800 rounded-b-lg place-items-center text-balance">
        There seems to be problems with search. Please try again later.
      </div>
    );
  }

  if (query.length === 0 && trendingTV) {
    return (
      <ScrollArea
        className={`w-full text-mainWhite rounded-b-lg bg-socialPrimary mt-2 h-[300px] overflow-y-auto`}
      >
        <ul className="flex flex-col">
          {" "}
          {trendingTV.results.map((tv) => (
            <AttachmentTVSearchResultCard key={tv.id} tv={tv} />
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
            <AttachmentTVSearchResultCard key={tv.id} tv={tv} />
          ))}
        </ul>
      </ScrollArea>
    );
  }
}
