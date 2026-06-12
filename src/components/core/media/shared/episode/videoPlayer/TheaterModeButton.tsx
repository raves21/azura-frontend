import {
  buildAnimeEmbedLink,
  buildMovieEmbedLink,
  buildTVEmbedLink,
} from "@/utils/functions/media/sharedFunctions";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { AnimeServerName, TVMovieServerName } from "@/utils/types/media/shared";
import { TvMinimalPlay, X } from "lucide-react";
import TVMovieEmbedVideoPlayer from "./TVMovieEmbedVideoPlayer";
import AnimeEmbedVideoPlayer from "./AnimeEmbedVideoPlayer";

type Props = {
  tvProps?: {
    tvId: string;
    tvSeason: number;
    tvEp: number;
    server: TVMovieServerName;
  };
  movieProps?: {
    movieId: string;
    server: TVMovieServerName;
  };
  animeProps?: {
    animeId: string;
    epNum: number;
    server: AnimeServerName;
  };
};

export default function TheaterModeButton({
  tvProps,
  movieProps,
  animeProps,
}: Props) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  if (tvProps) {
    const { tvId, tvSeason, tvEp, server } = tvProps;
    return (
      <button
        onClick={() => {
          toggleOpenDialog(
            <div className="bg-black/70 h-dvh w-dvw grid place-items-center">
              <button
                onClick={() => toggleOpenDialog(null)}
                className="box-content flex items-center gap-3 fixed self-end p-2 transition-colors group hover:border-mainAccent border border-gray-400 rounded-full lg:p-3 top-5 right-3 w-fit group"
              >
                <X className="size-4 lg:size-5 stroke-gray-400 group-hover:stroke-mainAccent" />
              </button>
              <div className="aspect-video h-[150px] mobile-l:h-[200px] 570:h-[290px] sm:h-[330px] md:h-[400px] lg:h-[520px] xl:h-[660px] 1440:h-[730px] 2000:h-[1100px]">
                <TVMovieEmbedVideoPlayer
                  server={server}
                  embedLink={buildTVEmbedLink(tvId, tvSeason, tvEp, server)}
                  className="ml-0 lg:ml-0"
                />
              </div>
            </div>,
          );
        }}
        className="flex w-fit items-center border border-gray-400 text-gray-400 rounded-lg group hover:border-mainAccent transition-colors px-3 py-2 gap-4"
      >
        <TvMinimalPlay className=" group-hover:text-mainAccent stroke-1 size-5 sm:size-6" />
        <p className="font-medium whitespace-nowrap group-hover:text-mainAccent text-sm sm:text-base">
          Theater Mode
        </p>
      </button>
    );
  }

  if (movieProps) {
    const { movieId, server } = movieProps;
    return (
      <button
        onClick={() => {
          toggleOpenDialog(
            <div className="bg-black/70 h-dvh w-dvw grid place-items-center">
              <button
                onClick={() => toggleOpenDialog(null)}
                className="box-content flex items-center gap-3 fixed self-end p-2 transition-colors group hover:border-mainAccent border border-gray-400 rounded-full lg:p-3 top-5 right-3 w-fit group"
              >
                <X className="size-4 lg:size-5 stroke-gray-400 group-hover:stroke-mainAccent" />
              </button>
              <div className="aspect-video h-[150px] mobile-l:h-[200px] 570:h-[290px] sm:h-[330px] md:h-[400px] lg:h-[520px] xl:h-[660px] 1440:h-[730px] 2000:h-[1100px]">
                <TVMovieEmbedVideoPlayer
                  server={server}
                  embedLink={buildMovieEmbedLink(movieId, server)}
                  className="ml-0 lg:ml-0"
                />
              </div>
            </div>,
          );
        }}
        className="flex w-fit items-center border border-gray-400 text-gray-400 rounded-lg group hover:border-mainAccent transition-colors px-3 py-2 gap-4"
      >
        <TvMinimalPlay className=" group-hover:text-mainAccent stroke-1 size-5 sm:size-6" />
        <p className="font-medium whitespace-nowrap group-hover:text-mainAccent text-sm sm:text-base">
          Theater Mode
        </p>
      </button>
    );
  }

  if (animeProps) {
    const { animeId, epNum, server } = animeProps;

    return (
      <button
        onClick={() => {
          toggleOpenDialog(
            <div className="bg-black/70 h-dvh w-dvw grid place-items-center">
              <button
                onClick={() => toggleOpenDialog(null)}
                className="box-content flex items-center gap-3 fixed self-end p-2 transition-colors group hover:border-mainAccent border border-gray-400 rounded-full lg:p-3 top-5 right-3 w-fit group"
              >
                <X className="size-4 lg:size-5 stroke-gray-400 group-hover:stroke-mainAccent" />
              </button>
              <div className="aspect-video h-[150px] mobile-l:h-[200px] 570:h-[290px] sm:h-[330px] md:h-[400px] lg:h-[520px] xl:h-[660px] 1440:h-[730px] 2000:h-[1100px]">
                <AnimeEmbedVideoPlayer
                  embedLink={buildAnimeEmbedLink(animeId, epNum, server)}
                  className="ml-0 lg:ml-0"
                />
              </div>
            </div>,
          );
        }}
        className="flex w-fit items-center border border-gray-400 text-gray-400 rounded-lg group hover:border-mainAccent transition-colors px-3 py-2 gap-4"
      >
        <TvMinimalPlay className=" group-hover:text-mainAccent stroke-1 size-5 sm:size-6" />
        <p className="font-medium whitespace-nowrap group-hover:text-mainAccent text-sm sm:text-base">
          Theater Mode
        </p>
      </button>
    );
  }
}
