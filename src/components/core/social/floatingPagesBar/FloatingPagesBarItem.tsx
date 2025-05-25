import { cn } from "@/lib/utils";
import { TFloatingPagesBarItem } from "./FloatingPagesBar";
import { House, User, Bell, Circle } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Props = TFloatingPagesBarItem & {
  isCurrentRoute: boolean;
};

export default function FloatingPagesBarItem({
  name,
  linkProps,
  isCurrentRoute,
}: Props) {
  return (
    <Link {...linkProps} className="px-6 py-3 group relative">
      {name === "Home" && (
        <>
          <House
            className={cn("stroke-mainWhite", {
              "stroke-mainAccent": isCurrentRoute,
            })}
          />
          <Circle className="fill-mainAccent/20 stroke-none size-[110%] group-hover:opacity-100 opacity-0 transition-opacity rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </>
      )}
      {name === "Profile" && (
        <>
          <User
            className={cn("stroke-mainWhite", {
              "stroke-mainAccent": isCurrentRoute,
            })}
          />
          <Circle className="fill-mainAccent/20 stroke-none size-[110%] group-hover:opacity-100 opacity-0 transition-opacity rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </>
      )}
      {name === "Notifications" && (
        <>
          <Bell
            className={cn("stroke-mainWhite", {
              "stroke-mainAccent": isCurrentRoute,
            })}
          />
          <Circle className="fill-mainAccent/20 stroke-none size-[110%] group-hover:opacity-100 opacity-0 transition-opacity rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </>
      )}
    </Link>
  );
}
