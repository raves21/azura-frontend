import { Episode, EpisodeChunk } from "@/utils/types/animeAnilist";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import EpisodeCard from "./-EpisodeCard";
import { useEffect, useState } from "react";
import { chunkEpisodes } from "@/utils/functions/reusable_functions";

type EpisodesProps = {
  episodes: Episode[];
  animeCoverImage: string;
  animePosterImage: string;
};

export default function Episodes({
  episodes,
  animeCoverImage,
  animePosterImage,
}: EpisodesProps) {
  const [chunkedEpisodes, setChunkedEpisodes] = useState<EpisodeChunk[]>();

  const displayEpisodeImage = true;

  console.log(episodes);

  useEffect(() => {
    if (episodes.length === 0) return;
    setChunkedEpisodes(chunkEpisodes(episodes, 40));
  }, []);

  if (episodes.length !== 0) {
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
        {displayEpisodeImage ? (
          <div className="grid grid-cols-6 gap-x-4 gap-y-6">
            {episodes.map((episode, i) => {
              return (
                <EpisodeCard
                  image={
                    episode.image === animePosterImage
                      ? animeCoverImage
                      : episode.image
                  }
                  episode={episode}
                  key={i}
                />
              );
            })}
          </div>
        ) : (
          <div className={`grid grid-cols-auto-fill-45 gap-x-4 gap-y-6`}>
            {episodes.map((episode, i) => {
              return (
                <EpisodeCard
                  image={
                    episode.image === animePosterImage
                      ? animeCoverImage
                      : episode.image
                  }
                  episode={episode}
                  key={i}
                />
              );
            })}
          </div>
        )}
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
