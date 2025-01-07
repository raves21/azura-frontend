type EditProfileDialogProps = {
  avatar: string | null;
  banner: string | null;
  userName: string;
  bio: string | null;
};

export default function EditProfileDialog({
  userName
}: EditProfileDialogProps) {
  return (
    <div className="aspect-[1/1] w-[700px] bg-red-500 grid place-items-center text-mainWhite">
      {userName}
    </div>
  );
}
