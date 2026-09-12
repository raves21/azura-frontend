import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { AnimeServerName, TVMovieServerName } from "@/utils/types/media/shared";
import { TvMinimalPlay } from "lucide-react";
import TheaterModePlayer from "./TheaterModePlayer";

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

export default function TheaterModeButton({
  tvProps,
  movieProps,
  animeProps,
  setIsTheaterModeActive,
}: Props) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  if (tvProps) {
    return (
      <button
        onClick={() => {
          setIsTheaterModeActive(true);
          toggleOpenDialog(
            <TheaterModePlayer
              setIsTheaterModeActive={setIsTheaterModeActive}
              tvProps={tvProps}
            />,
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
    return (
      <button
        onClick={() => {
          setIsTheaterModeActive(true);
          toggleOpenDialog(
            <TheaterModePlayer
              setIsTheaterModeActive={setIsTheaterModeActive}
              movieProps={movieProps}
            />,
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
    return (
      <button
        onClick={() => {
          setIsTheaterModeActive(true);
          toggleOpenDialog(
            <TheaterModePlayer
              setIsTheaterModeActive={setIsTheaterModeActive}
              animeProps={animeProps}
            />,
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
