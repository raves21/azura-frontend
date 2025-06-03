
import { getTMDBImageURL, getTMDBReleaseYear, getTMDBRating } from "@/utils/functions/media/sharedFunctions";
import { MovieTMDB } from "@/utils/types/media/movie/movieTmdb";
import { Star } from "lucide-react";

type Props = {
  movie: MovieTMDB;
  onClick: () => void;
};

export default function MovieSearchResultCard({ movie, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex w-full text-start gap-4 px-3 py-2 hover:bg-socialPrimaryHover"
    >
      <div className="aspect-[3/4] h-min w-[90px] bg-gray-600 rounded-md">
        <img
          src={getTMDBImageURL(movie.poster_path)}
          alt={movie.title}
          onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
          className="object-cover rounded-md size-full"
        />
      </div>
      <div className="flex flex-col justify-center w-full gap-3">
        <p className="text-lg font-semibold line-clamp-1">{movie.title}</p>
        <div className="w-full space-y-3 text-sm text-gray-400">
          <div className="flex items-center gap-[6px]">
            <p>{getTMDBReleaseYear(movie.release_date)}</p>
            <div className="bg-gray-400 rounded-full size-1" />
            <p>MOVIE</p>
            <div className="bg-gray-400 rounded-full size-1" />

            <div className="flex items-center gap-1">
              <Star className="size-4" />
              <p>{getTMDBRating(movie.vote_average)}</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
