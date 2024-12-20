import { cn } from "@/lib/utils";
import { EntityPrivacy } from "@/utils/types/social/shared";
import { TPost, TPostComment } from "@/utils/types/social/social";
import { LinkProps, useMatchRoute, useNavigate } from "@tanstack/react-router";
import ActivityHeader from "./ActivityHeader";
import PostWithAttachment from "../post/postContent/PostWithAttachment";
import PostActions from "../post/PostActions";
import ActivityContentRenderer from "./ActivityContentRenderer";

type PostActivityProps = {
  type: "post";
  post: TPost;
  linkProps?: LinkProps;
};
type CommentActivityProps = {
  type: "comment";
  comment: TPostComment;
};

type ActivityProps = {
  showPrivacy: boolean;
  privacy?: EntityPrivacy;
} & (PostActivityProps | CommentActivityProps);

export default function Activity({
  showPrivacy,
  privacy,
  ...props
}: ActivityProps) {
  const { type } = props;
  const samplePostContent =
    "Hello world wtf what i am not from this <mention>\nworld!\n\n\nshameless plug\ni am your father luke";
  const matchRoute = useMatchRoute();
  const isPostInfoPage = matchRoute({ to: "/social/$userName/post/$postId" });
  const navigate = useNavigate();
  const entityOwner =
    type === "comment" ? props.comment.author : props.post.owner;
  const createdAt =
    type === "comment" ? props.comment.createdAt : props.post.createdAt;

  return (
    <div
      onClick={
        type === "post" ? () => navigate({ ...props.linkProps }) : undefined
      }
      className={cn(
        "flex w-full gap-2 text-sm mobile-m:text-base md:gap-4 px-3 py-4 mobile-l:p-5 rounded-lg hover:cursor-pointer bg-socialPrimary hover:bg-socialPrimaryHover",
        { "rounded-none py-5": type === "comment" }
      )}
    >
      <div className="flex flex-col flex-grow gap-3">
        {showPrivacy ? (
          <ActivityHeader
            owner={entityOwner}
            createdAt={createdAt}
            showPrivacy
            privacy={privacy!}
          />
        ) : (
          <ActivityHeader
            owner={entityOwner}
            createdAt={createdAt}
            showPrivacy={false}
            privacy={undefined}
          />
        )}
        {props.type === "post" ? (
          <>
            {props.post.collection ? (
              <PostWithAttachment
                owner={props.post.owner}
                attachmentType="collection"
                collection={props.post.collection}
                content={props.post.content}
              />
            ) : props.post.media ? (
              <PostWithAttachment
                attachmentType="media"
                media={props.post.media}
                content={props.post.content}
              />
            ) : (
              <p
                className={cn("w-full text-gray-300 text-sm mobile-m:text-md", {
                  "sm:pl-14": !isPostInfoPage,
                })}
              >
                {/* {props.post.content} */}
                <ActivityContentRenderer content={samplePostContent} />
              </p>
            )}
            <PostActions />
          </>
        ) : (
          <p className="w-full mt-1 text-sm text-gray-300 mobile-m:text-md">
            {props.comment.content}
          </p>
        )}
      </div>
    </div>
  );
}
