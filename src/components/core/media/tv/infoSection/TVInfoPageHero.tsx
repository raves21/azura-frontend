import InfoSectionBackgroundImage from "@/components/core/media/shared/info/InfoSectionBackgroundImage";
import Rating from "@/components/core/media/shared/info/Rating";
import Description from "@/components/core/media/shared/info/Description";
import InfoSectionPoster from "@/components/core/media/shared/info/InfoSectionPoster";
import PlayNowButton from "@/components/core/media/shared/info/PlayNowButton";
import ToggleMediaToCollectionButton from "@/components/core/media/shared/toggleMediaToCollection/ToggleMediaToCollectionButton";
import YearAndStatus from "@/components/core/media/shared/info/YearAndStatus";
import Title from "@/components/core/media/shared/info/Title";
import InfoDetails from "@/components/core/media/shared/info/InfoDetails";
import InfoItem from "@/components/core/media/shared/info/InfoItem";
import { TMDBGenre } from "@/utils/types/media/shared";
import GenreListTMDB from "../../shared/info/GenreListTMDB";
import { useNavigate } from "@tanstack/react-router";
import { TMDBTVEpisode } from "@/utils/types/media/TV/tvShowTmdb";
import { useEffect, useState } from "react";

type Props = {
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
  tvSeasonEpisodes: TMDBTVEpisode[] | undefined;
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
  tvSeasonEpisodes,
}: Props) {
  const navigate = useNavigate();

  const [hasEpisodes, setHasEpisodes] = useState(false);

  useEffect(() => {
    if (tvSeasonEpisodes) {
      setHasEpisodes(true);
    }
  }, [tvSeasonEpisodes]);

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
            rating={voteAverage?.toString()}
            isMobile={false}
          />
          <InfoDetails isMobile={false}>
            <div className="flex gap-10">
              <InfoItem label="Year:" info={year} />
              {runTime && (
                <InfoItem label="Average runtime:" info={`${runTime} min`} />
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
              //The loading state of the entire page depends if the
              //episodes are still fetching. They are not separate from each
              //other like movie and anime. So its okay to explicitly give
              //isLoading a value of false because this button will only
              //render if either the tvinfo has episodes or not
              isLoading={false}
              isDisabled={!hasEpisodes}
              onClick={() => {
                navigate({
                  to: "/tv/$tvId/watch",
                  params: {
                    tvId,
                  },
                  search: {
                    tvEp: 1,
                    tvSeason: 1,
                  },
                });
              }}
            />
            <ToggleMediaToCollectionButton
              media={{
                id: tvId,
                type: "TV",
                coverImage: cover,
                description,
                posterImage: image,
                rating: voteAverage?.toString() ?? null,
                status,
                title,
                year,
              }}
            />
          </div>

          <Description
            description={description}
            className="w-full gap-3 mt-5 lg:mt-0 lg:w-[75%] xl:w-[70%]"
            showDescriptionLabel
          />
          <InfoDetails className="mt-14" isMobile>
            <div className="flex flex-col gap-3">
              <InfoItem label="Year:" info={year} />
              {runTime && (
                <InfoItem label="Average runtime:" info={`${runTime} min`} />
              )}
              <InfoItem label="Status:" info={status} />
            </div>
            <GenreListTMDB variant="infoPage" genres={genres} />
            <div className="flex items-center gap-2">
              <p className="text-gray-400">Score:</p>
              <Rating
                mediaType="tmdb"
                variant="infoPage"
                isMobile
                rating={voteAverage?.toString()}
              />
            </div>
          </InfoDetails>
        </div>
      </div>
    </section>
  );
}
