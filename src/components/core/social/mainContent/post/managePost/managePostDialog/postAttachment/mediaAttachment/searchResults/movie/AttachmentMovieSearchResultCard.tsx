import {
  getTMDBImageURL,
  getTMDBRating,
  getTMDBReleaseYear,
} from "@/services/media/sharedFunctions";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { MovieTMDB } from "@/utils/types/media/movie/movieTmdb";
import { Star } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

type Props = {
  movie: MovieTMDB;
};

export default function AttachmentMovieSearchResultCard({ movie }: Props) {
  const [setMediaAttachment, setManagePostPage, setCollectionAttachment] =
    useManagePostStore(
      useShallow((state) => [
        state.setMediaAttachment,
        state.setManagePostPage,
        state.setCollectionAttachment,
      ])
    );
  return (
    <button
      onClick={() => {
        setCollectionAttachment(null);
        setMediaAttachment({
          coverImage: getTMDBImageURL(movie.backdrop_path),
          description: movie.overview,
          id: movie.id.toString(),
          posterImage: getTMDBImageURL(movie.poster_path),
          rating: getTMDBRating(movie.vote_average),
          status: null,
          title: movie.title,
          type: "MOVIE",
          year: getTMDBReleaseYear(movie.release_date),
        });
        setManagePostPage("managePost");
      }}
      className="flex text-start w-full gap-4 px-3 py-2 hover:bg-socialPrimaryHover"
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
