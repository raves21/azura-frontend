import { Link, LinkProps } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { Circle } from "lucide-react";

type MediaCard = {
  linkProps: LinkProps;
  image: string | undefined;
  title: string | undefined;
  subLabels: string[];
};

export default function MediaCard({
  linkProps,
  image,
  title,
  subLabels
}: MediaCard) {
  //filters out falsy elements in the array, and only includes the first two elements
  const subLabelsFiltered = subLabels.filter(Boolean).slice(0, 2);

  return (
    <Link {...linkProps} className="space-y-2 group">
      <div className="relative aspect-[3/4] min-h-[130px] overflow-hidden bg-gray-600 rounded-md lg:rounded-xl">
        {image && (
          <>
            <div className="absolute inset-0 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 size-full bg-mainAccent/40"></div>
            <img
              loading="lazy"
              src={image}
              onError={(e) => {
                e.currentTarget.src = "/no-image-2.jpg";
              }}
              className="object-cover transition-all duration-300 size-full group-hover:scale-105"
              alt={title}
            />
          </>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xs mobile-l:text-sm font-medium text-[#E0E0E0] line-clamp-2">
          {title}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          {subLabelsFiltered.map((subLabel, i) => {
            if (
              i === subLabelsFiltered.length - 1 ||
              subLabelsFiltered.length === 1 ||
              !subLabelsFiltered[i + 1]
            )
              return (
                <p className="line-clamp-1" key={subLabel}>
                  {subLabel}
                </p>
              );
            return (
              <Fragment key={subLabel}>
                <p>{subLabel}</p>
                <Circle className="fill-gray-400 stroke-gray-400 size-1" />
              </Fragment>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
