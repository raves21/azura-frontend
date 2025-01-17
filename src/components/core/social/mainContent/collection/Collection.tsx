import { Link, LinkProps } from "@tanstack/react-router";
import CollectionPhoto from "./CollectionPhoto";

type CollectionProps = {
  name: string;
  previewPosters: string[];
  photo: string | null;
  linkProps: LinkProps;
};

export default function Collection({
  name,
  previewPosters,
  photo,
  linkProps,
}: CollectionProps) {
  return (
    <Link
      {...linkProps}
      className="aspect-[1/1] group relative border border-gray-700 rounded-md overflow-hidden"
    >
      {photo ? (
        <CollectionPhoto type="photo" photo={photo} className="size-auto" />
      ) : (
        <CollectionPhoto
          type="previewPosters"
          previewPosters={previewPosters}
          className="size-auto"
        />
      )}
      <div className="absolute inset-0 z-10 grid group-hover:bg-gradient-to-b group-hover:from-transparent group-hover:to-socialPrimary/90 text-start place-items-start size-full bg-gradient-to-b from-transparent to-socialPrimary">
        <p className="z-20 px-2 pb-2 mt-auto text-xs font-medium sm:text-base mobile-m:text-sm mobile-l:px-3">
          <span className="line-clamp-2">{name}</span>
        </p>
      </div>
    </Link>
  );
}
