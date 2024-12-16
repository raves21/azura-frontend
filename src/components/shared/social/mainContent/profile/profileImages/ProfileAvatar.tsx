type ProfileAvatarProps = {
  avatar: string;
};

export default function ProfileAvatar({ avatar }: ProfileAvatarProps) {
  return (
    <img
      src={avatar}
      className="absolute z-10 sm:size-24 rounded-full size-20 lg:size-28 border-4 border-socialPrimary -bottom-[40%] md:-bottom-[35%] left-3"
    />
  );
}
