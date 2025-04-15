import { TNotification } from "@/utils/types/social/social";

export type Props = {
  notification: TNotification;
};

export default function NotificationText({ notification }: Props) {
  const { type, actorsPreview, totalActors } = notification;
  const twoActors = actorsPreview.length === 2;
  const moreThanTwoActors = actorsPreview.length > 2;

  if (type === "FOLLOW") {
    return (
      <>
        <strong>{actorsPreview[0].username}&nbsp;</strong>followed you.
      </>
    );
  }

  if (type === "COMMENT") {
    if (twoActors) {
      return (
        <>
          <strong>{actorsPreview[0].username}&nbsp;</strong> and
          <strong>&nbsp;{actorsPreview[1].username}&nbsp;</strong> commented on
          your post.
        </>
      );
    } else if (moreThanTwoActors) {
      return (
        <>
          <strong>{actorsPreview[0].username}&nbsp;</strong>,&nbsp;
          <strong>&nsbp;{actorsPreview[1].username}&nsbp;</strong>, and&nbsp;
          {totalActors - 2} {totalActors === 3 ? "other" : "others"} commented
          on your post.
        </>
      );
    } else {
      return (
        <>
          <strong>{actorsPreview[0].username} </strong>commented on your post.
        </>
      );
    }
  }

  if (type === "LIKE") {
    if (twoActors) {
      return (
        <>
          <strong>{actorsPreview[0].username}&nbsp;</strong> and
          <strong>&nbsp;{actorsPreview[1].username}&nbsp;</strong> liked your
          post.
        </>
      );
    } else if (moreThanTwoActors) {
      return (
        <>
          <strong>{actorsPreview[0].username}&nbsp;</strong>,&nbsp;
          <strong>&nsbp;{actorsPreview[1].username}&nsbp;</strong>, and&nbsp;
          {totalActors - 2} {totalActors === 3 ? "other" : "others"} liked your
          post.
        </>
      );
    } else {
      return (
        <>
          <strong>{actorsPreview[0].username} </strong> liked your post.
        </>
      );
    }
  }
}
