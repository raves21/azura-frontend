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
      <p className="text-sm font-semibold group-hover:underline">raves</p>
    </Link>
  );
}
