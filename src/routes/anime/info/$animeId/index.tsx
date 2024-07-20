import { useFetchAnimeInfoAnify, useFetchAnimeInfoAnilist } from "@/api/animes";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import AnimeHeroComponent from "../../-AnimeHeroComponent";
import Episodes from "./-Episodes";
import { Episode } from "@/utils/types/animeAnilist";
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

  useEffect(() => {
    window.scrollTo(0, 0);
    if (animeInfoPageNavigationState) {
      setShouldFetch(false);
    } else {
      setShouldFetch(true);
    }
  }, []);

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

  if (isAnimeInfoAnifyLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>LOADING <span className="font-semibold text-green-500">ANIFY</span></p>
      </div>
    );
  }

  if (isAnimeInfoAnilistLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>LOADING <span className="font-semibold text-blue-500">ANILIST</span></p>
      </div>
    );
  }

  if (animeInfoAnify) {
    const gogoAnimeData = animeInfoAnify.episodes.data.find(
      (epData) => epData.providerId === "gogoanime"
    );
    const animePaheData = animeInfoAnify.episodes.data.find(
      (epData) => epData.providerId === "animepahe"
    );
    const zoroData = animeInfoAnify.episodes.data.find(
      (epData) => epData.providerId === "zoro"
    );

    const gogoAnimeEpisodes = gogoAnimeData ? gogoAnimeData.episodes : null;
    let epsToBeRendered: Episode[] | null;

    if (gogoAnimeEpisodes) {
      epsToBeRendered = gogoAnimeEpisodes.map((ep, i) => {
        return {
          id: ep.id,
          number: ep.number,
          image:
            animePaheData && animePaheData.episodes[i]
              ? animePaheData.episodes[i].img ??
                animeInfoPageNavigationState?.cover
              : animeInfoPageNavigationState?.cover,
          title:
            zoroData && zoroData.episodes[i]
              ? zoroData.episodes[i].title ?? ep.title
              : ep.title,
        };
      });
    } else {
      epsToBeRendered = null;
    }

    return (
      <div className="relative max-w-full">
        <AnimeHeroComponent
          title={animeInfoAnify.title.english}
          cover={animeInfoAnify.bannerImage}
          image={
            animeInfoPageNavigationState?.image! ?? animeInfoAnilist?.image
          }
          id={animeInfoAnify.id}
          description={
            animeInfoPageNavigationState?.description! ??
            animeInfoAnilist?.description
          }
          genres={
            animeInfoPageNavigationState?.genres ?? animeInfoAnilist?.genres
          }
          status={animeInfoAnify.status}
          totalEpisodes={animeInfoAnify.totalEpisodes}
          type={animeInfoPageNavigationState?.type ?? animeInfoAnify.format}
          year={animeInfoAnify.year}
          rating={animeInfoAnify.rating.anilist ?? null}
        />
        <Episodes
          episodes={epsToBeRendered}
          defaultEpisodeImage={
            animeInfoPageNavigationState?.cover ?? animeInfoAnify.coverImage
          }
        />
      </div>
    );
  }

  if (animeInfoAnifyError || (shouldFetch && animeInfoAnilistError)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching the details for this anime.</p>
        <p>Please try again later.</p>
      </div>
    );
  }
}
