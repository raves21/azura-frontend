import {
  CollectionPostAttachment,
  MediaPostAttachment,
  EntityOwner,
  EntityPrivacy,
} from "./shared";

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
  media: MediaPostAttachment | null;
  collection: CollectionPostAttachment | null;
  createdAt: Date;
};
