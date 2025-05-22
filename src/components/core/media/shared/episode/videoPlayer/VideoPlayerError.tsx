import { useMatchRoute } from "@tanstack/react-router";

export default function VideoPlayerError() {
  const matchRoute = useMatchRoute();

  const isTVRoute = matchRoute({ to: "/tv", fuzzy: true });
  const isMovieRoute = matchRoute({ to: "/movie", fuzzy: true });

  return (
    <div className="w-dvw ml-[calc(-50vw+50%)] relative lg:w-full lg:ml-auto aspect-video rounded-none">
      <img
        src="/static-screen.gif"
        className="font-medium rounded-lg size-full object-cover z-10"
      />
      <div className="absolute inset-0 bg-black/60 z-20" />
      <p className="text-base mobile-m:text-lg sm:text-2xl md:text-3xl xl:text-4xl w-full text-center font-semibold absolute -translate-x-1/2 z-30 -translate-y-1/2 left-1/2 top-1/2">
        {isTVRoute || isMovieRoute
          ? "An error occured. Please try other servers."
          : "An error occured."}
      </p>
    </div>
  );
}
