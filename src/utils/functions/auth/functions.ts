import { UserBasicInfo } from "@/utils/types/auth/auth";
import { queryClient } from "@/utils/variables/queryClient";

export function getCurrentUser() {
  return queryClient.getQueryData<UserBasicInfo | undefined | null>([
    "authenticatedUser",
  ]);
}

export function setCurrentUser(newValue: UserBasicInfo | null | undefined) {
  queryClient.setQueryData<UserBasicInfo | undefined | null>(
    ["authenticatedUser"],
    newValue
  );
}
