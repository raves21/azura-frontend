import { UserBasicInfo } from "../auth/auth";

export type MediaPostAttachment = {
  id: string;
  title: string;
  type: string;
  posterImage: string;
  coverImage: string;
  year: string;
};

export type CollectionPostAttachment = {
  id: string;
  name: string;
  description: string;
  previewPosters: string[];
};

export type Owner = Omit<UserBasicInfo, "email" | "avatar">;

export type Privacy = "PUBLIC" | "FRIENDS_ONLY" | "ONLY_ME";
