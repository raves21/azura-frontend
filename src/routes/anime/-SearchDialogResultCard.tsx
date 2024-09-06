import { useGlobalStore } from "@/utils/stores/globalStore";
import { Anime } from "@/utils/types/animeAnilist";
import { Link } from "@tanstack/react-router";

type SearchResultCardProps = {
  anime: Anime;
};

export default function SearchDialogResultCard({ anime }: SearchResultCardProps) {
  const { toggleOpenDialog } = useGlobalStore();
  return (
    <Link
      to={`/anime/${anime.id}`}
      onClick={() => toggleOpenDialog(null)}
      className="flex w-full gap-4 px-3 py-2"
    >
      <img
        src={anime.image}
        alt={anime.title.english ?? anime.title.romaji}
        className="object-cover size-full aspect-[3/4] w-[80px] rounded-md"
      />
      <div className="flex flex-col gap-3">
        <p className="text-lg font-semibold">
          {anime.title.english ?? anime.title.romaji}
        </p>
      </div>
    </Link>
  );
}
