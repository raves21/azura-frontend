import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { AnimeServerName, TVMovieServerName } from "@/utils/types/media/shared";
import { X } from "lucide-react";
import TVMovieEmbedVideoPlayer from "./TVMovieEmbedVideoPlayer";
import {
  buildAnimeEmbedLink,
  buildMovieEmbedLink,
  buildTVEmbedLink,
} from "@/utils/functions/media/sharedFunctions";
import { useEffect } from "react";
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
  setIsTheaterModeActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TheaterModePlayer({
  setIsTheaterModeActive,
  animeProps,
  movieProps,
  tvProps,
}: Props) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  useEffect(() => {
    setIsTheaterModeActive(true);

    () => {
      setIsTheaterModeActive(false);
    };
  }, []);

  if (tvProps) {
    const { tvId, tvSeason, tvEp, server } = tvProps;
    return (
      <div className="bg-black/70 h-dvh w-dvw grid place-items-center">
        <button
          onClick={() => {
            setIsTheaterModeActive(false);
            toggleOpenDialog(null);
          }}
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
      </div>
    );
  }

  if (movieProps) {
    const { movieId, server } = movieProps;
    return (
      <div className="bg-black/70 h-dvh w-dvw grid place-items-center">
        <button
          onClick={() => {
            setIsTheaterModeActive(false);
            toggleOpenDialog(null);
          }}
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
      </div>
    );
  }

  if (animeProps) {
    const { animeId, epNum, server } = animeProps;
    return (
      <div className="bg-black/70 h-dvh w-dvw grid place-items-center">
        <button
          onClick={() => {
            setIsTheaterModeActive(false);
            toggleOpenDialog(null);
          }}
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
      </div>
    );
  }
}
