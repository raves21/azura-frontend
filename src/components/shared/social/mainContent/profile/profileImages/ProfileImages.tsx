import ProfileAvatar from "./ProfileAvatar";
import ProfileBanner from "./ProfileBanner";

type ProfileImagesProps = {
  avatar: string;
  banner: string;
};

export default function ProfileImages({ avatar, banner }: ProfileImagesProps) {
  return (
    <div className="relative w-full h-28 md:h-48 sm:h-40">
      <ProfileAvatar avatar={avatar} />
      <ProfileBanner banner={banner} />
    </div>
  );
}
