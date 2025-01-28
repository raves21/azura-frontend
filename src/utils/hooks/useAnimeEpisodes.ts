import { isEqual } from "radash";
import { useEffect, useState, useRef } from "react";
import { EpisodeChunk, EpisodeToBeRendered } from "../types/media/shared";
import { useScrollToElement } from "./useScrollToElement";

type UseAnimeEpisodesArgs = {
  chunkedEpisodes: EpisodeChunk[] | null | undefined;
  currentlyWatchingEpisodeNumber: number | undefined;
};

export function useAnimeEpisodes({
  chunkedEpisodes,
  currentlyWatchingEpisodeNumber
}: UseAnimeEpisodesArgs) {
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
      //if this component is used in watch page
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
    deps: [chunkedEpisodes, currentlyWatchingEpisode, selectedChunk]
  });

  //scroll to top if the selected chunk is
  //not the currently watching episode chunk
  useEffect(() => {
    if (
      episodeListContainerRef.current &&
      !isEqual(selectedChunk, currentlyWatchingEpisodeChunk)
    ) {
      episodeListContainerRef.current.scrollTo({
        top: 0
      });
    }
  }, [selectedChunk, currentlyWatchingEpisodeChunk]);

  return {
    selectedChunk,
    setSelectedChunk,
    episodeListContainerRef,
    currentlyWatchingEpisodeCardRef
  };
}
