import PostActions from "../PostActions";
import PostContent from "../PostContent";
import PostHeader from "../PostHeader";
import PostLikers from "./PostLikers";

export default function PostInfo() {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex w-full gap-4">
        <img
          src="/sample-user-pfp.png"
          className="block object-cover rounded-full size-12"
        />
        <PostHeader showPrivacy privacy="FRIENDS_ONLY" />
      </div>
      <div className="my-1">
        <PostContent />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <PostLikers />
        <PostActions iconClassName="size-6" />
      </div>
    </div>
  );
}
