import { cn } from "@/lib/utils";
import { TFloatingPagesBarItem } from "./FloatingPagesBar";
import { House, User, Bell } from "lucide-react";
import { Link } from "@tanstack/react-router";

type FloatingPagesItemProps = TFloatingPagesBarItem;

export default function FloatingPagesBarItem({
  name,
  linkProps,
}: FloatingPagesItemProps) {
  return (
    <Link {...linkProps} className="px-6 py-3">
      {name === "Home" && <House className={cn("stroke-mainWhite")} />}
      {name === "Profile" && <User className={cn("stroke-mainWhite")} />}
      {name === "Notifications" && <Bell className={cn("stroke-mainWhite")} />}
    </Link>
  );
}
