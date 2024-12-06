import { UserBasicInfo } from "../auth/auth";
import { LinkProps } from "@tanstack/react-router";

export type SocialSearchOption = "posts" | "people" | "collections";

export type EntityPrivacy = "FRIENDS_ONLY" | "ONLY_ME" | "PUBLIC";

export type ResponseWithMessage = {
  message: string;
};

export type PaginatedResponse = ResponseWithMessage & {
  page: number;
  perPage: number;
  totalPages: number;
};

export type EntityOwner = Omit<UserBasicInfo, "email" | "avatar">;

export type MediaType = "ANIME" | "TV" | "MOVIE";

export type TContentOption = {
  name: string;
  linkProps: LinkProps;
};
