import ProfileTab from "./ProfileTab";
import { LinkProps } from "@tanstack/react-router";

type ProfileTabName = "Posts" | "Collections";

export type TProfileTab = {
  name: ProfileTabName;
  linkProps: LinkProps;
};

const profileTabs: TProfileTab[] = [
  {
    name: "Posts",
    linkProps: {
      to: "/social/$userName",
      params: {
        userName: "elonmusk",
      },
    },
  },
  {
    name: "Collections",
    linkProps: {
      to: "/social/$userName/collections",
      params: {
        userName: "elonmusk",
      },
    },
  },
];

export default function ProfileTabs() {
  return (
    <div className="flex w-full mt-4 text-sm mobile-m:text-md sm:text-base">
      {profileTabs.map((profileTab) => (
        <ProfileTab
          key={profileTab.name}
          name={profileTab.name}
          linkProps={profileTab.linkProps}
        />
      ))}
    </div>
  );
}
