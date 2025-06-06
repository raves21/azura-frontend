import SearchDialogResultsLoading from "@/components/core/loadingSkeletons/media/episode/SearchDialogResultsLoading";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSearchTV, useTVByCategory } from "@/services/media/tv/queries";
import { toggleDialogOrDrawer } from "@/utils/functions/sharedFunctions";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { useShallow } from "zustand/react/shallow";
import AddCollectionItemMediaPreviewDialog from "@/components/core/social/mainContent/previewPopup/addCollectionItem/AddCollectionItemMediaPreviewDialog";
import TVSearchResultCard from "../mediaSearchResultCards/TVSearchResultCard";
import { getTMDBImageURL, getTMDBRating, getTMDBReleaseYear } from "@/utils/functions/media/sharedFunctions";

type Props = {
  query: string;
  type: "addCollectionItem" | "managePostMediaAttachment";
};

export default function MediaSelectionTVSearchResults({ query, type }: Props) {
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
        className={`w-full text-mainWhite rounded-b-lg bg-socialPrimary pb-6 mt-2 flex-1 md:flex-none md:h-[300px] overflow-y-auto`}
      >
        <ul className="flex flex-col">
          {trendingTV.results.map((tv, i) => {
            if (type === "addCollectionItem") {
              return (
                <TVSearchResultCard
                  key={tv.id || i}
                  tv={tv}
                  onClick={() =>
                    toggleDialogOrDrawer({
                      content: (
                        <AddCollectionItemMediaPreviewDialog
                          media={{
                            coverImage:
                              getTMDBImageURL(tv.backdrop_path) || null,
                            description: tv.overview || null,
                            id: tv.id.toString(),
                            posterImage:
                              getTMDBImageURL(tv.poster_path) || null,
                            rating: getTMDBRating(tv.vote_average) || null,
                            status: null,
                            title: tv.name || "",
                            type: "TV",
                            year: getTMDBReleaseYear(tv.first_air_date) || null,
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
                key={tv.id || i}
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
        className={`w-full text-mainWhite rounded-b-lg bg-socialPrimary pb-6 mt-2 flex-1 md:flex-none md:h-[300px] overflow-y-auto`}
      >
        <ul className="flex flex-col">
          {searchResults.results.map((tv, i) => {
            if (type === "addCollectionItem") {
              return (
                <TVSearchResultCard
                  key={tv.id || i}
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
                key={tv.id || i}
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
