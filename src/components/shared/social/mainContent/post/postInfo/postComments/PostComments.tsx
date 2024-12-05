import Post from "../../Post";
import CreateComment from "./CreateComment";

export default function PostComments() {
  return (
    <div className="flex flex-col w-full gap-8 text-sm">
      <CreateComment />
      <div className="flex flex-col gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Post key={i} className="px-5 py-4 rounded-none" />
        ))}
      </div>
    </div>
  );
}
