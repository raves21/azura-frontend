import { useMatchRoute } from "@tanstack/react-router";

type Props = {
  serverName: string;
};

export default function VideoPlayerError({ serverName }: Props) {
  const matchRoute = useMatchRoute();

  const isMovieRoute = matchRoute({ to: "/movie/$movieId/watch" });

  return (
    <div className="w-dvw ml-[calc(-50vw+50%)] relative lg:w-full lg:ml-auto aspect-video rounded-none">
      <img
        src="/static-screen.gif"
        className="font-medium rounded-lg size-full object-cover z-10"
      />
      <div className="absolute inset-0 bg-black/60 z-20" />
      <div className="flex flex-col items-center gap-2 text-base mobile-m:text-lg sm:text-2xl md:text-3xl w-full text-center font-semibold absolute -translate-x-1/2 z-30 -translate-y-1/2 left-1/2 top-1/2 px-12">
        <p className="bg-black p-2 w-fit rounded-md">
          {isMovieRoute
            ? `${serverName} unavailable for this movie.`
            : `${serverName} unavailable for this episode.`}
        </p>
        <p className="bg-black p-2 w-fit rounded-md">
          Please try other servers.
        </p>
      </div>
    </div>
  );
}
