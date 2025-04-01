import {
  getTMDBImageURL,
  getTMDBRating,
  getTMDBReleaseYear,
} from "@/services/media/sharedFunctions";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { TVShowTMDB } from "@/utils/types/media/TV/tvShowTmdb";
import { Star } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

type Props = {
  tv: TVShowTMDB;
};

export default function AttachmentTVSearchResultCard({ tv }: Props) {
  const [setMediaAttachment, setManagePostPage] = useManagePostStore(
    useShallow((state) => [state.setMediaAttachment, state.setManagePostPage])
  );
  return (
    <button
      onClick={() => {
        setMediaAttachment({
          coverImage: getTMDBImageURL(tv.backdrop_path),
          description: tv.overview,
          id: tv.id.toString(),
          posterImage: getTMDBImageURL(tv.poster_path),
          rating: getTMDBRating(tv.vote_average),
          status: null,
          title: tv.name,
          type: "TV",
          year: getTMDBReleaseYear(tv.first_air_date),
        });
        setManagePostPage("managePost");
      }}
      className="flex text-start w-full gap-4 px-3 py-2 hover:bg-socialPrimaryHover"
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
            <p>{getTMDBReleaseYear(tv.first_air_date)}</p>
            <div className="bg-gray-400 rounded-full size-1" />
            <p>MOVIE</p>
            <div className="bg-gray-400 rounded-full size-1" />
            <div className="flex items-center gap-1">
              <Star className="size-4" />
              <p>{getTMDBRating(tv.vote_average)}</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
