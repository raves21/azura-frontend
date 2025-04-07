import ProfileAvatar from "./ProfileAvatar";
import ProfileBanner from "./ProfileBanner";

type Props = {
  avatar: string | null;
  banner: string | null;
};

export default function ProfileImages({ avatar, banner }: Props) {
  return (
    <div className="relative w-full h-28 sm:h-44 md:h-48">
      <ProfileAvatar avatar={avatar} />
      <ProfileBanner banner={banner} />
    </div>
  );
}
