import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

type CollectionProps = {
  name: string;
  previewPosters: string[];
  photo?: string;
};

export default function Collection({
  name,
  previewPosters,
  photo,
}: CollectionProps) {
  const previewPostersLength = previewPosters.length;

  return (
    <Link className="aspect-[1/1] group relative border border-gray-700 rounded-md overflow-hidden">
      <div
        className={cn("absolute size-full overflow-hidden inset-0 gap-px", {
          "grid grid-cols-2 grid-rows-2": previewPosters.length > 2,
        })}
      >
        {photo ? (
          <img src={photo} className="object-cover size-full" />
        ) : (
          previewPosters.map((previewPoster, index) => {
            if (previewPostersLength <= 2) {
              return (
                <img
                  key={index}
                  src={previewPoster}
                  className="object-cover size-full"
                />
              );
            } else if (previewPostersLength === 3) {
              if (index === 0) {
                return (
                  <div className="row-span-2">
                    <img
                      key={index}
                      src={previewPoster}
                      className="object-cover size-full"
                    />
                  </div>
                );
              }
              return (
                <div>
                  <img
                    key={index}
                    src={previewPoster}
                    className="object-cover size-full"
                  />
                </div>
              );
            }
            return (
              <div>
                <img
                  key={index}
                  src={previewPoster}
                  className="object-cover size-full"
                />
              </div>
            );
          })
        )}
      </div>
      <div className="absolute inset-0 z-10 grid group-hover:bg-gradient-to-b group-hover:from-transparent group-hover:to-socialPrimary/90 text-start place-items-start size-full bg-gradient-to-b from-transparent to-socialPrimary">
        <p className="z-20 px-3 pb-2 mt-auto text-base font-medium">
          <span className="line-clamp-2">{name}</span>
        </p>
      </div>
    </Link>
  );
}
