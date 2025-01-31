import { getRatingScoreTMDB } from "@/services/media/anime/functions/animeFunctions";
import {
  getTMDBImageURL,
  getTMDBReleaseYear
} from "@/services/media/sharedFunctions";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { TVShowTMDB } from "@/utils/types/media/TV/tvShowTmdb";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

type TVSearchDialogResultCardProps = {
  tv: TVShowTMDB;
};

export default function TVSearchDialogResultCard({
  tv
}: TVSearchDialogResultCardProps) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  return (
    <Link
      to="/tv/$tvId"
      params={{
        tvId: tv.id.toString()
      }}
      onClick={() => toggleOpenDialog(null)}
      className="flex w-full gap-4 px-3 py-2 hover:bg-gray-900/70"
    >
      <div className="aspect-[3/4] h-min w-[90px] bg-gray-600 rounded-md">
        <img
          src={getTMDBImageURL(tv.poster_path)}
          alt={tv.name}
          onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
          className="object-cover rounded-md size-full"
        />
      </div>
      <div className="flex flex-col justify-center w-full gap-3">
        <p className="text-lg font-semibold line-clamp-1">{tv.name}</p>
        <div className="w-full space-y-3 text-sm text-gray-400">
          <div className="flex items-center gap-[6px]">
            <div className="bg-gray-400 rounded-full size-1" />
          </div>
          <div className="flex items-center gap-[6px]">
            <p>{getTMDBReleaseYear(tv.first_air_date)}</p>
            <div className="bg-gray-400 rounded-full size-1" />
            <p>TV</p>
            <div className="bg-gray-400 rounded-full size-1" />

            <div className="flex items-center gap-1">
              <Star className="size-4" />
              <p>{getRatingScoreTMDB(tv.vote_average)}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
