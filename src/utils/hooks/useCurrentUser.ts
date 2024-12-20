import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../stores/authStore";
import { UserBasicInfo } from "../types/auth/auth";

export function useCurrentUser() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const navigate = useNavigate();

  if (!currentUser) navigate({ to: "/login", replace: true });

  return currentUser as UserBasicInfo;
}
