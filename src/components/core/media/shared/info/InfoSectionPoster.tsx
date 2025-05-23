import { Link, LinkProps } from "@tanstack/react-router";

type Props = {
  image: string | undefined;
  variant: "infoPage" | "watchPage";
  linkProps?: LinkProps;
};

export default function InfoSectionPoster({
  image,
  variant,
  linkProps,
}: Props) {
  if (variant === "infoPage") {
    return (
      <div className="aspect-[3/4] h-[230px] sm:h-[280px] lg:h-[300px] xl:h-[320px] rounded-xl overflow-hidden z-10">
        <img
          src={image}
          className="object-cover size-full"
          onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
        />
      </div>
    );
  } else {
    return (
      <Link
        {...linkProps}
        className="aspect-[3/4] max-h-[180px] mobile-m:max-h-[190px] mobile-l:max-h-[200px] sm:max-h-[240px] md:max-h-[260px] lg:max-h-[300px] rounded-xl overflow-hidden z-10"
      >
        <img
          src={image}
          className="object-cover size-full"
          onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
        />
      </Link>
    );
  }
}
