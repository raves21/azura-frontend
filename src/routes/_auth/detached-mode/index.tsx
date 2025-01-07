import { useAuthStore } from "@/utils/stores/useAuthStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth/detached-mode/")({
  component: () => <DetachedMode />,
});

function DetachedMode() {
  const { detachedModeUserInfo } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!detachedModeUserInfo) {
      navigate({
        to: "/login",
      });
    }
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold">
        Your account has reached the maximum session limit.
      </h1>
      <p className="mt-3 text-gray-400">
        If you wish to login, feel free to logout any of your account's sessions
        below.
      </p>
      <div>{JSON.stringify(detachedModeUserInfo, null, 2)}</div>
    </>
  );
}
