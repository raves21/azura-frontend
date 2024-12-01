import Post from "../../post/Post";

export default function ProfilePosts() {
  return (
    <div className="flex flex-col w-full gap-4">
      {Array.from({ length: 5 }).map((_) => (
        <Post />
      ))}
    </div>
  );
}
