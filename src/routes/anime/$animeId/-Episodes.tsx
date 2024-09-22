import {
  AnimeEpisodes,
  EpisodeChunk,
  EpisodeToBeRendered,
} from "@/utils/types/animeAnilist";
import EpisodeCard from "./-EpisodeCard";
import { useChunkEpisodes } from "@/api/animes";
import { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import CustomDropdown from "../../../components/reusables/CustomDropdown";
import { isEqual } from "radash";
import { useScrollToElement } from "@/utils/hooks/useScrollToElement";

type EpisodeProps = {
  animeId: string | undefined;
  type: string | undefined;
  replace: boolean;
  isInfoPage: boolean;
  episodesQuery: UseQueryResult<AnimeEpisodes, Error>;
  episodeImageFallback: string | undefined;
  episodeListMaxHeight?: number;
  currentlyWatchingEpisodeNumber?: number;
};

export default function Episodes({
  animeId,
  type,
  replace,
  isInfoPage,
  episodesQuery,
  episodeImageFallback,
  episodeListMaxHeight,
  currentlyWatchingEpisodeNumber,
}: EpisodeProps) {
  const {
    data: episodes,
    isLoading: isEpisodesLoading,
    error: episodesError,
  } = episodesQuery;

  const { data: chunkedEpisodes, isLoading: isChunkEpisodesLoading } =
    useChunkEpisodes(episodes);

  const [selectedChunk, setSelectedChunk] = useState<EpisodeChunk>();
  const [currentlyWatchingEpisode, setCurrentlyWatchingEpisode] =
    useState<EpisodeToBeRendered>();
  const [currentlyWatchingEpisodeChunk, setCurrentlyWatchingEpisodeChunk] =
    useState<EpisodeChunk>();
  const episodeListContainerRef = useRef<HTMLDivElement | null>(null);
  const currentlyWatchingEpisodeCardRef = useRef<HTMLAnchorElement | null>(
    null
  );

  //setting the initial selected episode chunk
  useEffect(() => {
    if (chunkedEpisodes) {
      //if this component is used in watch-episode page
      if (currentlyWatchingEpisodeNumber) {
        //Find the episode chunk where the current episode belongs.
        //*NOTE: episode chunk size is 30.
        //Example: currentlyWatchingEpNum = 45, initial selected chunk should be the 31-60 chunk.
        //To do that, we are subtracting the end episode of each epChunk to the
        //currentlyWatchingEpisodeNumber and return the first chunk where their
        //difference is not negative.
        const foundCurrentlyWatchingChunk = chunkedEpisodes.find(
          (epChunk) => epChunk.endEp - currentlyWatchingEpisodeNumber >= 0
        );
        const foundCurrentlyWatchingEpisode =
          foundCurrentlyWatchingChunk!.episodes.find(
            (ep) => ep.number === currentlyWatchingEpisodeNumber
          );
        setSelectedChunk(foundCurrentlyWatchingChunk);
        setCurrentlyWatchingEpisodeChunk(foundCurrentlyWatchingChunk);
        setCurrentlyWatchingEpisode(foundCurrentlyWatchingEpisode);
      } else {
        //if this component is used in info page, just set it to the first chunk
        setSelectedChunk(chunkedEpisodes[0]);
      }
    }
  }, [chunkedEpisodes]);

  //hook used for scrolling to the currently watching episode
  useScrollToElement({
    scrollableContainerRef: episodeListContainerRef,
    targetElementRef: currentlyWatchingEpisodeCardRef,
    deps: [chunkedEpisodes, currentlyWatchingEpisode, selectedChunk],
  });

  //scroll to top if the selected chunk is
  //not the currently watching episode chunk
  useEffect(() => {
    if (
      episodeListContainerRef.current &&
      !isEqual(selectedChunk, currentlyWatchingEpisodeChunk)
    ) {
      episodeListContainerRef.current.scrollTo({
        top: 0,
      });
    }
  }, [selectedChunk, currentlyWatchingEpisodeChunk]);

  if (isEpisodesLoading || isChunkEpisodesLoading) {
    return (
      <div className="flex flex-col pt-8 pb-16 space-y-6 text-[#f6f4f4]">
        <p className="text-lg font-semibold lg:text-xl">Episodes</p>
        <div className="self-center py-12 text-xl">Loading episodes...</div>
      </div>
    );
  }

  if (episodesError) {
    return (
      <div className="flex flex-col pt-8 pb-16 space-y-6 text-gray-400">
        <p className="font-semibold text-lg lg:text-xl text-[#f6f4f4]">
          Episodes
        </p>
        <div className="self-center py-12 text-xl">
          There was an error fetching episodes for this anime, please try again
          later.
        </div>
      </div>
    );
  }

  if (episodes && chunkedEpisodes) {
    if (isInfoPage) {
      return (
        <div className="flex flex-col w-full pt-8 mb-16 space-y-6 text-sm text-gray-400 lg:text-base">
          <div className="flex items-center justify-between">
            <p className="text-lg lg:text-xl font-semibold text-[#f6f4f4]">
              Episodes
            </p>
            {chunkedEpisodes.length > 1 && (
              <CustomDropdown
                menuContentClassName="bg-darkBg"
                dropdownTriggerClassName="text-gray-400"
                menuItems={chunkedEpisodes}
                currentlySelected={selectedChunk}
                menuContentMaxHeight={350}
                showMenuContentBorder
                onSelectItem={(epChunk) => setSelectedChunk(epChunk)}
                menuItemLabelNames={chunkedEpisodes.map(
                  (epChunk) => epChunk.label
                )}
              />
            )}
          </div>
          <div className="max-h-[350px] lg:max-h-fit overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 gap-y-4 lg:gap-x-4 lg:gap-y-6">
              {selectedChunk?.episodes.map((episode, i) => {
                return (
                  <EpisodeCard
                    episodeImageFallback={episodeImageFallback}
                    replace={replace}
                    animeId={animeId!}
                    type={type}
                    episodeId={episode.id}
                    image={episode.image}
                    title={episode.title}
                    number={episode.number}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            maxHeight:
              window.innerWidth >= 1024 ? episodeListMaxHeight : "auto",
          }}
          className="lg:w-[550px] flex flex-col w-full pt-8 lg:pt-0 space-y-6 text-sm text-gray-400 lg:text-base"
        >
          <div className="flex items-center justify-between">
            <p className="text-lg md:text-xl font-semibold text-[#f6f4f4]">
              Episodes
            </p>
            {selectedChunk && chunkedEpisodes.length > 1 && (
              <CustomDropdown
                menuContentClassName="bg-darkBg"
                dropdownTriggerClassName="text-gray-400"
                menuItems={chunkedEpisodes}
                currentlySelected={selectedChunk}
                menuContentMaxHeight={350}
                showMenuContentBorder
                onSelectItem={(epChunk) => setSelectedChunk(epChunk)}
                menuItemLabelNames={chunkedEpisodes.map(
                  (epChunk) => epChunk.label
                )}
              />
            )}
          </div>
          <div
            ref={episodeListContainerRef}
            className="grid grid-cols-2 sm:grid-cols-3 max-h-[350px] overflow-y-auto lg:max-h-fit z-[1] lg:grid-cols-2 gap-x-3 gap-y-4"
          >
            {selectedChunk &&
              selectedChunk.episodes.map((episode, i) => {
                return (
                  <EpisodeCard
                    ref={
                      episode.number === currentlyWatchingEpisodeNumber
                        ? currentlyWatchingEpisodeCardRef
                        : null
                    }
                    isCurrentlyWatching={
                      episode.number === currentlyWatchingEpisodeNumber
                    }
                    episodeImageFallback={episodeImageFallback}
                    replace={replace}
                    animeId={animeId!}
                    type={type}
                    episodeId={episode.id}
                    image={episode.image}
                    title={episode.title}
                    number={episode.number}
                    key={i}
                  />
                );
              })}
          </div>
        </div>
      );
    }
  }
  return (
    <div className="flex flex-col px-2 pt-8 pb-16 space-y-6 text-gray-400 sm:px-3">
      <p className="font-semibold text-lg lg:text-xl text-[#f6f4f4]">
        Episodes
      </p>
      <div className="self-center py-12 text-xl">No Episodes available</div>
    </div>
  );
}
