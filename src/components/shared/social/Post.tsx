import PostActions from "./PostActions";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";

export default function Post() {
  return (
    <div className="flex w-full gap-4 p-5 rounded-lg bg-socialPrimary">
      <img
        src="/sample-user-pfp.png"
        className="block object-cover rounded-full size-11"
      />
      <div className="flex flex-col flex-grow gap-3">
        <PostHeader />
        <PostContent />
        <PostActions />
      </div>
    </div>
  );
}
