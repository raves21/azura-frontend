import { Link } from "@tanstack/react-router";

type CollectionOwnerProps = {
  avatar: string;
  userHandle: string;
};

export default function CollectionOwner({
  avatar,
  userHandle,
}: CollectionOwnerProps) {
  return (
    <Link
      to="/social/$userHandle"
      params={{
        userHandle,
      }}
      className="flex items-center gap-2 mt-auto group"
    >
      <img src={avatar} className="object-cover rounded-full size-6" />
      <p className="overflow-hidden text-sm font-semibold whitespace-nowrap group-hover:underline max-w-44 text-ellipsis">
        {userHandle}
      </p>
    </Link>
  );
}
