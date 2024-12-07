import { cn } from "@/lib/utils";
import { Link, LinkProps } from "@tanstack/react-router";

type UserAvatarProps = {
  className?: string;
  linkProps?: LinkProps;
  src: string;
};

export default function UserAvatar({
  linkProps,
  className,
  src,
}: UserAvatarProps) {
  return (
    <Link {...linkProps}>
      <img
        src={src}
        className={cn("block object-cover rounded-full size-11", className)}
      />
    </Link>
  );
}
