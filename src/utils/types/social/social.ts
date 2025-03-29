import { UserBasicInfo } from "../auth/auth";
import {
  EntityOwner,
  EntityPrivacy,
  MediaType,
  PaginatedResponse,
} from "./shared";

export type PaginatedPostsResponse = PaginatedResponse & {
  data: TPost[];
};

export type PaginatedCommentsResponse = PaginatedResponse & {
  data: TPostComment[];
};

export type PaginatedCollectionsResponse = PaginatedResponse & {
  data: TCollection[];
};

export type TPost = {
  id: string;
  content: string | null;
  privacy: EntityPrivacy;
  totalLikes: number;
  totalComments: number;
  isLikedByCurrentUser: boolean;
  owner: EntityOwner;
  media: Media | null;
  collection: TCollection | null;
  createdAt: string;
};

export type TPostInfo = TPost & {
  postFirstLikers: Omit<EntityOwner, "handle">[] | null;
};

export type Media = {
  id: string;
  title: string;
  type: MediaType;
  year: string;
  description: string;
  coverImage: string | null;
  posterImage: string | null;
  rating: string | null;
  status: string | null;
};

export type PreviewMedia = Pick<
  Media,
  "title" | "type" | "year" | "coverImage" | "posterImage"
>;

export type TCollection = {
  id: string;
  name: string;
  photo: string | null;
  description: string | null;
  privacy: EntityPrivacy;
  owner: EntityOwner;
  previewMedias: PreviewMedia[];
};

export type TCollectionItem = {
  id: string;
  collectionId: string;
  media: Media;
};

export type PostWithMediaAttachment = Pick<TPost, "content"> & {
  attachmentType: "media";
  media: Media;
};

export type PostWithCollectionAttachment = Pick<TPost, "content"> & {
  attachmentType: "collection";
  collection: TCollection;
  owner: EntityOwner;
};

export type TPostComment = {
  id: string;
  postId: string;
  content: string;
  author: EntityOwner;
  createdAt: string;
};
export type UserProfile = UserBasicInfo & {
  banner: string | null;
  bio: string | null;
  createdAt: Date;
  totalFollowers: number;
  totalFollowing: number;
  followsYou: boolean;
  followedByYou: boolean;
  sessionId: string;
};

export type Trend = {
  type: string;
  content: string;
  count: number;
};

export type UserPreview = Omit<UserBasicInfo, "email"> & {
  bio: string;
  isFollowedByCurrentUser: boolean;
};

export type PaginatedUserPreviewsResponse = PaginatedResponse & {
  data: UserPreview[];
};
