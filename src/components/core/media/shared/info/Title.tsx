import { cn } from "@/lib/utils";
import { Link, LinkProps } from "@tanstack/react-router";

type Props = {
  title: string;
  variant: "infoPage" | "watchPage";
  linkProps?: LinkProps;
};

export default function Title({ title, variant, linkProps }: Props) {
  return (
    <Link
      {...linkProps}
      className={cn(
        "font-semibold line-clamp-2",
        { "text-lg sm:text-xl md:text-2xl": variant === "watchPage" },
        {
          "px-8 text-2xl lg:text-3xl lg:px-0 lg:text-start text-center":
            variant === "infoPage",
        }
      )}
    >
      {title}
    </Link>
  );
}
