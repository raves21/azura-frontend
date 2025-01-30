import CategoryCarousel from "@/components/core/media/shared/carousel/CategoryCarousel";
import CategoryCarouselItem from "@/components/core/media/shared/carousel/CategoryCarouselItem";
import MediaCard from "@/components/core/media/shared/MediaCard";
import InfoPageTVEpisodes from "@/components/core/media/tv/episodeList/InfoPageTVEpisodes";
import TVInfoPageHero from "@/components/core/media/tv/TVInfoPageHero";
import {
  getTMDBImageURL,
  getTMDBReleaseYear,
  useMediaScraper
} from "@/services/media/sharedFunctions";
import {
  useTVInfo,
  useTVRecommendations,
  useTVSeasonEpisodes
} from "@/services/media/tv/tvQueries";
import { useTVSeasonSelectionStore } from "@/utils/stores/useTVSeasonSelectionStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_protected/tv/$tvId/")({
  component: () => <TVInfoPage />
});

function TVInfoPage() {
  const selectedSeason = useTVSeasonSelectionStore(
    (state) => state.selectedSeason
  );
  const { tvId } = Route.useParams();
  const [hasMainSeasons, setHasMainSeasons] = useState(false);
  const [totalSeasons, setTotalSeasons] = useState<number | null>(null);

  const {
    data: tvRecommendations,
    isLoading: isTVRecommendationsLoading,
    error: tvRecommendationsError
  } = useTVRecommendations(tvId);

  const {
    data: tvInfo,
    isLoading: isTvInfoLoading,
    error: tvInfoError
  } = useTVInfo(tvId);

  useEffect(() => {
    if (tvInfo) {
      //only include main seasons, dont include special seasons (season 0)
      const mainTVSeasons = tvInfo.seasons.filter(
        (season) => season.season_number > 0
      );
      if (mainTVSeasons.length !== 0) {
        setTotalSeasons(mainTVSeasons.length);
        setHasMainSeasons(true);
      }
    }
  }, [tvInfo]);

  //only fetch the info of the first season if the TV show has main seasons and has info details
  const tvSeasonEpisodesQuery = useTVSeasonEpisodes({
    tvId,
    seasonNum: selectedSeason || 1,
    enabled: !!tvInfo && hasMainSeasons
  });
  //only scrape the episode if the TV show has main seasons and has info details
  const mediaScraperQuery = useMediaScraper({
    type: "TV",
    enabled: !!tvInfo && hasMainSeasons,
    mediaId: tvId,
    seasonNum: selectedSeason || 1,
    epNum: 1
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isTvInfoLoading || isTVRecommendationsLoading) {
    return (
      <div className="grid text-2xl text-white bg-darkBg h-dvh place-items-center">
        <p>
          LOADING&nbsp;
          <span className="font-semibold text-green-500">TV INFO</span>
        </p>
      </div>
    );
  }

  if (tvInfoError || tvRecommendationsError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-darkBg">
        <p>Oops! There was an error fetching the details for this TV Show.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (tvInfo && tvRecommendations) {
    return (
      <main className="w-full pb-32">
        <TVInfoPageHero
          tvId={tvId}
          mediaScraperQuery={mediaScraperQuery}
          tvSeasonEpisodesQuery={tvSeasonEpisodesQuery}
          cover={getTMDBImageURL(tvInfo.backdrop_path)}
          description={tvInfo.overview}
          genres={tvInfo.genres}
          image={getTMDBImageURL(tvInfo.poster_path)}
          year={getTMDBReleaseYear(tvInfo.first_air_date)}
          runTime={tvInfo.last_episode_to_air?.runtime || null}
          status={tvInfo.status}
          title={tvInfo.name}
          voteAverage={tvInfo.vote_average}
        />
        <InfoPageTVEpisodes
          coverImage={getTMDBImageURL(tvInfo.backdrop_path)}
          totalSeasons={totalSeasons}
          tvSeasonEpisodesQuery={tvSeasonEpisodesQuery}
          mediaScraperQuery={mediaScraperQuery}
        />
        {tvRecommendations.results.length !== 0 && (
          <CategoryCarousel
            carouselItems={tvRecommendations.results}
            categoryName="Recommendations:"
            renderCarouselItems={(recommendation) => {
              return (
                <CategoryCarouselItem key={recommendation.id}>
                  <MediaCard
                    image={getTMDBImageURL(recommendation.poster_path)}
                    linkProps={{
                      to: "/movie/$movieId",
                      params: {
                        movieId: `${recommendation.id}`
                      }
                    }}
                    subLabels={[
                      getTMDBReleaseYear(recommendation.first_air_date)
                    ]}
                    title={recommendation.name}
                  />
                </CategoryCarouselItem>
              );
            }}
          />
        )}
      </main>
    );
  }
}
