import { UserBasicInfo } from "../auth/auth";

export type EntityPrivacy = "FRIENDS_ONLY" | "ONLY_ME" | "PUBLIC";

export type MediaPostAttachment = {
  id: string;
  title: string;
  type: string;
  posterImage: string;
  coverImage: string;
  year: string;
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

export type ResponseWithMessage = {
  message: string;
};

export type PaginatedResponse = ResponseWithMessage & {
  page: number;
  perPage: number;
  totalPages: number;
};

export type EntityOwner = Omit<UserBasicInfo, "email" | "avatar">;
