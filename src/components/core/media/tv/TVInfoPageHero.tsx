import InfoSectionBackgroundImage from "@/components/core/media/shared/info/InfoSectionBackgroundImage";
import Rating from "@/components/core/media/shared/info/Rating";
import Description from "@/components/core/media/shared/info/Description";
import InfoSectionPoster from "@/components/core/media/shared/info/InfoSectionPoster";
import PlayNowButton from "@/components/core/media/shared/info/PlayNowButton";
import AddToListButton from "@/components/core/media/shared/info/AddToListButton";
import YearAndStatus from "@/components/core/media/shared/info/YearAndStatus";
import Title from "@/components/core/media/shared/info/Title";
import InfoDetails from "@/components/core/media/shared/info/InfoDetails";
import InfoItem from "@/components/core/media/shared/info/InfoItem";
import { MediaScraperResponse } from "@/utils/types/media/shared";
import { TMDBGenre } from "@/utils/types/media/shared";
import GenreListTMDB from "../shared/info/GenreListTMDB";
import { useNavigate } from "@tanstack/react-router";
import { UseQueryResult } from "@tanstack/react-query";
import { TMDBTVEpisode } from "@/utils/types/media/TV/tvShowTmdb";
import { useEffect, useState } from "react";

type TVInfoPageHeroProps = {
  image: string;
  cover: string;
  title: string;
  runTime: number | null;
  description: string;
  year: string;
  status: string;
  genres: TMDBGenre[];
  voteAverage: number | null;
  tvId: string;
  mediaScraperQuery: UseQueryResult<MediaScraperResponse, Error>;
  tvSeasonEpisodesQuery: UseQueryResult<TMDBTVEpisode[], Error>;
};

export default function TVInfoPageHero({
  image,
  cover,
  title,
  description,
  year,
  status,
  runTime,
  genres,
  voteAverage,
  tvId,
  mediaScraperQuery,
  tvSeasonEpisodesQuery
}: TVInfoPageHeroProps) {
  const navigate = useNavigate();

  const [isFirstEpisodeAvailable, setIsFirstEpisodeAvailable] = useState(false);

  const { data: tvSeasonEpisodes } = tvSeasonEpisodesQuery;

  const { data: mediaScraperData } = mediaScraperQuery;

  useEffect(() => {
    if (tvSeasonEpisodes && mediaScraperData) {
      setIsFirstEpisodeAvailable(true);
    }
  }, [tvSeasonEpisodes, mediaScraperData]);

  return (
    <section className="relative flex justify-center w-full text-sm md:text-base">
      <InfoSectionBackgroundImage image={cover ?? image} variant="infoPage" />
      <div className="flex flex-col items-center w-full gap-2 pt-32 pb-12 lg:pt-36 lg:gap-14 lg:flex-row lg:items-start">
        <InfoSectionPoster image={image} variant="infoPage" />
        <div className="relative flex flex-col items-center flex-1 gap-3 mt-3 lg:mt-0 lg:items-start">
          <Title title={title} variant="infoPage" />
          <Rating
            mediaType="tmdb"
            variant="infoPage"
            rating={voteAverage}
            isMobile={false}
          />
          <InfoDetails isMobile={false}>
            <div className="flex gap-10">
              <InfoItem label="Year:" info={year} />
              {runTime && (
                <InfoItem
                  label="Average episode runtime:"
                  info={`${runTime} min`}
                />
              )}
              <InfoItem label="Status:" info={status} />
            </div>
            <GenreListTMDB
              variant="infoPage"
              genres={genres}
              className="w-full"
              genreListContainerClassName="max-w-[70%]"
            />
          </InfoDetails>
          <YearAndStatus year={parseInt(year)} status={status} />
          <div className="flex gap-5 my-3">
            <PlayNowButton
              disabled={!isFirstEpisodeAvailable}
              onClick={() => {
                navigate({
                  to: "/tv/$tvId/watch",
                  params: {
                    tvId
                  },
                  search: {
                    epNum: 1,
                    seasonNum: 1
                  }
                });
              }}
            />
            <AddToListButton />
          </div>

          <Description
            description={description}
            className="w-full gap-3 mt-5 lg:mt-0 lg:w-[75%] xl:w-[70%]"
            showDescriptionLabel
          />
          <InfoDetails className="mt-14" isMobile>
            <div className="flex flex-col gap-3">
              <InfoItem label="Year:" info={year} />
              {runTime && <InfoItem label="Runtime:" info={`${runTime} min`} />}
              <InfoItem label="Status:" info={status} />
            </div>
            <GenreListTMDB variant="infoPage" genres={genres} />
            <div className="flex items-center gap-2">
              <p className="text-gray-400">Score:</p>
              <Rating
                mediaType="tmdb"
                variant="infoPage"
                isMobile
                rating={voteAverage}
              />
            </div>
          </InfoDetails>
        </div>
      </div>
    </section>
  );
}
