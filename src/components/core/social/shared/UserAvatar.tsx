import { cn } from "@/lib/utils";
import { Link, LinkProps } from "@tanstack/react-router";

type Props = {
  imageClassName?: string;
  onClick?: () => void;
  className?: string;
  linkProps?: LinkProps;
  src: string | null;
};

export default function UserAvatar({
  linkProps,
  onClick,
  className,
  imageClassName,
  src,
}: Props) {
  return (
    <Link
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      {...linkProps}
      className={cn("shrink-0", className)}
    >
      <img
        src={src || "/no-image-2.jpg"}
        className={cn(
          "block size-[38px] object-cover rounded-full",
          imageClassName
        )}
        onError={(e) => (e.currentTarget.src = "/no-image-2.jpg")}
      />
    </Link>
  );
}
