type ProfileBannerProps = {
  banner: string;
};

export default function ProfileBanner({ banner }: ProfileBannerProps) {
  return (
    <img
      src={banner}
      className="absolute inset-0 object-cover rounded-lg size-full"
    />
  );
}
