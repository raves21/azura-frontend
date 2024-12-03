import { Link } from "@tanstack/react-router";

export default function CollectionOwner() {
  return (
    <Link
      to="/social/profile/$userName"
      params={{
        userName: "elonmusk",
      }}
      className="flex items-center gap-2 mt-auto group"
    >
      <img
        src="/sample-user-pfp.png"
        className="object-cover rounded-full size-6"
      />
      <p className="overflow-hidden text-sm font-semibold whitespace-nowrap group-hover:underline max-w-44 text-ellipsis">
        Elon Musk
      </p>
    </Link>
  );
}
