import { Link } from "@tanstack/react-router";
import { TProfileTab } from "./ProfileTabs";

type ProfileTabProps = TProfileTab;

export default function ProfileTab({ name, linkProps }: ProfileTabProps) {
  return (
    <Link
      {...linkProps}
      className="grid flex-1 py-4 place-items-center hover:bg-socialPrimaryHover"
    >
      {name}
    </Link>
  );
}
