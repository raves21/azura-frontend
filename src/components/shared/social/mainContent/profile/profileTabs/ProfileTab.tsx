import { Link } from "@tanstack/react-router";
import { ProfileTabType } from "./ProfileTabs";

type ProfileTabProps = {
  type: ProfileTabType;
};

export default function ProfileTab({ type }: ProfileTabProps) {
  return (
    <Link className="grid flex-1 py-4 place-items-center hover:bg-socialPrimaryHover">
      {type}
    </Link>
  );
}
