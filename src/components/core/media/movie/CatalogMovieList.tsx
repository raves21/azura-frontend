import { getTMDBImageURL, getTMDBReleaseYear } from "@/utils/functions/media/sharedFunctions";
import MediaCard from "../shared/MediaCard";
import { MovieTMDB } from "@/utils/types/media/movie/movieTmdb";
type Props = { movieList: MovieTMDB[] };

export default function CatalogMovieList({ movieList: movieList }: Props) {
  return (
    <div className="grid w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-4 xl:grid-cols-6 lg:gap-x-5 lg:gap-y-6">
      {movieList.map((movie) => (
        <MediaCard
          key={movie.id}
          image={getTMDBImageURL(movie.poster_path)}
          linkProps={{
            to: "/movie/$movieId",
            params: { movieId: movie.id.toString() },
          }}
          subLabels={[getTMDBReleaseYear(movie.release_date)]}
          title={movie.title}
        />
      ))}
    </div>
  );
}
