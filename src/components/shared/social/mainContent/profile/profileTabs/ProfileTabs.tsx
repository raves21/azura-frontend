import ProfileTab from "./ProfileTab";
import { LinkProps, useParams } from "@tanstack/react-router";

type ProfileTabName = "Posts" | "Collections";

export type TProfileTab = {
  name: ProfileTabName;
  linkProps: LinkProps;
};

export default function ProfileTabs() {
  const { userHandle } = useParams({ from: "/_protected/social/$userHandle" });
  const profileTabs: TProfileTab[] = [
    {
      name: "Posts",
      linkProps: {
        to: "/social/$userHandle",
        params: {
          userHandle,
        },
      },
    },
    {
      name: "Collections",
      linkProps: {
        to: "/social/$userHandle/collections",
        params: {
          userHandle,
        },
      },
    },
  ];

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
