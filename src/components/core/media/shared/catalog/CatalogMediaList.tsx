import { Anime } from "@/utils/types/thirdParty/anime/animeAnilist";
import MediaCard from "../MediaCard";

type AnimeVariant = {
  type: "anime";
  animeList: Anime[];
};

type TVVariant = {
  type: "tv";
};

type CatalogMediaListProps = AnimeVariant | TVVariant;

export default function CatalogMediaList({ ...props }: CatalogMediaListProps) {
  return (
    <div className="grid w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-4 xl:grid-cols-6 lg:gap-x-5 lg:gap-y-6">
      {props.type === "anime" &&
        props.animeList.map((anime, i) => (
          <MediaCard
            key={anime.id || i}
            image={anime.image || anime.cover}
            linkProps={{
              to: `/anime/$animeId`,
              params: { animeId: anime.id }
            }}
            subLabels={[
              anime.type,
              anime.releaseDate?.toString(),
              anime.status
            ]}
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
