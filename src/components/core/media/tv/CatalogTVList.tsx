import {
  getTMDBImageURL,
  getTMDBReleaseYear
} from "@/services/media/sharedFunctions";
import MediaCard from "../shared/MediaCard";
import { TVShowTMDB } from "@/utils/types/media/TV/tvShowTmdb";
type CatalogTVListProps = { movieList: TVShowTMDB[] };

export default function CatalogTVList({
  movieList: movieList
}: CatalogTVListProps) {
  return (
    <div className="grid w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-4 xl:grid-cols-6 lg:gap-x-5 lg:gap-y-6">
      {movieList.map((tv) => (
        <MediaCard
          key={tv.id}
          image={getTMDBImageURL(tv.poster_path)}
          linkProps={{
            to: "/tv/$tvId",
            params: { tvId: tv.id.toString() }
          }}
          subLabels={[getTMDBReleaseYear(tv.first_air_date)]}
          title={tv.name}
        />
      ))}
    </div>
  );
}
