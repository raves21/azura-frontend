import { Anime } from "@/utils/types/media/anime/animeAnilist";
import MediaCard from "../shared/MediaCard";
type CatalogAnimeListProps = { animeList: Anime[] };

export default function CatalogAnimeList({ animeList }: CatalogAnimeListProps) {
  return (
    <div className="grid w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-4 xl:grid-cols-6 lg:gap-x-5 lg:gap-y-6">
      {animeList.map((anime, i) => (
        <MediaCard
          key={anime.id || i}
          image={anime.image || anime.cover}
          linkProps={{
            to: `/anime/$animeId`,
            params: { animeId: anime.id }
          }}
          subLabels={[anime.type, anime.releaseDate?.toString(), anime.status]}
          title={
            anime.title.english ||
            anime.title.romaji ||
            anime.title.userPreferred
          }
        />
      ))}
    </div>
  );
}
