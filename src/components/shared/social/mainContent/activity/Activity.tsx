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
  ownerProfileLinkProps: LinkProps;
} & (PostActivityProps | CommentActivityProps);

export default function Activity({
  showPrivacy,
  privacy,
  ownerProfileLinkProps,
  ...props
}: ActivityProps) {
  const { type } = props;
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
        "flex w-full gap-2 text-sm mobile-m:text-base md:gap-4 px-3 mobile-l:p-5",
        {
          "rounded-none py-5": type === "comment",
        },
        {
          "bg-socialPrimary hover:bg-socialPrimaryHover rounded-lg py-4 hover:cursor-pointer":
            type === "post",
        }
      )}
    >
      <div className="flex flex-col flex-grow gap-3">
        {showPrivacy ? (
          <ActivityHeader
            linkProps={ownerProfileLinkProps}
            owner={entityOwner}
            createdAt={createdAt}
            showPrivacy
            privacy={privacy!}
          />
        ) : (
          <ActivityHeader
            linkProps={ownerProfileLinkProps}
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
                className={cn(
                  "w-full text-gray-300 line-clamp-5 text-sm mobile-m:text-md sm:text-base",
                  {
                    "sm:pl-14": !isPostInfoPage,
                  }
                )}
              >
                <ActivityContentRenderer content={props.post.content!} />
              </p>
            )}
            <PostActions
              postId={props.post.id}
              totalComments={props.post.totalComments}
              totalLikes={props.post.totalLikes}
              isLikedByCurrentUser={props.post.isLikedByCurrentUser}
            />
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
