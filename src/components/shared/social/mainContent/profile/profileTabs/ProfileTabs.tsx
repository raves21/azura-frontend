import ProfileTab from "./ProfileTab";

export type ProfileTabType = "Posts" | "Collections";
const profileTabs: ProfileTabType[] = ["Posts", "Collections"];

export default function ProfileTabs() {
  return (
    <div className="flex w-full mt-4">
      {profileTabs.map((profileTab) => (
        <ProfileTab type={profileTab} />
      ))}
    </div>
  );
}
