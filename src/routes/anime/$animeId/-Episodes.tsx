import { AnimeInfoAnilist } from "@/utils/types/animeAnilist";
import { ChevronDown } from "lucide-react";
import EpisodeCard from "./-EpisodeCard";
import { AnimeInfoAnify } from "@/utils/types/animeAnify";
import { useFetchChunkedEpisodes } from "@/api/animes";

type EpisodesProps = {
  animeInfoAnify?: AnimeInfoAnify;
  animeInfoAnilist?: AnimeInfoAnilist;
  defaultEpisodeImage?: string;
  type?: string;
};

export default function Episodes({
  animeInfoAnify,
  animeInfoAnilist,
  defaultEpisodeImage,
  type,
}: EpisodesProps) {
  const { data: chunkedEpisodes } = useFetchChunkedEpisodes(
    animeInfoAnify,
    animeInfoAnilist
  );

  if (chunkedEpisodes && animeInfoAnify && animeInfoAnilist) {
    return (
      <div className="flex flex-col w-full px-2 pt-8 pb-10 space-y-6 text-sm text-gray-400 sm:px-5 md:px-8 lg:px-12 xl:px-16 lg:text-base">
        <div className="flex items-center justify-between">
          <p className="text-lg lg:text-xl font-semibold text-[#f6f4f4]">
            Episodes
          </p>
          <button className="flex items-center gap-3 px-3 py-2 pl-4 pr-3 transition-all duration-300 border border-gray-400 rounded-full group hover:border-mainAccent">
            <p className="duration-300 group-hover:text-mainAccent">
              {chunkedEpisodes
                ? `${chunkedEpisodes[0].startEp} - ${chunkedEpisodes[0].endEp}`
                : "0-0"}
            </p>
            <ChevronDown className="duration-300 size-6 group-hover:stroke-mainAccent" />
          </button>
        </div>
        <div className="h-[360px] lg:h-auto overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 gap-y-4 lg:gap-x-4 lg:gap-y-6">
            {chunkedEpisodes[0].episodes.map((episode, i) => {
              return (
                <EpisodeCard
                  animeId={animeInfoAnify.id ?? animeInfoAnilist.id}
                  type={type}
                  episodeId={episode.id}
                  image={episode.image ?? defaultEpisodeImage}
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
  }

  return (
    <div className="flex flex-col px-3 pt-8 pb-16 space-y-6 text-gray-400 sm:px-5 md:px-8 lg:px-12 xl:px-16">
      <p className="font-semibold text-lg lg:text-xl text-[#f6f4f4]">
        Episodes
      </p>
      <div className="self-center py-12 text-xl">No Episodes available</div>
    </div>
  );
}
