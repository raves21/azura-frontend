type ProfileAvatarProps = {
  avatar: string;
};

export default function ProfileAvatar({ avatar }: ProfileAvatarProps) {
  return (
    <img
      src={avatar}
      className="absolute z-10 rounded-full size-[120px] border-4 border-socialPrimary -bottom-[30%] left-5"
    />
  );
}
