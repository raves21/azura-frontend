import { getAnimeRating } from "@/services/media/sharedFunctions";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { Anime } from "@/utils/types/media/anime/animeAnilist";
import { Star } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

type Props = {
  anime: Anime;
};

export default function AttachmentAnimeSearchResultCard({ anime }: Props) {
  const [setMediaAttachment, setManagePostPage] = useManagePostStore(
    useShallow((state) => [state.setMediaAttachment, state.setManagePostPage])
  );
  return (
    <button
      onClick={() => {
        setMediaAttachment({
          coverImage: anime.cover,
          description: anime.description,
          id: anime.id,
          posterImage: anime.image,
          rating: anime.rating?.toString() || "N/A",
          status: null,
          title: anime.title.english || anime.title.romaji,
          type: "ANIME",
          year: anime.releaseDate.toString(),
        });
        setManagePostPage("managePost");
      }}
      className="flex text-start w-full gap-4 px-3 py-2 hover:bg-socialPrimaryHover"
    >
      <div className="aspect-[3/4] h-min w-[90px] bg-gray-600 rounded-md">
        <img
          src={anime.image || anime.cover}
          alt={anime.title.english}
          onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
          className="object-cover rounded-md size-full"
        />
      </div>
      <div className="flex flex-col justify-center w-full gap-3">
        <p className="text-lg font-semibold line-clamp-1">
          {anime.title.english || anime.title.romaji}
        </p>
        <div className="w-full space-y-3 text-sm text-gray-400">
          <div className="flex items-center gap-[6px]">
            <p>{anime.releaseDate}</p>
            <div className="bg-gray-400 rounded-full size-1" />
            <p>{anime.type}</p>
            <div className="bg-gray-400 rounded-full size-1" />
            <div className="flex items-center gap-1">
              <Star className="size-4" />
              <p>{getAnimeRating(anime.rating)}</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
