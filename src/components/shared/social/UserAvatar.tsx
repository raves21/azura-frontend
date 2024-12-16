import { cn } from "@/lib/utils";
import { Link, LinkProps } from "@tanstack/react-router";

type UserAvatarProps = {
  imageClassName?: string;
  className?: string;
  linkProps?: LinkProps;
  src: string;
};

export default function UserAvatar({
  linkProps,
  className,
  imageClassName,
  src,
}: UserAvatarProps) {
  return (
    <Link {...linkProps} className={cn("shrink-0", className)}>
      <img
        src={src}
        className={cn(
          "block size-[38px] object-cover rounded-full",
          imageClassName
        )}
      />
    </Link>
  );
}
