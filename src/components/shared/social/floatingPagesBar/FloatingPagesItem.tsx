import { cn } from "@/lib/utils";
import { PageType } from "./FloatingPagesBar";
import { House, User, Bell } from "lucide-react";
import { Link, LinkProps } from "@tanstack/react-router";

type FloatingPagesItemProps = {
  pageType: PageType;
  linkProps: LinkProps;
};

export default function FloatingPagesItem({
  pageType,
  linkProps,
}: FloatingPagesItemProps) {
  return (
    <Link {...linkProps} className="px-6 py-3">
      {pageType === "home" && <House className={cn("stroke-mainWhite")} />}
      {pageType === "profile" && <User className={cn("stroke-mainWhite")} />}
      {pageType === "notifications" && <Bell className={cn("stroke-mainWhite")} />}
    </Link>
  );
}
