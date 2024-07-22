import { Link } from "@tanstack/react-router";

type EpisodeCardProps = {
  id: string;
  number: number;
  title: string;
  image: string;
  type: string;
};

export default function EpisodeCard({
  id,
  number,
  title,
  image,
  type,
}: EpisodeCardProps) {
  return (
    <div
      onClick={() => console.log(id)}
      className="relative flex flex-col gap-2 
    aspect-[4/2.7] 
    group"
    >
      <div className="relative flex-1">
        <div className="absolute z-20 px-2 py-1 bottom-1 left-1 text-sm text-[#E0E0E0] rounded-lg bg-black/60">
          {type === "MOVIE" ? `MOVIE` : `Episode ${number}`}
        </div>
        <div className="absolute z-10 grid transition-all rounded-lg opacity-0 place-items-center size-full bg-mainAccent/40 group-hover:opacity-100">
          <div className="grid bg-white rounded-full size-12 place-items-center">
            <svg
              className="size-[50%]"
              fill="#c026d3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
            </svg>
          </div>
        </div>
        <img
          loading="lazy"
          src={image}
          className="absolute inset-0 object-cover rounded-lg size-full"
        />
      </div>
      <div className="text-sm">
        {/* <p className="text-white">{`Episode ${number}`}</p> */}
        <p className="line-clamp-1">
          {type === "MOVIE"
            ? "FULL"
            : title === `Episode ${number}`
              ? `EP ${number}`
              : title}
        </p>
      </div>
    </div>
  );
}
