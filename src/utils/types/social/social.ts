import { EntityOwner, EntityPrivacy, MediaType } from "./shared";

export type Posts = {
  message: string;
  page: number;
  perPage: number;
  totalPages: number;
  data: Post[];
};

export type Post = {
  id: string;
  content: string;
  privacy: EntityPrivacy;
  totalLikes: number;
  totalComments: number;
  isLikedByCurrentUser: boolean;
  owner: EntityOwner;
  media: Media | null;
  collection: CollectionPostAttachment | null;
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

export type CollectionPostAttachment = Omit<TCollection, "privacy">;

export type TCollection = {
  id: string;
  name: string;
  photo?: string;
  description: string;
  privacy: EntityPrivacy;
  previewPosters: string[];
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
