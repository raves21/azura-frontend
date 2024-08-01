import { useFetchAnimeInfoAnify, useFetchAnimeInfoAnilist } from "@/api/animes";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import AnimeHeroComponent from "../../-AnimeHeroComponent";
import Episodes from "./-Episodes";
import { EpisodeToBeRendered } from "@/utils/types/animeAnilist";
import { useEffect, useState } from "react";
export const Route = createFileRoute("/anime/info/$animeId/")({
  component: () => <AnimeInfo />,
});

function AnimeInfo() {
  const { animeId } = Route.useParams();
  const { animeInfoPageNavigationState } = useRouterState({
    select: (s) => s.location.state,
  });

  const [shouldFetch, setShouldFetch] = useState(false);

  const {
    data: animeInfoAnify,
    isLoading: isAnimeInfoAnifyLoading,
    error: animeInfoAnifyError,
  } = useFetchAnimeInfoAnify(animeId);

  const {
    data: animeInfoAnilist,
    isLoading: isAnimeInfoAnilistLoading,
    error: animeInfoAnilistError,
  } = useFetchAnimeInfoAnilist(animeId, shouldFetch);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!animeInfoPageNavigationState || animeInfoAnifyError || shouldFetch) {
      setShouldFetch(true);
    }
  }, [animeInfoAnifyError, setShouldFetch, shouldFetch]);

  if (isAnimeInfoAnifyLoading || isAnimeInfoAnilistLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          LOADING&nbsp;
          {isAnimeInfoAnifyLoading ? (
            <span className="font-semibold text-green-500">ANIFY</span>
          ) : (
            <span className="font-semibold text-blue-500">ANILIST</span>
          )}
        </p>
      </div>
    );
  }

  if (animeInfoAnifyError && shouldFetch && animeInfoAnilistError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching the details for this anime.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  //getting anify anime episodes from different providers
  const gogoAnimeData = animeInfoAnify?.episodes.data.find(
    (epData) => epData.providerId === "gogoanime"
  );
  const animePaheData = animeInfoAnify?.episodes.data.find(
    (epData) => epData.providerId === "animepahe"
  );
  const zoroData = animeInfoAnify?.episodes.data.find(
    (epData) => epData.providerId === "zoro"
  );

  //anify episodes to be used for streaming (gogoanime only)
  const gogoAnimeEpisodes = gogoAnimeData ? gogoAnimeData.episodes : null;
  //anilist epiosdes to be used (fallback if anify gogoanime has no episodes)
  const anilistEpisodes = animeInfoAnilist?.episodes;

  let epsToBeRendered: EpisodeToBeRendered[] | null;

  if (gogoAnimeEpisodes && gogoAnimeEpisodes.length !== 0) {
    epsToBeRendered = gogoAnimeEpisodes.map((ep, i) => {
      return {
        //get episode ids from gogoanime
        id: ep.id,
        number: ep.number,

        //get episode images from animepahe
        image:
          animePaheData && animePaheData.episodes[i]
            ? animePaheData.episodes[i].img ??
              animeInfoPageNavigationState?.cover
            : animeInfoPageNavigationState?.cover,

        //get episode titles from zoro
        title:
          zoroData && zoroData.episodes[i]
            ? zoroData.episodes[i].title ?? ep.title
            : ep.title,
      };
    });
  } else if (anilistEpisodes && anilistEpisodes.length !== 0) {
    epsToBeRendered = anilistEpisodes.map((ep) => {
      return {
        id: ep.id,
        title: ep.title ?? `EP ${ep.number}`,
        number: ep.number,
        image: ep.image,
      };
    });
  } else {
    //try to fetch from anilist if no episodes from available from anify
    if(!shouldFetch) setShouldFetch(true)
    epsToBeRendered = null;
  }

  return (
    <div className="w-full">
      <AnimeHeroComponent
        title={
          animeInfoAnify?.title.english ??
          animeInfoAnify?.title.romaji ??
          animeInfoAnilist?.title.english ??
          animeInfoAnilist?.title.romaji
        }
        cover={animeInfoAnify?.bannerImage ?? animeInfoAnilist?.cover}
        image={animeInfoPageNavigationState?.image ?? animeInfoAnilist?.image}
        id={
          animeInfoAnilist?.id ??
          animeInfoAnify?.id ??
          animeInfoPageNavigationState?.id
        }
        description={
          animeInfoPageNavigationState?.description ??
          animeInfoAnilist?.description ??
          animeInfoAnify?.description
        }
        genres={
          animeInfoPageNavigationState?.genres ?? animeInfoAnilist?.genres
        }
        status={animeInfoAnify?.status ?? animeInfoAnilist?.status}
        totalEpisodes={
          animeInfoAnify?.totalEpisodes ?? animeInfoAnilist?.totalEpisodes
        }
        type={animeInfoPageNavigationState?.type ?? animeInfoAnilist?.type}
        year={animeInfoAnilist?.releaseDate ?? animeInfoAnify?.year}
        rating={
          animeInfoAnify?.rating.anilist ?? animeInfoAnilist?.rating ?? null
        }
      />
      <Episodes
        type={animeInfoAnilist?.type ?? animeInfoAnify?.format}
        episodes={epsToBeRendered}
        defaultEpisodeImage={
          animeInfoAnify?.coverImage ??
          animeInfoPageNavigationState?.cover ??
          animeInfoAnilist?.cover
        }
      />
    </div>
  );
}
