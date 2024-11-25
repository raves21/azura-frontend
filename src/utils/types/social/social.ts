import {
  CollectionPostAttachment,
  MediaPostAttachment,
  Owner,
  Privacy,
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
  privacy: Privacy;
  totalLikes: number;
  totalComments: number;
  isLikedByCurrentUser: boolean;
  owner: Owner;
  media: MediaPostAttachment | null;
  collection: CollectionPostAttachment | null;
  createdAt: Date;
};
