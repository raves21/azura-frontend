import { cn } from "@/lib/utils";
import { EntityPrivacy } from "@/utils/types/social/shared";
import { TPost, TPostComment } from "@/utils/types/social/social";
import { LinkProps, useNavigate } from "@tanstack/react-router";
import UserAvatar from "../../UserAvatar";
import ActivityHeader from "./ActivityHeader";
import PostWithAttachment from "../post/postContent/PostWithAttachment";
import PostActions from "../post/PostActions";

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
        "flex w-full gap-4 p-5 rounded-lg hover:cursor-pointer bg-socialPrimary hover:bg-socialPrimaryHover",
        { "rounded-none": type === "comment" }
      )}
    >
      <UserAvatar src={entityOwner.avatar} />
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
              <p className="w-full text-gray-300">{props.post.content}</p>
            )}
            <PostActions />
          </>
        ) : (
          <p className="w-full mt-1 text-gray-300">{props.comment.content}</p>
        )}
      </div>
    </div>
  );
}
