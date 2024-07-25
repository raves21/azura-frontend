import { Episode, EpisodeChunk } from "@/utils/types/animeAnilist";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import EpisodeCard from "./-EpisodeCard";
import { useEffect, useState } from "react";
import { chunkEpisodes } from "@/utils/functions/reusable_functions";

type EpisodesProps = {
  episodes?: Episode[] | null;
  defaultEpisodeImage: string;
  type: string;
};

export default function Episodes({
  episodes,
  defaultEpisodeImage,
  type,
}: EpisodesProps) {
  const [chunkedEpisodes, setChunkedEpisodes] = useState<EpisodeChunk[]>();

  useEffect(() => {
    if (!episodes) return;
    if (episodes.length === 0) return;
    setChunkedEpisodes(chunkEpisodes(episodes, 40));
  }, []);

  if (episodes) {
    return (
      <div className="flex flex-col w-full px-3 pt-8 pb-10 space-y-6 text-sm text-gray-400 sm:px-5 md:px-8 lg:px-12 xl:px-16 lg:text-base">
        <div className="flex items-center justify-between">
          <p className="text-lg lg:text-xl font-semibold text-[#f6f4f4]">Episodes</p>
          <button className="flex items-center gap-3 px-3 py-2 pl-4 pr-3 transition-all duration-300 border border-gray-400 rounded-full group hover:border-mainAccent">
            <p className="duration-300 group-hover:text-mainAccent">
              {chunkedEpisodes
                ? `${chunkedEpisodes[0].startEp} - ${chunkedEpisodes[0].endEp}`
                : "0-0"}
            </p>
            <ChevronDown className="duration-300 size-6 group-hover:stroke-mainAccent" />
          </button>
        </div>
        <div className="h-[300px] lg:h-auto overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 gap-y-4 lg:gap-x-4 lg:gap-y-6">
            {episodes.map((episode, i) => {
              return (
                <EpisodeCard
                  type={type}
                  id={episode.id}
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
    <div className="flex flex-col px-24 pt-8 pb-10 space-y-6 text-gray-400">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold">Episodes</p>
        <Link className="flex items-center gap-3 py-2 pl-4 pr-3 transition-all duration-300 border border-gray-400 rounded-full group hover:border-mainAccent">
          <p className="transition-all duration-300 group-hover:text-mainAccent">
            {chunkedEpisodes
              ? `${chunkedEpisodes[0].startEp} - ${chunkedEpisodes[0].endEp}`
              : "0-0"}
          </p>
          <ChevronDown className="size-6" />
        </Link>
      </div>
      <div className="self-center py-12 text-xl">No Episodes available</div>
    </div>
  );
}
