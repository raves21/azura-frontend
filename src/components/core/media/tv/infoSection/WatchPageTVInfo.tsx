import Description from "@/components/core/media/shared/info/Description";
import Rating from "@/components/core/media/shared/info/Rating";
import InfoSectionBackgroundImage from "@/components/core/media/shared/info/InfoSectionBackgroundImage";
import InfoSectionPoster from "@/components/core/media/shared/info/InfoSectionPoster";
import Title from "@/components/core/media/shared/info/Title";
import InfoItem from "@/components/core/media/shared/info/InfoItem";
import { TMDBGenre } from "@/utils/types/media/shared";
import GenreListTMDB from "../../shared/info/GenreListTMDB";

type WatchPageTVInfoProps = {
  cover: string;
  image: string;
  title: string;
  description: string;
  runTime: number | null;
  year: string;
  status: string;
  genres: TMDBGenre[];
  voteAverage: number | null;
};

export default function WatchPageTVInfo({
  cover,
  image,
  description,
  year,
  title,
  runTime,
  status,
  genres,
  voteAverage
}: WatchPageTVInfoProps) {
  return (
    <section className="relative flex flex-col w-full gap-6 py-[90px] mt-8 mb-5 justify-center">
      <InfoSectionBackgroundImage image={cover ?? image} variant="watchPage" />
      <div className="z-10 flex gap-3 sm:gap-5 md:gap-8 lg:gap-12 size-full">
        <InfoSectionPoster image={image} variant="watchPage" />
        <section className="z-10 flex flex-col flex-1 gap-2 sm:gap-3">
          <Title title={title} variant="watchPage" />
          <div className="flex flex-col gap-2 mobile-m:gap-4">
            <Rating mediaType="tmdb" variant="watchPage" rating={voteAverage} />
            <div className="flex flex-col gap-2 text-xs sm:text-base mobile-m:gap-3 md:gap-4 lg:gap-8 lg:items-center lg:flex-row">
              <InfoItem label="Year:" info={year?.toString()} />
              {runTime && <InfoItem label="Runtime:" info={`${runTime} min`} />}
              <InfoItem label="Status:" info={status} />
            </div>
            <GenreListTMDB
              isMobile={false}
              genres={genres}
              //   gotoLink="/anime/catalog"
              variant="watchPage"
            />
          </div>
          <Description
            adjustHeightBasedOnWidth
            showDescriptionLabel={false}
            description={description}
            className="hidden lg:block"
          />
        </section>
      </div>
      <div className="z-10 w-full space-y-4 lg:space-y-0">
        <GenreListTMDB
          isMobile
          genres={genres}
          //   gotoLink="/anime/catalog"
          variant="watchPage"
        />
        <Description
          adjustHeightBasedOnWidth
          showDescriptionLabel={false}
          description={description}
          className="w-full text-sm lg:hidden sm:text-base"
        />
      </div>
    </section>
  );
}
