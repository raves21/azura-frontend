import SearchDialogResultsLoading from "@/components/core/loadingSkeletons/media/episode/SearchDialogResultsLoading";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  useAnimesByCategory,
  useFilterAnime,
} from "@/services/media/anime/queries/animeQueries";
import { AnimeSortBy } from "@/utils/types/media/anime/animeAnilist";
import { toggleDialogOrDrawer } from "@/utils/functions/sharedFunctions";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { useShallow } from "zustand/react/shallow";
import AddCollectionItemMediaPreviewDialog from "@/components/core/social/mainContent/previewPopup/addCollectionItem/AddCollectionItemMediaPreviewDialog";
import AnimeSearchResultCard from "../mediaSearchResultCards/AnimeSearchResultCard";

type Props = {
  query: string;
  type: "addCollectionItem" | "managePostMediaAttachment";
};

export default function MediaSelectionAnimeSearchResults({
  query,
  type,
}: Props) {
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
  } = useAnimesByCategory(10, AnimeSortBy.TRENDING_DESC);

  const [setMediaAttachment, setManagePostPage, setCollectionAttachment] =
    useManagePostStore(
      useShallow((state) => [
        state.setMediaAttachment,
        state.setManagePostPage,
        state.setCollectionAttachment,
      ])
    );

  const { isTabletUp } = useWindowBreakpoints();

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
        className={`w-full text-mainWhite rounded-b-lg bg-socialPrimary pb-6 mt-2 h-[calc(100dvh-183.6px)] md:h-[300px] overflow-y-auto`}
      >
        <ul className="flex flex-col">
          {trendingAnime.results.map((anime, i) => {
            if (type === "addCollectionItem") {
              return (
                <AnimeSearchResultCard
                  key={anime.id || i}
                  anime={anime}
                  onClick={() =>
                    toggleDialogOrDrawer({
                      content: (
                        <AddCollectionItemMediaPreviewDialog
                          media={{
                            coverImage: anime.cover,
                            description: anime.description,
                            id: anime.id,
                            posterImage: anime.image,
                            rating: anime.rating?.toString() || "N/A",
                            status: null,
                            title: anime.title.english || anime.title.romaji,
                            type: "ANIME",
                            year: anime.releaseDate.toString(),
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
              <AnimeSearchResultCard
                key={anime.id || i}
                anime={anime}
                onClick={() => {
                  setCollectionAttachment(null);
                  setMediaAttachment({
                    coverImage: anime.cover || null,
                    description: anime.description || null,
                    id: anime.id,
                    posterImage: anime.image || null,
                    rating: anime.rating?.toString() || "N/A",
                    status: null,
                    title: anime.title.english || anime.title.romaji || "",
                    type: "ANIME",
                    year: anime.releaseDate?.toString() || null,
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
        className={`w-full text-mainWhite rounded-b-lg bg-socialPrimary pb-6 mt-2 h-[calc(100dvh-183.6px)] md:h-[300px] overflow-y-auto`}
      >
        <ul className="flex flex-col">
          {searchResults.results.map((anime, i) => {
            if (type === "addCollectionItem") {
              return (
                <AnimeSearchResultCard
                  key={anime.id || i}
                  anime={anime}
                  onClick={() =>
                    toggleDialogOrDrawer({
                      content: (
                        <AddCollectionItemMediaPreviewDialog
                          media={{
                            coverImage: anime.cover,
                            description: anime.description,
                            id: anime.id,
                            posterImage: anime.image,
                            rating: anime.rating?.toString() || "N/A",
                            status: null,
                            title: anime.title.english || anime.title.romaji,
                            type: "ANIME",
                            year: anime.releaseDate.toString(),
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
              <AnimeSearchResultCard
                key={anime.id || i}
                anime={anime}
                onClick={() => {}}
              />
            );
          })}
        </ul>
      </ScrollArea>
    );
  }
}
