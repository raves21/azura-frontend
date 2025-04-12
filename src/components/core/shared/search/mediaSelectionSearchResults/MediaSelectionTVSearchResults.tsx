import SearchDialogResultsLoading from "@/components/core/loadingSkeletons/media/episode/SearchDialogResultsLoading";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSearchTV, useTVByCategory } from "@/services/media/tv/tvQueries";
import {
  getTMDBImageURL,
  getTMDBRating,
  getTMDBReleaseYear,
  toggleDialogOrDrawer,
} from "@/services/media/sharedFunctions";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { useShallow } from "zustand/react/shallow";
import AddCollectionItemMediaPreviewDialog from "@/components/core/social/mainContent/previewPopup/addCollectionItem/AddCollectionItemMediaPreviewDialog";
import TVSearchResultCard from "../mediaSearchResultCards/TVSearchResultCard";

type Props = {
  query: string;
  type: "addCollectionItem" | "managePostMediaAttachment";
};

export default function MediaSelectionTVSearchResults({ query, type }: Props) {
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
  } = useTVByCategory({ category: "trending" });

  const { isTabletUp } = useWindowBreakpoints();

  const [setMediaAttachment, setManagePostPage, setCollectionAttachment] =
    useManagePostStore(
      useShallow((state) => [
        state.setMediaAttachment,
        state.setManagePostPage,
        state.setCollectionAttachment,
      ])
    );

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
          {trendingTV.results.map((tv) => {
            if (type === "addCollectionItem") {
              return (
                <TVSearchResultCard
                  tv={tv}
                  onClick={() =>
                    toggleDialogOrDrawer({
                      content: (
                        <AddCollectionItemMediaPreviewDialog
                          media={{
                            coverImage: getTMDBImageURL(tv.backdrop_path),
                            description: tv.overview,
                            id: tv.id.toString(),
                            posterImage: getTMDBImageURL(tv.poster_path),
                            rating: getTMDBRating(tv.vote_average),
                            status: null,
                            title: tv.name,
                            type: "TV",
                            year: getTMDBReleaseYear(tv.first_air_date),
                          }}
                        />
                      ),
                      isTabletUp,
                      isSecondaryDialog: true,
                    })
                  }
                />
              );
            }
            return (
              <TVSearchResultCard
                tv={tv}
                onClick={() => {
                  setCollectionAttachment(null);
                  setMediaAttachment({
                    coverImage: getTMDBImageURL(tv.backdrop_path),
                    description: tv.overview,
                    id: tv.id.toString(),
                    posterImage: getTMDBImageURL(tv.poster_path),
                    rating: getTMDBRating(tv.vote_average),
                    status: null,
                    title: tv.name,
                    type: "TV",
                    year: getTMDBReleaseYear(tv.first_air_date),
                  });
                  setManagePostPage("managePost");
                }}
              />
            );
          })}
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
          {searchResults.results.map((tv) => {
            if (type === "addCollectionItem") {
              return (
                <TVSearchResultCard
                  tv={tv}
                  onClick={() =>
                    toggleDialogOrDrawer({
                      content: (
                        <AddCollectionItemMediaPreviewDialog
                          media={{
                            coverImage: getTMDBImageURL(tv.backdrop_path),
                            description: tv.overview,
                            id: tv.id.toString(),
                            posterImage: getTMDBImageURL(tv.poster_path),
                            rating: getTMDBRating(tv.vote_average),
                            status: null,
                            title: tv.name,
                            type: "TV",
                            year: getTMDBReleaseYear(tv.first_air_date),
                          }}
                        />
                      ),
                      isTabletUp,
                      isSecondaryDialog: true,
                    })
                  }
                />
              );
            }
            return (
              <TVSearchResultCard
                tv={tv}
                onClick={() => {
                  setCollectionAttachment(null);
                  setMediaAttachment({
                    coverImage: getTMDBImageURL(tv.backdrop_path),
                    description: tv.overview,
                    id: tv.id.toString(),
                    posterImage: getTMDBImageURL(tv.poster_path),
                    rating: getTMDBRating(tv.vote_average),
                    status: null,
                    title: tv.name,
                    type: "TV",
                    year: getTMDBReleaseYear(tv.first_air_date),
                  });
                  setManagePostPage("managePost");
                }}
              />
            );
          })}
        </ul>
      </ScrollArea>
    );
  }
}
