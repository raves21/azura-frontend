import { cn } from "@/lib/utils";
import { LinkProps, Link } from "@tanstack/react-router";
import { ArrowLeft, Circle } from "lucide-react";

type BackButtonProps = {
  linkProps: LinkProps;
  className?: string;
  arrowIconClassName?: string;
  hoverCircleClassName?: string;
};

export default function BackButton({
  linkProps,
  className,
  arrowIconClassName,
  hoverCircleClassName,
}: BackButtonProps) {
  return (
    <Link {...linkProps} className={cn("relative w-min group", className)}>
      <ArrowLeft
        className={cn(
          "transition-colors size-7 stroke-mainWhite group-hover:stroke-mainAccent",
          arrowIconClassName
        )}
      />
      <Circle
        className={cn(
          "fill-gray-700/20 stroke-none size-[150%] group-hover:opacity-100 opacity-0 transition-opacity rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          hoverCircleClassName
        )}
      />
    </Link>
  );
}
