import ProfileAvatar from "./ProfileAvatar";
import ProfileBanner from "./ProfileBanner";

type ProfileImagesProps = {
  avatar: string;
  banner: string;
};

export default function ProfileImages({ avatar, banner }: ProfileImagesProps) {
  return (
    <div className="relative w-full h-48">
      <ProfileAvatar avatar={avatar} />
      <ProfileBanner banner={banner} />
    </div>
  );
}
