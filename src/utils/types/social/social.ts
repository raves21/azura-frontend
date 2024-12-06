import { EntityOwner, EntityPrivacy, MediaType } from "./shared";

export type Posts = {
  message: string;
  page: number;
  perPage: number;
  totalPages: number;
  data: TPost[];
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
  createdAt: Date;
};

export type Media = {
  id: string;
  title: string;
  type: MediaType;
  posterImage: string;
  coverImage: string;
  year: string;
  rating: string;
  status: string | null;
  createdAt: Date;
};

export type PreviewPoster = {
  coverImage: string | null;
  posterImage: string | null;
};

export type TCollection = {
  id: string;
  name: string;
  photo: string | null;
  description: string;
  privacy: EntityPrivacy;
  previewPosters: PreviewPoster[];
};

export type CollectionDetails = Omit<TCollection, "previewPosters"> & {
  owner: EntityOwner;
  totalCollectionItems: number;
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
};

export type TPostComment = {
  id: string;
  postId: string;
  content: string;
  author: EntityOwner;
  createdAt: Date;
};
