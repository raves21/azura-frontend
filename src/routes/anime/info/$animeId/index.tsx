import { useFetchAnimeInfoAnify, useFetchAnimeInfoAnilist } from "@/api/animes";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import AnimeHeroComponent from "../../-AnimeHeroComponent";
import Episodes from "./-Episodes";
import { Episode } from "@/utils/types/animeAnilist";
export const Route = createFileRoute("/anime/info/$animeId/")({
  component: () => <AnimeInfo />,
});

function AnimeInfo() {
  const { animeId } = Route.useParams();
  const { animeCardToAnimeInfoNavigationState } = useRouterState({
    select: (s) => s.location.state,
  });

  const {
    data: animeInfo,
    isLoading: isAnimeInfoLoading,
    error: animeInfoError,
  } = useFetchAnimeInfoAnify(animeId);

  if (isAnimeInfoLoading) {
    return (
      <div className="grid text-white bg-black h-dvh place-items-center">
        LOADING...
      </div>
    );
  }

  if (animeInfo) {
    const gogoAnimeData = animeInfo.episodes.data.find(
      (epData) => epData.providerId === "gogoanime"
    );
    const animePaheData = animeInfo.episodes.data.find(
      (epData) => epData.providerId === "animepahe"
    );
    const zoroData = animeInfo.episodes.data.find(
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
                animeCardToAnimeInfoNavigationState?.cover
              : animeCardToAnimeInfoNavigationState?.cover,
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
      <div className="relative bg-darkBg">
        <AnimeHeroComponent
          fromCarousel={false}
          title={animeInfo.title.english}
          cover={animeInfo.bannerImage}
          image={animeCardToAnimeInfoNavigationState?.image}
          id={animeInfo.id}
          description={animeCardToAnimeInfoNavigationState?.description}
        />
        <Episodes
          episodes={epsToBeRendered}
          defaultEpisodeImage={animeCardToAnimeInfoNavigationState?.cover}
        />
      </div>
    );
  }

  if (animeInfoError) {
    return (
      <div className="grid h-screen bg-darkBg place-items-center">ERROR</div>
    );
  }
}
