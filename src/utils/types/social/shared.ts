import { UserBasicInfo } from "../auth/auth";

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
