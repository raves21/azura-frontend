import { cn } from "@/lib/utils";
import PostActions from "./PostActions";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import { useNavigate } from "@tanstack/react-router";

type PostProps = {
  className?: string;
  fromState?: "home-page" | "user-page" | "search-page";
};

export default function Post({ className, fromState }: PostProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate({
          to: "/social/$userName/post/$postId",
          params: {
            userName: "elonmusk",
            postId: "123",
          },
          state: {
            postInfoState: fromState
              ? {
                  from: fromState,
                }
              : undefined,
          },
        });
      }}
      className={cn(
        "flex w-full gap-4 p-5 rounded-lg hover:cursor-pointer bg-socialPrimary hover:bg-socialPrimaryHover",
        className
      )}
    >
      <img
        src="/sample-user-pfp.png"
        className="block object-cover rounded-full size-11"
      />
      <div className="flex flex-col flex-grow gap-3">
        <PostHeader showPrivacy={false} />
        <PostContent />
        <PostActions />
      </div>
    </div>
  );
}
