import { UserBasicInfo } from "@/utils/types/auth/auth";
import { queryClient } from "@/utils/variables/queryClient";

export function getCurrentUser() {
  const currentUser = queryClient.getQueryData<UserBasicInfo>([
    "authenticatedUser",
  ]);
  return currentUser;
}

export function setCurrentUser(newValue: UserBasicInfo) {
  queryClient.setQueryData<UserBasicInfo>(["authenticatedUser"], newValue);
}
