import { Link, useMatchRoute } from "@tanstack/react-router";
import { TProfileTab } from "./ProfileTabs";
import { cn } from "@/lib/utils";

type ProfileTabProps = TProfileTab;

export default function ProfileTab({ name, linkProps }: ProfileTabProps) {
  const matchRoute = useMatchRoute();

  return (
    <Link
      {...linkProps}
      className={cn(
        "grid flex-1 py-4 place-items-center hover:bg-socialPrimaryHover",
        {
          "underline underline-offset-4 decoration-mainAccent": matchRoute({
            to: linkProps.to,
          }),
        }
      )}
    >
      {name}
    </Link>
  );
}
